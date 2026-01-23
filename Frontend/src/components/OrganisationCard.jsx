import { Link } from "react-router-dom";

const OrganizationCard = ({ data }) => {
  return (
    <Link
      to={`/organizations/${data.uid}`}
      className="flex items-center gap-5 rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition bg-white"
    >
      {/* Logo */}
      <div className="h-14 w-14 flex-shrink-0 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
        <img
          src={data.organization_logo.url}
          alt={data.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {data.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {data.description}
        </p>
      </div>
    </Link>
  );
};

export default OrganizationCard;
