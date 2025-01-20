import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const navigate = useNavigate();
  const base_url = "http://127.0.0.1:8000";  // Backend base URL
  const form = useRef(null); // useRef for form

  const [error, setError] = useState("");  // State for error messages
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const name = formData.get("name");
    const number = formData.get("number");
    const password = formData.get("password");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long!");
      return;
    }
    //add mobile otp
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${base_url}/signup`, {
        name,
        number,
        password,
      });

      navigate("/login")
    } catch (error) {
      console.error("Error during signup:", error);
      setError(error.response.message);
    } finally {
      setLoading(false); // End loading state
    }
    //add user created succesfully
  };

  return (
    <div className="formPage flex justify-center items-center w-screen h-screen">
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="SignupPage relative max-w-[30rem] w-full border p-8 rounded-2xl bg-white"
      >
        <h3 className="text-lg font-medium md:text-xl lg:text-2xl mb-10 text-center">
          Signup with Realtime Chat
        </h3>

        {/* Name input */}
        <div className="input-box relative w-full h-[50px] border-b-2 border-[#000] mb-10">
          <input
            type="text"
            required
            name="name"
            className="w-full h-full bg-transparent border-none outline-none"
          />
          <label className="absolute top-[50%] left-0 translate-y-[-50%] pointer-events-none transition-all text-lg font-medium">
            Full Name
          </label>
        </div>

        {/* Phone number input */}
        <div className="input-box relative w-full h-[50px] border-b-2 border-[#000] mb-10">
          <input
            type="number"
            required
            name="number"
            className="w-full h-full bg-transparent border-none outline-none"
          />
          <label className="absolute top-[50%] left-0 translate-y-[-50%] pointer-events-none transition-all text-lg font-medium">
            Phone Number
          </label>
        </div>

        {/* Password input */}
        <div className="input-box relative w-full h-[50px] border-b-2 border-[#000] mb-5">
          <input
            type="password"
            required
            name="password"
            className="w-full h-full bg-transparent border-none outline-none"
          />
          <label className="absolute top-[50%] left-0 translate-y-[-50%] pointer-events-none transition-all text-lg font-medium">
            Password
          </label>
        </div>

        {/* Submit button */}
        <motion.input
          type="submit"
          value={loading ? "Signing Up..." : "Signup"}
          className="w-full border-2 mt-10 py-3 rounded-full cursor-pointer text-base md:text-lg xl:text-xl inline-block bg-[#222E35] text-white font-medium text-center"
          whileHover={{ scale: 0.9 }}
          disabled={loading} // Disable the button during loading
        />

        {/* Error message */}
        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

        <div className="w-full h-[1px] bg-[#222E35] mt-10"></div>

        {/* Login link */}
        <div className="text-center p-3">
          <h4 className="text-lg md:text-xl">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#319d9d] border-b-[1px] border-[#319d9d]"
            >
              Login
            </Link>
          </h4>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
