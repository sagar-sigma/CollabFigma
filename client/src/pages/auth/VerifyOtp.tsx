import React, { useRef, useState } from "react";
import { ConfirmLoginOtp, verifyOtp } from "../../api/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { handleApiResponse, handleAxiosError, toast } from "../../utils";

const VerifyOtp: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("Text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      newOtp.forEach((digit, idx) => {
        if (inputRefs.current[idx]) inputRefs.current[idx].value = digit;
      });
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      return;
    }
    try {
      const response =
        state.type === "signup"
          ? await verifyOtp(state.email, code)
          : await ConfirmLoginOtp(state.email, code);

      const data = handleApiResponse(response);
      toast.success(data?.message ?? "OTP verified!");
      navigate("/dashboard");
    } catch (err) {
      handleAxiosError(err, "Verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleVerify}
        className="bg-white p-6 rounded shadow w-full max-w-sm space-y-6"
      >
        <h2 className="text-xl font-bold text-center">Verify OTP</h2>
        <div className="flex justify-between gap-2" onPaste={handlePaste}>
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => {
                inputRefs.current[idx] = el!;
              }}
              className="w-12 h-12 border rounded text-center text-xl tracking-wider focus:outline-blue-500"
            />
          ))}
        </div>
        <button
          type="submit"
          onClick={handleVerify}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
