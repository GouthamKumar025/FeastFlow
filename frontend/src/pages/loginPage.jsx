import React, { useState } from "react";
import { auth } from "../auth/firebase";
import password_logo from "../assets/locked-computer.png";
import mail from "../assets/mail.png";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, message: "" });

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User Logged In:", userCredential.user);
      navigate("/home", { replace: true });
      setEmail("");
      setPassword("");
    } catch (error) {
      setModal({ open: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center w-96 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
        <p className="text-gray-500 text-sm mt-1">
          Start managing your events at one tap
        </p>

        <div className="w-full mt-6 space-y-6">
          <div className="flex items-center border-b-2 border-gray-300 focus-within:border-black py-2">
            <img className="h-6 w-6 mr-3" src={mail} alt="email" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
              className="w-full outline-none text-gray-700 px-2"
            />
          </div>

          <div className="flex items-center border-b-2 border-gray-300 focus-within:border-black py-2">
            <img className="h-6 w-6 mr-3" src={password_logo} alt="password" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              className="w-full outline-none text-gray-700 px-2"
            />
          </div>
        </div>

        <div className="w-full flex justify-center mt-8">
          <button
            onClick={login}
            disabled={loading}
            className={`w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              loading ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>

        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-bold hover:cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>

      {modal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center">
            <h3 className="text-lg font-bold text-red-600">Login Failed</h3>
            <p className="text-gray-700 mt-2">{modal.message}</p>
            <button
              onClick={() => setModal({ open: false, message: "" })}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
