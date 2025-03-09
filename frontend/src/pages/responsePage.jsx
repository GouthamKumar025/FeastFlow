import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/auth/authProvider";
import eventService from "@/services/eventService";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const schema = yup.object().shape({
  name: yup.string().required("Enter your name"),
  age: yup
    .number()
    .required("Enter your age")
    .min(18, "You must be at least 18 years old")
    .max(85, "Age limit is 85"),
  guestLocation: yup.string().required("Enter your location"),
  responseStatus: yup.string().required("Select a response status"),
  foodPreference: yup.string(),
  dietaryPreference: yup.string(),
});

const ResponsePage = () => {
  const { guestId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { currentUser } = useAuth();

  const submitData = async (data) => {
    try {
      await eventService.updateRSVP(guestId, data);
      setDialogMessage("RSVP submitted successfully!");
    } catch (error) {
      setDialogMessage("Error submitting RSVP: " + error.message);
    }
    setOpenDialog(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          RSVP Status
        </h1>
        <form onSubmit={handleSubmit(submitData)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          <div>
            <input
              type="number"
              placeholder="Enter your age"
              {...register("age")}
              min={18}
              max={85}
              step={1}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.age?.message}</p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter your location"
              {...register("guestLocation")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">
              {errors.guestLocation?.message}
            </p>
          </div>

          <div>
            <select
              {...register("responseStatus")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select response</option>
              <option value="Accepted">Accept</option>
              <option value="Declined">Decline</option>
            </select>
            <p className="text-red-500 text-sm">
              {errors.responseStatus?.message}
            </p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter your food preferences"
              {...register("foodPreference")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter your dietary preference"
              {...register("dietaryPreference")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>RSVP Submission</DialogTitle>
          </DialogHeader>
          <p className="text-center text-gray-700">{dialogMessage}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResponsePage;
