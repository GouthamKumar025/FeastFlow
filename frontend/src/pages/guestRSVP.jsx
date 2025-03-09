import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventService from "@/services/eventService";
import {
  connect,
  disconnect,
  sendRsvpUpdate,
} from "@/services/websocketService";

const GuestRSVP = () => {
  const { eventId } = useParams();
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGuestEvents = async () => {
      try {
        const response = await EventService.getGuestsByEventId(eventId);
        setGuests(response.data);
      } catch (err) {
        setError("Failed to fetch guest events");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchGuestEvents();
    }
  }, [eventId]);

  useEffect(() => {
    connect((updatedGuest) => {
      setGuests((prevGuests) =>
        prevGuests.map((guest) =>
          guest.guestId === updatedGuest.guestId ? updatedGuest : guest
        )
      );
    });

    return () => disconnect();
  }, []);

  if (loading)
    return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (guests.length === 0)
    return <div className="text-center text-gray-600">No guest found</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Guest Responses
        </h1>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white border-collapse">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600">
              <tr>
                <th className="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider">
                  Guest No
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider">
                  Response Status
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider">
                  Guest Location
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider">
                  Dietary Preferences
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider">
                  Food Preferences
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {guests.map((guest, index) => (
                <tr
                  key={guest.guestId || index}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {guest.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                    {guest.responseStatus || "Pending"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {guest.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {guest.age || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {guest.guestLocation || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {guest.dietaryPreference || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {guest.foodPreference || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GuestRSVP;
