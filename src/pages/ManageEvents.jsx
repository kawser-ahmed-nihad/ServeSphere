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

        axios
            .get(`https://a11-37fs.onrender.com/myEvents?email=${user.email}`, {
                withCredentials: true,
            })
            .then((res) => {
                setEvents(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch events:', err);
                setLoading(false);
            });
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Event will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://a11-37fs.onrender.com/events/${id}?email=${user.email}`, {
                        withCredentials: true,
                    });
                    setEvents(events.filter((event) => event._id !== id));
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
            <div className="flex justify-center py-24  dark:bg-gray-800 bg-white items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>ServeSphere || Manage Events</title>
            </Helmet>
            <div className='  dark:bg-gray-800 dark:text-white'>
                <div className=" px-4 py-16 md:px-0 max-w-7xl mx-auto ">
                    <h2 className="text-3xl font-bold text-left max-w-7xl mx-auto text-orange-500 mb-10">Manage Your Events</h2>

                    {events.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            You have not created any events yet.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
                                <thead className="bg-orange-500 text-white text-left">
                                    <tr>
                                        <th className="py-3 px-4">Thumbnail</th>
                                        <th className="py-3 px-4">Title</th>
                                        <th className="py-3 px-4">Date</th>
                                        <th className="py-3 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((event) => (
                                        <tr
                                            key={event._id}
                                            className="border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                        >
                                            <td className="py-3 px-4">
                                                <img
                                                    src={event.thumbnail}
                                                    alt={event.title}
                                                    className="w-16 h-12 object-cover rounded"
                                                />
                                            </td>
                                            <td className="py-3 px-4">{event.title}</td>
                                            <td className="py-3 px-4">{new Date(event.date).toLocaleDateString()}</td>
                                            <td className="py-3 px-4">
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        onClick={() => handleUpdate(event._id)}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(event._id)}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                                                    >
                                                        Delete
                                                    </button>
                                                    <Link
                                                        to={`/eventDetails/${event._id}`}
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                                                    >
                                                        View
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ManageEvents;
