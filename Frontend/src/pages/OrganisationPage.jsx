import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import OrganizationCard from "../components/OrganisationCard";
import { getOrganizations } from "../api/helper";
import { BeatLoader } from "react-spinners";

const OrganizationsPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getOrganizations().then((data) => {
      setOrganizations(data[0]); // CMS response
    });
  }, []);

  console.log(organizations)

  /* 🔍 Search logic */
  const filteredOrganizations = useMemo(() => {
    return organizations.filter((org) => {
      const query = searchQuery.toLowerCase();

      const matchesName = org.title
        ?.toLowerCase()
        .includes(query);

      return matchesName;
    });
  }, [organizations, searchQuery]);

  if (!organizations.length) {
    return <div className="flex flex-col items-center justify-center space-y-4 h-screen"><BeatLoader color="#04BD64" size={15} /></div>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 pt-28">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Organizations
        </h1>
        <p className="text-gray-600">
          Discover organizations driving change across education,
          environment, health, animals, and disaster relief.
        </p>
      </section>

      {/* 🔍 Search */}
      <section className="max-w-7xl mx-auto px-6 pb-14">
        <div className="relative w-full">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search organizations or causes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {filteredOrganizations.length === 0 ? (
          <p className="text-center text-gray-500">
            No organizations found.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filteredOrganizations.map((org) => (
              <OrganizationCard key={org.uid} data={org} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default OrganizationsPage;
