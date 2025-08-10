import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { Helmet } from 'react-helmet';
import { FiCalendar, FiMapPin, FiFolder } from "react-icons/fi";
const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://a11-37fs.onrender.com/events/${id}?email=${user.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading event:', err);
        setLoading(false);
      });
  }, [id, user]);

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
      joinedAt: event.date,
    };

    try {

      const checkRes = await axios.get(
        `https://a11-37fs.onrender.com/joinedEvents/check?eventId=${id}&email=${user.email}`,
        { withCredentials: true }
      );

      if (checkRes.data?.alreadyJoined) {

        return Swal.fire({
          title: 'Already joined!',
          text: 'You have already joined this event. Do you want to join again?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, Join Again',
          cancelButtonText: 'No',
          confirmButtonColor: '#f97316',
          cancelButtonColor: '#888',
        }).then(async (result) => {
          if (result.isConfirmed) {
            const res = await axios.post(
              `https://a11-37fs.onrender.com/joinedEvents?email=${user.email}`,
              joinData,
              { withCredentials: true }
            );

            if (res.data.insertedId) {
              Swal.fire({
                icon: 'success',
                title: 'Rejoined successfully!',
                confirmButtonColor: '#f97316',
              });
            }
          }
        });
      }


      const res = await axios.post(
        `https://a11-37fs.onrender.com/joinedEvents?email=${user.email}`,
        joinData,
        { withCredentials: true }
      );
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Joined!',
          text: 'You have successfully joined the event.',
          confirmButtonColor: '#f97316',
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 border-solid"></div>
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
    <div className="dark:bg-gray-800 bg-white min-h-screen">
      <Helmet>
        <title>ServeSphere || {event.title}</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 md:px-0 py-20">

        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src={event.thumbnail}
            alt={event.title}
            className="w-full h-[320px] md:h-[480px] object-cover transform hover:scale-105 transition duration-500"
          />
        </div>


        <div className="mt-10 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-500">{event.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p className="flex items-center gap-2 dark:text-gray-300 rounded-lg px-4 py-3">
              <FiCalendar className="text-lg" />
              <span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString()}
            </p>

            <p className="flex items-center gap-2 dark:text-gray-400 rounded-lg px-4 py-3">
              <FiMapPin className="text-lg" />
              <span className="font-semibold">Location:</span> {event.location}
            </p>

            <p className="flex items-center gap-2 dark:text-gray-400 rounded-lg px-4 py-3">
              <FiFolder className="text-lg" />
              <span className="font-semibold">Type:</span> {event.eventType}
            </p>
          </div>

          <p className="text-lg text-black dark:text-gray-300 leading-relaxed mt-6 border-l-4 border-orange-400 pl-4">
            {event.description}
          </p>
          
          <div className="mt-10">
            <button
              onClick={handleJoin}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition duration-300 shadow-lg"
            >
              Join This Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
