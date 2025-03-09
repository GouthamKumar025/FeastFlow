import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Textarea } from "@/components/ui/textarea";
import ContactService from "@/services/contactService";

const schema = yup.object().shape({
  name: yup.string().required("Enter your name"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  query: yup.string().required("Enter your queries"),
});

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [modal, setModal] = useState({ open: false, message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const submitData = async (data) => {
    setLoading(true);
    try {
      await ContactService.saveContact(data);
      setModal({
        open: true,
        message: "Your query has been submitted successfully!",
        type: "success",
      });
      reset();
    } catch (error) {
      setModal({
        open: true,
        message: "Something went wrong. Please try again!",
        type: "error",
      });
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <div className="text-center mb-6">
          <p className="text-blue-600 font-semibold">Get in Touch</p>
          <h2 className="text-2xl font-bold text-gray-800">
            Let's Chat and Reach Out to Us
          </h2>
          <p className="text-gray-600 mt-2">
            Have questions or feedback? We're here to help. Send us a message
            and we'll respond within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit(submitData)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Your Query
            </label>
            <Textarea
              placeholder="Enter your queries"
              {...register("query")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.query?.message}</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 rounded-lg transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {modal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center">
            <h3
              className={`text-lg font-bold ${
                modal.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {modal.type === "success" ? "Success!" : "Error!"}
            </h3>
            <p className="text-gray-700 mt-2">{modal.message}</p>
            <button
              onClick={() => setModal({ open: false, message: "", type: "" })}
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

export default ContactPage;
