import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold mb-2">Collab Figma</h1>
      <p className="text-gray-500 mb-6">Design. Collaborate. Build.</p>
      <div className="space-x-4">
        <Link to="/signup" className="bg-black text-white px-6 py-2 rounded">
          Get Started
        </Link>
        <Link to="/login" className="border border-black px-6 py-2 rounded">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
