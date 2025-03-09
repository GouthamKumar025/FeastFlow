import React, { useEffect, useState } from "react";
import { useAuth } from "@/auth/authProvider";
import EventService from "@/services/eventService";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        if (currentUser?.uid) {
          const response = await EventService.getEventsByUserId(
            currentUser.uid
          );
          setEvents(response.data);
        }
      } catch (err) {
        setError("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, [currentUser]);

  if (loading)
    return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (events.length === 0)
    return <div className="text-center text-gray-600">No events found</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Events</h1>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white border-collapse">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600">
              <tr>
                <th className="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider">
                  Event No
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider">
                  Event Name
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider">
                  Venue
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider">
                  Guest Details
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider">
                  Map
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event, index) => {
                const formattedDate = format(
                  parseISO(event.date),
                  "MMMM dd, yyyy"
                );
                return (
                  <tr
                    key={event.eventId}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formattedDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      {event.eventName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {event.eventLocation}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {event.venue}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {event.time}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {event.guestDetails?.split(",").map((guest, index) => (
                        <span key={index} className="block">
                          {guest.trim()}
                        </span>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-500 hover:text-blue-600">
                      <a
                        href={event.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        View Map
                      </a>
                    </td>
                    <td>
                      <button
                        onClick={() => navigate(`/guests/${event.eventId}`)}
                        class="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
                          border-blue-600
                          border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                          active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                      >
                        Guest RSVP
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
