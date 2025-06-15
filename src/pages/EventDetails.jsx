import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/events/${id}`)
      .then((res) => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading event:', err);
        setLoading(false);
      });
  }, [id]);

  const handleJoin = async () => {
    if (!user) {
      return Swal.fire({
        icon: 'warning',
        title: 'Please Login',
        text: 'You need to be logged in to join this event.',
      });
    }

    const joinData = {
      eventId: id,
      eventTitle: event.title,
      eventDescription: event.description,
      eventEventType: event.eventType,
      eventThumbnail: event.thumbnail,
      eventLocation: event.location,
      userEmail: user.email,
      joinedAt: event.createdBy
    };

    try {
      const res = await axios.post('http://localhost:3000/joinedEvents', joinData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Joined!',
          text: 'You have successfully joined the event.',
          confirmButtonColor: '#f97316'
        });
      } else {
        throw new Error('Failed to join');
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again.',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <img
        src={event.thumbnail}
        alt={event.title}
        className="w-full h-64 md:h-96 object-cover rounded-xl shadow-md"
      />

      <div className="mt-8 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 space-y-2 sm:space-y-0">
          <p><span className="font-semibold">📅 Date:</span> {new Date(event.date).toLocaleDateString()}</p>
          <p><span className="font-semibold">📍 Location:</span> {event.location}</p>
          <p><span className="font-semibold">📂 Type:</span> {event.eventType}</p>
        </div>

        <p className="text-gray-700 text-lg">{event.description}</p>

        <button
          onClick={handleJoin}
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold transition"
        >
          Join Event
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
