import React from "react";
import eventgather from "../assets/eventgather.jpeg";

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col items-center text-center">
      <p className="text-2xl tracking-wide uppercase font-bold text-gray-700 my-10">
        Effortless RSVP, seamless events—plan, invite, and track with ease!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-center">
        <div className="text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Make Every RSVP Effortless & Memorable!
          </h1>
          <p className="text-gray-700 leading-relaxed">
            Planning an event? Whether it's a corporate conference, a startup
            networking meetup, or a private gathering, our{" "}
            <strong>Event RSVP</strong>
            platform simplifies guest management. With seamless invitations,
            automated email confirmations, and real-time tracking, you can focus
            on creating amazing experiences.
          </p>
          <p className="mt-4 text-gray-700">
            From small business events to large-scale corporate functions, we
            empower hosts with smart RSVP solutions that enhance efficiency and
            engagement. Say goodbye to manual tracking and hello to stress-free
            event planning!
          </p>
          <p className="mt-4 text-lg font-semibold text-indigo-600">
            Smart Invites | Hassle-Free RSVPs | Effortless Event Success
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src={eventgather}
            alt="Event Gathering"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>

      <footer className="mt-12 text-gray-600 text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold">Goutham</span>. All Rights Reserved.
      </footer>
    </div>
  );
};

export default AboutPage;
