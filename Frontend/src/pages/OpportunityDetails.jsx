import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOpportunityByUID } from "../api/helper";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";
import RegisterModal from "../components/RegisterModal";
import SuccessToast from "../components/successToast";
import { useAuth } from "../context/AuthContext";


const OpportunityDetails = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState(null);
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const {user} = useAuth();


  useEffect(() => {
    const fetchData = async () => {
      const data = await getOpportunityByUID(uid);
      setOpportunity(data);
    };
    fetchData();
  }, [uid]);


  if (!opportunity) {
    return <p className="p-10 text-gray-500">Loading...</p>;
  }

  const dateObj = new Date(opportunity.event_date);
  const date = dateObj.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const time = dateObj.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleSuccess = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

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
            <span>{date} • {time}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{opportunity.location}</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {opportunity.about_event
            ?.replace(/<[^>]+>/g, "")
            .trim()}
        </div>

        {/* Divider */}
        <div className="my-14 h-px bg-gray-200" />

        {/* CTA */}
        {opportunity.upcoming && 
        <div className="text-center">
          <button onClick={() =>  setOpen(true)} className="px-12 py-4 rounded-full bg-emerald-600 text-white font-semibold text-lg hover:bg-emerald-700 transition">
            Register Now
          </button>
          {open && <RegisterModal eventUID={uid} eventTitle={opportunity.title} onClose={() => setOpen(false)} onSuccess={handleSuccess} userUID = {user.contentstack_uid} />}  
        </div>}
      </article>
    </div>
  );
};

export default OpportunityDetails;
