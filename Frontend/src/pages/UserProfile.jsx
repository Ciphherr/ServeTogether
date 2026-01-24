import { useState, useEffect } from "react";
import { ArrowLeft, LogOut, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OpportunityCard from "../components/OpportunityCard";
import { getUserProfileByEmail } from "../api/helper";
import { getRegisteredOpportunitiesByUserUID } from "../api/helper";
import { useAuth } from "../context/AuthContext";
import userImage from "../assets/user.jpg";
import { BeatLoader } from "react-spinners";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("registered");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [UserOpportunities, setUserOpportunities] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfileByEmail(user.email);
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.email]);

  useEffect(() => {
    if (!user?.contentstack_uid) return;

    const fetchRegistrations = async () => {
      try {
        const data = await getRegisteredOpportunitiesByUserUID(
          user.contentstack_uid,
        );
        setUserOpportunities(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);


  const completedOpportunities =
    UserOpportunities.filter((op) => op.upcoming === false) || [];

   const registeredOpportunities = UserOpportunities.filter((op) => op.upcoming === true) || [];

  if (loading) {
    return <div className="flex flex-col items-center justify-center space-y-4 h-screen"><BeatLoader color="#04BD64" size={15} /></div>;
  }

  if (!profile) {
    return <p className="p-10 text-gray-500 text-center">Profile not found.</p>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Cover */}
      <section className="w-full h-[320px] bg-linear-to-br from-emerald-950 via-green-900 to-sky-900 flex items-center">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-2xl md:text-5xl font-bold text-white opacity-40 leading-tight max-w-3xl">
            Let's ServeTogether
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

        {/* User Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          {/* Left: Avatar + Info */}
          <div className="flex items-center gap-4">
            <img
              src={profile.profile_image?.url || userImage}
              alt={profile.name}
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border border-gray-200"
            />

            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
                {profile.name}
              </h1>
              <p className="text-sm text-gray-500 break-all">{profile.email}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm border rounded-lg text-gray-600 hover:text-emerald-600 hover:border-emerald-600 transition w-full sm:w-auto">
              <Key size={16} />
              Change Password
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm border rounded-lg text-red-600 hover:border-red-600 transition w-full sm:w-auto"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-10">
          <button
            onClick={() => setActiveTab("registered")}
            className={`pb-3 font-medium ${
              activeTab === "registered"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500"
            }`}
          >
            Registrations
          </button>

          <button
            onClick={() => setActiveTab("completed")}
            className={`pb-3 font-medium ${
              activeTab === "completed"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "registered" && (
          <div>
            {registeredOpportunities.length === 0 ? (
              <p className="text-gray-500 text-center pt-10">
                You haven’t registered for any opportunities yet.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {registeredOpportunities.map((op, index) => (
                  <OpportunityCard key={index} data={op} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "completed" && (
          <div>
            {completedOpportunities.length === 0 ? (
              <p className="text-gray-500 text-center pt-10">
                No completed opportunities yet.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {completedOpportunities.map((op, index) => (
                  <OpportunityCard key={index} data={op} />
                ))}
              </div>
            )}
          </div>
        )}
      </article>
    </div>
  );
};

export default UserProfile;
