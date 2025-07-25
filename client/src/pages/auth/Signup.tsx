import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../api/auth";
import { handleApiResponse, handleAxiosError, toast } from "../../utils";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signup(email, password);
      const data = handleApiResponse<{ email: string }>(response);
      toast.success(
        data?.message ?? "Signup successful. Please check your email for OTP."
      );
      navigate("/verify-otp", { state: { email, type: "signup" } });
    } catch (err) {
      handleAxiosError(err, "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center">Create Account</h2>
        <form
          className="bg-white p-6 rounded shadow space-y-4"
          onSubmit={handleSignup}
        >
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
          <button
            className="w-full bg-black text-white py-2 rounded"
            type="submit"
            onClick={handleSignup}
            disabled={loading}
          >
            Signup
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
