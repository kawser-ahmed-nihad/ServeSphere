import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../Context/AuthContext';


const UpdateEvents = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

axios
 axios.get(`https://a11-37fs.onrender.com/events/${id}`, {
  withCredentials: true,
  params: {
    email: user.email, 
  },
})
.then(res => {
  setEventData(res.data);
  if (res.data.date) {
    setSelectedDate(new Date(res.data.date));
  }
})
.catch(err => console.error("Failed to load event:", err));


  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;


    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const eventType = form.eventType.value;
    const thumbnail = form.thumbnail.value.trim();
    const location = form.location.value.trim();

    if (!title || !description || !eventType || !thumbnail || !location || !selectedDate) {
      return Swal.fire({
        icon: 'warning',
        title: 'Invalid Input!',
        text: 'Please fill in all fields and select a future date.',
      });
    }

    const updatedEvent = {
      title,
      description,
      eventType,
      thumbnail,
      location,
      date: selectedDate.toISOString(),
      createdBy: eventData.createdBy,
    };

    try {
      const res = await axios.put(`https://a11-37fs.onrender.com/eventUpdate/${id}`, updatedEvent);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Event Updated!',
          text: 'The event was successfully updated.',
        }).then(() => navigate('/manage-events'));
      } else {
        Swal.fire({
          icon: 'info',
          title: 'No Changes',
          text: 'Nothing was updated.',
        });
      }
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'An error occurred while updating the event.',
      });
    }
  };

  if (!eventData) return <p className="text-center mt-24">Loading event details...</p>;

  return (
    <>
      <Helmet>
        <title>ServeSphere || Update</title>
      </Helmet>
      <div className="max-w-2xl mx-auto mt-24 p-6 dark:bg-gray-800   dark:text-white bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Update Event</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input type="text" name="title" defaultValue={eventData.title} placeholder="Title" className="w-full border p-2 rounded" required />
          <textarea name="description" defaultValue={eventData.description} placeholder="Description" className="w-full border p-2 rounded" required />
          <select name="eventType" defaultValue={eventData.eventType} className="w-full border p-2 rounded" required>
            <option value="">Select Event Type</option>
            <option value="Cleanup">Cleanup</option>
            <option value="Plantation">Plantation</option>
            <option value="Donation">Donation</option>
          </select>
          <input type="text" name="thumbnail" defaultValue={eventData.thumbnail} placeholder="Thumbnail URL" className="w-full border p-2 rounded" required />
          <input type="text" name="location" defaultValue={eventData.location} placeholder="Location" className="w-full border p-2 rounded" required />

          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            className="w-full border p-2 rounded"
            placeholderText="Select event date"
          />

          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition">
            Update Event
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateEvents;
