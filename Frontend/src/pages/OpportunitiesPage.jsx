import Navbar from "../components/Navbar";
import OpportunityCard from "../components/OpportunityCard";
import { useState, useEffect, useMemo } from "react";
import { Search, Leaf } from "lucide-react";
import { getOpportunities } from "../api/helper";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { BeatLoader } from "react-spinners";

ContentstackLivePreview.init({
    enable: true
});

const OpportunitiesPage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCause, setSelectedCause] = useState("");

  useEffect(() => {
    const fetchOpportunities = async () => {
    const data = await getOpportunities();
    setOpportunities(data[0]);
  };

  fetchOpportunities();

  ContentstackLivePreview.onEntryChange(() => {
    fetchOpportunities();
  });
  }, []);


  /* 🔍 Filter logic */
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((item) => {
      const matchesSearch =
        item.title
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.cause[0]
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesCause =
        !selectedCause || item.cause[0] === selectedCause;

      const matchesUpcoming =
        searchQuery.trim() === ""
          ? item.upcoming === true   
          : true; 

      return matchesSearch && matchesCause && matchesUpcoming;
    });
  }, [opportunities, searchQuery, selectedCause]);

  if (!opportunities.length) return <div className="flex flex-col items-center justify-center space-y-4 h-screen"><BeatLoader color="#04BD64" size={15} /></div>;

  return (
    <div className="min-h-screen bg-white text-gray-800 pt-28">

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Volunteer Opportunities
        </h1>
        <p className="text-gray-600">
          Explore volunteering opportunities that create real impact across
          nature, education, and community well-being.
        </p>
      </section>

      {/* Search & Filter */}
      <section className="max-w-7xl mx-auto px-6 pb-14">
        <div className="flex flex-col md:flex-row gap-4">

          {/* 🔍 Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* 🌱 Filter */}
          <div className="relative md:w-64">
            <Leaf
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <select
              value={selectedCause}
              onChange={(e) => setSelectedCause(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All Causes</option>
              <option value="Environment">Environment</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Animal welfare">Animal welfare</option>
              <option value="Disaster">Disaster</option>
              <option value="Social welfare">Social welfare</option>
            </select>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {filteredOpportunities.length === 0 ? (
          <p className="text-center text-gray-500">
            No opportunities found.
          </p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {filteredOpportunities.map((item, index) => (
              <OpportunityCard key={index} data={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default OpportunitiesPage;
