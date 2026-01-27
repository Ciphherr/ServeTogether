import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOpportunityByUID } from "../api/helper";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";
import RegisterModal from "../components/RegisterModal";
import SuccessToast from "../components/successToast";
import { useAuth } from "../context/AuthContext";
import { getRegistrationByOpportunityAndUser } from "../api/helper";
import { BeatLoader } from "react-spinners";
import { generateCertificate } from "../api/posting";
import { getOrganizationByUID } from "../api/helper";
import { Link } from "react-router-dom";

const OpportunityDetails = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOpportunityByUID(uid);
      setOpportunity(data);
    };
    fetchData();
  }, [uid]);

  const OrgID = opportunity?.organised_by?.[0]?.uid;

  useEffect(() => {
    if (!OrgID) return;
    const fetchData = async () => {
      const data = await getOrganizationByUID(OrgID);
      setOrganization(data);
    };
    fetchData();
  }, [OrgID]);

  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        const registration = await getRegistrationByOpportunityAndUser(
          uid,
          user.contentstack_uid,
        );
        console.log("ha:", registration);
        if (registration) {
          setIsRegistered(true);
          setRegistrationData(registration);
          console.log("ha2:", registrationData);
        } else {
          setIsRegistered(false);
          setRegistrationData(null);
        }
      } catch (error) {
        console.error("Error checking registration:", error);
        setIsRegistered(false);
      }
    };

    if (uid && user.contentstack_uid) {
      fetchRegistration();
    }
  }, [uid, user.contentstack_uid]);

  const dateObj = new Date(opportunity?.event_date);
  const date = dateObj.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const time = dateObj.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handlecertificateGeneration = async (e) => {
    try {
      setIsGenerating(true);
      const pdfBlob = await generateCertificate({
        name: registrationData?.full_name,
        event: registrationData?.opportunity_title,
        date: date,
        certId: `ST-${opportunity?.event_date}-${user.contentstack_uid.slice(-4)}`,
      });

      const url = window.URL.createObjectURL(
        new Blob([pdfBlob], { type: "application/pdf" }),
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = `${registrationData?.full_name}-certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!opportunity) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 h-screen">
        <BeatLoader color="#04BD64" size={15} />
      </div>
    );
  }

  console.log("dusra:", registrationData);

  const handleSuccess = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  console.log(opportunity.organised_by[0].uid);

  return (
    <div className="min-h-screen bg-white">
      {showToast && <SuccessToast />}
      {/* Cover Image */}
      <img
        src={opportunity.event_image.url}
        alt={opportunity.title}
        className="w-full h-[320px] object-cover blur-sm"
      />

      {/* Content */}
      <article className="max-w-5xl mx-auto px-6 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
          {opportunity.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-10">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>
              {date} • {time}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{opportunity.location}</span>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: opportunity?.about_event || "",
          }}
        />

        {organization?.uid && (
          <div className="mt-12">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Organised by
            </h3>

            <Link
              to={`/organizations/${organization.uid}`}
              className="flex items-center gap-4 border-l-4 border-emerald-500 
                 bg-white/70 backdrop-blur p-5 rounded-lg
                 hover:bg-white transition max-w-lg"
            >
              <img
                src={organization.organization_logo?.url}
                alt=""
                className="h-16 w-16 rounded-full object-cover"
              />

              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {organization.title}
                </p>
                <p className="text-sm text-gray-500">
                  View Organisation Details →
                </p>
              </div>
            </Link>
          </div>
        )}

        {/* Divider */}
        <div className="my-14 h-px bg-gray-200" />

        {/* CTA */}
        {opportunity?.upcoming && !isRegistered && (
          <div className="text-center">
            <button
              onClick={() => setOpen(true)}
              className="px-12 py-4 rounded-xl bg-emerald-600 text-white font-semibold text-lg hover:bg-emerald-700 transition"
            >
              Register Now
            </button>
            {open && (
              <RegisterModal
                eventUID={uid}
                eventTitle={opportunity.title}
                onClose={() => setOpen(false)}
                onSuccess={handleSuccess}
                userUID={user.contentstack_uid}
              />
            )}
          </div>
        )}
        {isRegistered && opportunity?.upcoming && (
          <div className="text-center">
            <p className="text-lg text-emerald-600 font-semibold p-5">
              Thanks for Registering! On successful participation you can
              generate your certificate from here
            </p>
          </div>
        )}
        {registrationData?.attended && (
          <div className="text-center">
            <button
              onClick={handlecertificateGeneration}
              disabled={isGenerating}
              className={`px-12 py-4 rounded-xl text-white font-semibold text-lg transition
        ${
          isGenerating
            ? "bg-emerald-400 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-700"
        }`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center gap-2">
                  <BeatLoader size={8} color="#ffffff" />
                  <span>Generating...</span>
                </div>
              ) : (
                "Generate Certificate"
              )}
            </button>
          </div>
        )}
      </article>
    </div>
  );
};

export default OpportunityDetails;
