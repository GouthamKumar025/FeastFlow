import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/auth/authProvider";
import eventService from "@/services/eventService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

const schema = yup.object().shape({
  eventName: yup.string().required("Enter your event name"),
  date: yup.date().required("Enter the date"),
  time: yup
    .string()
    .matches(
      /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/,
      "Enter time in HH:mm format"
    )
    .required("Enter the time"),
  eventLocation: yup.string().required("Enter the location"),
  venue: yup.string().required("Enter the venue"),
  mapLink: yup.string().url("Enter a valid URL"),
  guestDetails: yup
    .string()
    .matches(
      /^([\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4},?)+$/,
      "Enter valid email addresses separated by commas"
    )
    .required("Enter at least one guest email"),
});

const EventRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Fix reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);

  const submitData = async (data) => {
    const details = { ...data, userId: currentUser?.uid };
    try {
      await eventService.saveEvent(details);
      setOpen(true);
      reset();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create Event
        </h1>
        <form onSubmit={handleSubmit(submitData)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter your event name"
              {...register("eventName")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.eventName?.message}</p>
          </div>

          <div>
            <input
              type="date"
              {...register("date")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.date?.message}</p>
          </div>

          <div>
            <input
              type="time"
              {...register("time")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.time?.message}</p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter the location"
              {...register("eventLocation")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">
              {errors.eventLocation?.message}
            </p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter the venue"
              {...register("venue")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.venue?.message}</p>
          </div>

          <div>
            <input
              type="url"
              placeholder="Enter the map link"
              {...register("mapLink")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.mapLink?.message}</p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter guest emails (comma separated)"
              {...register("guestDetails")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">
              {errors.guestDetails?.message}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Event Submitted</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Your event has been successfully created!
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventRegister;
