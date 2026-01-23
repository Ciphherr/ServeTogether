import { useState, useEffect } from "react";
import { ArrowLeft, Mail, Globe } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getOpportunitiesByOrganizationUID, getOrganizationByUID } from "../api/helper";
import OpportunityCard from "../components/OpportunityCard";

const OrganizationDetails = () => {
  const navigate = useNavigate();
  const { uid } = useParams(); // Organization UID from route
  const [activeTab, setActiveTab] = useState("about");
  const [opportunities, setOpportunities] = useState([]);
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch organization details
        const orgData = await getOrganizationByUID(uid);
        setOrganization(orgData);

        // Fetch opportunities for this organization
        const oppData = await getOpportunitiesByOrganizationUID(uid);
        setOpportunities(oppData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uid]);


  const upcomingOpportunities = opportunities.filter(
    (op) => op.upcoming == true
  );

  const previousOpportunities = opportunities.filter(
    (op) => op.upcoming == false
  );


  if (loading) {
    return <p className="p-10 text-gray-500 text-center">Loading...</p>;
  }

  if (!organization) {
    return <p className="p-10 text-gray-500 text-center">Organization not found.</p>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Cover */}
     
      <section className="w-full h-[320px] bg-linear-to-br from-emerald-950 via-green-900 to-sky-900 flex items-center">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-emerald-300 text-sm font-medium uppercase md:text-center mb-4">
            Our Mission
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-white opacity-40 leading-tight max-w-3xl">
            {organization.moto || "Empowering communities to create sustainable change."}
          </h1>
        </div>
      </section>


      {/* Content */}
      <article className="max-w-5xl mx-auto px-6 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Organization Header */}
        <div className="flex items-center gap-4 mb-6">
          {/* Logo */}
          {organization.organization_logo?.url && (
            <img
              src={organization.organization_logo.url}
              alt={organization.title}
              className="h-20 w-20 rounded-full object-cover border border-gray-200"
            />
          )}

          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {organization.title}
            </h1>
            <p className="text-sm text-gray-500">
              Non-profit organization
            </p>
          </div>
        </div>


        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-10">
          <button
            onClick={() => setActiveTab("about")}
            className={`pb-3 font-medium ${
              activeTab === "about"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500"
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => setActiveTab("events")}
            className={`pb-3 font-medium ${
              activeTab === "events"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500"
            }`}
          >
            Upcoming Events
          </button>

            <button
              onClick={() => setActiveTab("previous")}
              className={`pb-3 font-medium ${
                activeTab === "previous"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500"
              }`}
            >
              Previous Events
            </button>
        </div>

        {/* Tab Content */}

        {activeTab === "about" && (
          <div className="space-y-8 text-gray-700">
            {/* Description */}
            <p className="text-lg leading-relaxed">
              {organization.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-4 text-sm">
              {organization.organization_email && (
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-emerald-600" />
                  <a
                    href={`mailto:${organization.organization_email}`}
                    className="text-emerald-600 hover:underline"
                  >
                    {organization.organization_email}
                  </a>
                </div>
              )}

              {organization.organization_website?.href && (
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-emerald-600" />
                  <a
                    href={organization.organization_website.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    {organization.organization_website.href || "Visit website"}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}



        {activeTab === "events" && (
          <div>
            {upcomingOpportunities.length === 0 ? (
              <p className="text-gray-500 text-center pt-10">
                This organization currently has no upcoming opportunities. Check back soon.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {upcomingOpportunities.map((opportunity, index) => (
                  <OpportunityCard key={index} data={opportunity} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "previous" && (
          <div>
            {previousOpportunities.length === 0 ? (
              <p className="text-gray-500 text-center pt-10">
                No previous events available.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {previousOpportunities.map((opportunity, index) => (
                  <OpportunityCard key={index} data={opportunity} />
                ))}
              </div>
            )}
          </div>
        )}


      </article>
    </div>
  );
};

export default OrganizationDetails;
