import React, { useState } from "react";
import { auth, db } from "../auth/firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserService from "../services/userService";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      console.log("User Created:", user);

      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        uid: user.uid,
      });

      const userDetails = {
        userId: user.uid,
        name: formData.name,
        email: formData.email,
      };

      try {
        const response = await UserService.saveUsers(userDetails);
        console.log("Backend Response:", response.data);
      } catch (error) {
        console.error("Error saving user:", error.message);
      }

      setFormData({ name: "", email: "", password: "" });
      navigate("/home", { replace: true });
    } catch (error) {
      setError("Signup failed. Try again.");
      console.error("Signup Error:", error.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Sign Up
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Create your account to get started!
        </p>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form className="flex flex-col gap-4" onSubmit={signUp}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-semibold rounded-lg py-2 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
