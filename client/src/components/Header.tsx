import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { logout } from "../api/auth";
import { toast } from "../utils";

const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      toast.success("Logged out");
      navigate("/");
    } catch {
      toast.error("Failed to logout");
    }
  };

  return (
    <header className="bg-white shadow sticky top-0 z-10">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-bold text-blue-600">
          CollabFigma
        </Link>
        <nav className="space-x-4 text-sm">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
              <button className="hover:text-blue-600" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>
              <Link to="/signup" className="hover:text-blue-600">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;
