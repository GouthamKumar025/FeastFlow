import React from "react";
import potluck from "../assets/potluck-image.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10 mx-5 sm:mx-10">
      <div className="w-full sm:w-1/2 flex justify-center">
        <img
          className="rounded-md w-full max-w-md"
          src={potluck}
          alt="potluck-event"
        />
      </div>

      <div className="w-full sm:w-1/2 flex flex-col gap-5">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create Event</CardTitle>
            <CardDescription>Host your own event</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Plan and create your own event effortlessly. Set up the date,
              time, and details to invite your guests and make it an
              unforgettable experience.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => navigate("/eventRegister")}
              className="w-full sm:w-auto"
            >
              Create Event
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>View Events</CardTitle>
            <CardDescription>Browse Upcoming Events</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Check out events that have already been created. View event
              details, RSVP, and stay updated on any changes.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => navigate("/events")}
              className="w-full sm:w-auto"
            >
              View Events
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Homepage;
