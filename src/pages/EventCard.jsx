import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    axios.get('http://localhost:3000/events')
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading events:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20 items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 border-solid"></div>
      </div>
    );
  }

  

  return (
    <div className="max-w-6xl mx-auto px-4 py-25">
      <h5 className="text-orange-500 text-2xl uppercase tracking-wider font-semibold mb-8 text-center">
        Upcoming Events
      </h5>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md flex flex-col space-y-4"
            >
              <p className="text-orange-500 font-medium">{event.date}</p>
              <h2 className="text-xl font-semibold text-gray-800 leading-snug">
                {event.title}
              </h2>
              <img
                src={event.image}
                alt={event.title}
                className="rounded-lg w-full h-48 object-cover"
              />
              <Link
                to={`/eventDetails/${event._id}`}
                className="text-orange-500 font-medium inline-flex items-center hover:underline"
              >
                Read More <span className="ml-1">→</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
