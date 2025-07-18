import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-10">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-bold text-blue-600">
          CollabFigma
        </Link>
        <nav className="space-x-4 text-sm">
          <Link to="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/login" className="hover:text-blue-600">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;
