import { Link } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";

const OpportunityCard = ({ data }) => {

  const opportunity = data;
  const dateObj = new Date(opportunity.event_date);
  const date = dateObj.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const time = dateObj.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Link
      to={`/opportunities/${opportunity.uid}`}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={opportunity.event_image.url}
          alt={opportunity.title}
          className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-emerald-600 transition">
          {opportunity.title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {opportunity.about_event ?.replace(/<[^>]+>/g, "").trim()}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{opportunity.location.split(",").slice(1)}</span>
          </div>

          <div className="flex items-center gap-2 text-sky-600">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OpportunityCard;
