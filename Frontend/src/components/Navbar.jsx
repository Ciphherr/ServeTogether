import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="absolute top-0  w-full z-50 bg-transparent">
      <div className="max-w-full flex items-center justify-between px-6 py-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-sky-500">
          <Link to="/" onClick={() => setOpen(false)}>
            <span className="text-emerald-400">Serve</span>Together
          </Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-emerald-400 font-medium">
          <Link to="/opportunities" className="hover:text-sky-400">
            Opportunities
          </Link>
          <Link to="/organizations" className="hover:text-sky-400">
            Organizations
          </Link>
          {isAuthenticated ? (
          <Link
            to="/myprofile"
            className="hover:text-sky-400"
          >
            My Profile
          </Link>
      ) : (
        <Link to="/authentication" className="text-emerald-400 hover:text-sky-400">
          Login
        </Link>
      )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-emerald-400"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t transition-all duration-300 ease-out">
          <div className="flex flex-col px-6 py-6 gap-4 font-medium">
            <Link
              to="/opportunities"
              onClick={() => setOpen(false)}
              className="text-emerald-400"
            >
              Opportunities
            </Link>

            <Link
              to="/organizations"
              onClick={() => setOpen(false)}
              className="text-emerald-400"
            >
              Organizations
            </Link>
                      {isAuthenticated ? (
          <Link
            to="/myprofile"
            className="text-emerald-400 font-medium"
          >
            My Profile
          </Link>
      ) : (
        <Link to="/authentication" className="text-emerald-400">
          Login
        </Link>
      )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
