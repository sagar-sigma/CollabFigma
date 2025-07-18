import React, { useState } from "react";

const VerifyOtp: React.FC = () => {
  const [otp, setOtp] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-center">Verify OTP</h2>
        <input
          type="text"
          maxLength={6}
          className="w-full border p-2 rounded text-center tracking-widest"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button className="w-full bg-black text-white py-2 rounded">
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
