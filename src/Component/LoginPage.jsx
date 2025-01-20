import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const base_url = "http://127.0.0.1:8000"; // Backend base URL
  const form = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const number = formData.get("number");
    const password = formData.get("password");

    try {
      const response = await axios.post(`${base_url}/login`, {
        number,
        password,
      });
      localStorage.setItem("authToken", response.data.Token);
      navigate("/")
    } catch (error) {
      console.error("Error during Login:", error);
      setError(error.response.data.message);
    }
  };


  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="formPage relative max-w-[30rem] w-full border p-8 rounded-2xl bg-white"
      >
        <h3 className="text-lg font-medium md:text-xl lg:text-2xl mb-10 text-center">
          Login to Realtime Chat
        </h3>
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
        <motion.input
          type="submit"
          value="Login"
          className="w-full border-2 mt-10 py-3 rounded-full cursor-pointer text-base md:text-lg xl:text-xl inline-block bg-[#222E35] text-white font-medium text-center"
          whileHover={{ scale: 0.9 }}
        />
        {/* Error message */}
        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

        <div className="w-full h-[1px] bg-[#222E35] mt-10"></div>
        <div className="text-center p-3">
          <h4 className="text-lg md:text-xl">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#319d9d] border-b-[1px] border-[#319d9d]"
            >
              Sign up
            </Link>
          </h4>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
