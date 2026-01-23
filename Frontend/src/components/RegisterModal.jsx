import { useState } from "react";
import { registerForEvent } from "../api/posting";

const RegistrationModal = ({ eventTitle, eventUID, onClose, onSuccess, userUID }) => {
  console.log("UID:", userUID)
  const [form, setForm] = useState({
    full_name: "",
    age: "",
    gender: "",
    phone_number: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerForEvent({
        ...form,
        event_uid: eventUID,
        event_title: eventTitle,
        user_uid : userUID,
      });

      onClose();
      onSuccess();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };


  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 transition"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Event Registration
          </h2>
          <p className="mt-1 text-sm text-emerald-700 font-medium">
            {eventTitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              name="full_name"
              required
              onChange={handleChange}
              placeholder="Enter your full name"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Age
              </label>
              <input
                name="age"
                type="number"
                onChange={handleChange}
                placeholder="Age"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Gender
              </label>
              <select
                name="gender"
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              name="phone_number"
              onChange={handleChange}
              placeholder="10-digit phone number"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-full bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
