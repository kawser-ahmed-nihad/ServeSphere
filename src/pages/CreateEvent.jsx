import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('Cleanup');
  const [thumbnail, setThumbnail] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return setError('You must be logged in to create an event.');
    if (!title.trim()) return setError('Please enter the event title.');
    if (!description.trim()) return setError('Please enter the event description.');
    if (!eventType) return setError('Please select an event type.');
    if (!thumbnail.trim() || !thumbnail.startsWith('http')) return setError('Please provide a valid image URL.');
    if (!location.trim()) return setError('Please enter the location.');
    if (!date || date < new Date()) return setError('Please select a valid future date.');

    const eventData = {
      title,
      description,
      eventType,
      thumbnail,
      location,
      date: date.toISOString(),
      createdBy: user.email,
    };

    try {
      const response = await axios.post('http://localhost:3000/events', eventData);
      if (response.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Event Created!',
          text: 'Your event was saved successfully!',
          confirmButtonColor: '#f97316'
        }).then(() => navigate('/upcoming-events'));
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again.'
      });
    }
  };

  const clearErrorOnChange = () => { if (error) setError(''); };

  return (
    <div className="max-w-2xl mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Create a New Event</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Event Title" className="w-full border p-2 rounded" value={title} onChange={(e) => { setTitle(e.target.value); clearErrorOnChange(); }} />
        <textarea placeholder="Event Description" className="w-full border p-2 rounded h-28" value={description} onChange={(e) => { setDescription(e.target.value); clearErrorOnChange(); }}></textarea>
        <select value={eventType} onChange={(e) => { setEventType(e.target.value); clearErrorOnChange(); }} className="w-full border p-2 rounded">
          <option value="Cleanup">Cleanup</option>
          <option value="Plantation">Plantation</option>
          <option value="Donation">Donation</option>
          <option value="Education">Education</option>
        </select>
        <input type="text" placeholder="Thumbnail Image URL (https://)" className="w-full border p-2 rounded" value={thumbnail} onChange={(e) => { setThumbnail(e.target.value); clearErrorOnChange(); }} />
        <input type="text" placeholder="Location" className="w-full border p-2 rounded" value={location} onChange={(e) => { setLocation(e.target.value); clearErrorOnChange(); }} />
        <DatePicker selected={date} onChange={(date) => { setDate(date); clearErrorOnChange(); }} minDate={new Date()} className="w-full border p-2 rounded" placeholderText="Select event date" />
        <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;