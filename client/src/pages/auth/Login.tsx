import { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <form className="bg-white p-6 rounded shadow space-y-4">
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-black text-white py-2 rounded">
            Login
          </button>
        </form>
        <p className="text-center">
          Don’t have an account?{" "}
          <Link className="text-blue-500" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
