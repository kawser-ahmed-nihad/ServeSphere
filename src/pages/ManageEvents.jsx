import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { Helmet } from 'react-helmet';

const ManageEvents = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.email) return;

        axios.get(`https://a11-37fs.onrender.com/myEvents?email=${user.email}`, {
            withCredentials: true
        })
            .then(res => {
                setEvents(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch events:', err);
                setLoading(false);
            });
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Event will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://a11-37fs.onrender.com/events/${id}?email=${user.email}`, {
                        withCredentials: true
                    });
                    setEvents(events.filter(event => event._id !== id));
                    Swal.fire('Deleted!', 'Event has been deleted.', 'success');
                } catch (err) {
                    console.error(err);
                    Swal.fire('Error!', 'Something went wrong.', 'error');
                }
            }
        });
    };

    const handleUpdate = (id) => {
        navigate(`/update-event/${id}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-24 items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>ServeSphere || Manage Events</title>
            </Helmet>
            <div className="max-w-6xl  dark:bg-black  dark:text-white mx-auto px-4 py-24">
                <h2 className="text-3xl font-bold text-center text-orange-500 mb-10">Manage Your Events</h2>

                {events.length === 0 ? (
                    <p className="text-center text-gray-500">You have not created any events yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {events.map(event => (
                            <div key={event._id} className="bg-white p-6 rounded-xl shadow-md space-y-3">
                                <img
                                    src={event.thumbnail}
                                    alt={event.title}
                                    className="w-full h-40 object-cover rounded-md"
                                />
                                <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                                <p className="text-sm text-gray-600"> {new Date(event.date).toLocaleDateString()}</p>
                                <p className="text-gray-700 line-clamp-2">{event.description}</p>

                                <div className="flex justify-between items-center mt-3">
                                    <button
                                        onClick={() => handleUpdate(event._id)}
                                        className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event._id)}
                                        className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default ManageEvents;
