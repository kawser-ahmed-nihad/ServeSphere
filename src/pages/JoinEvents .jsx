import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';

const JoinEvents = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        axios
            .get(`https://a11-37fs.onrender.com/joinedEvents?email=${user.email}`, {
                withCredentials: true,
            })
            .then((res) => {
                const sortedEvents = res.data.sort(
                    (a, b) => new Date(a.joinedAt) - new Date(b.joinedAt)
                );
                setJoinedEvents(sortedEvents);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error loading joined events:', err);
                setLoading(false);
            });
    }, [user]);

    if (authLoading || loading) {
        return (
            <div className="flex justify-center dark:bg-gray-800 bg-white items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>ServeSphere || Joined Events</title>
            </Helmet>
            <div className='dark:bg-gray-800 bg-white'>
                <div className="max-w-7xl mx-auto px-4 py-20 md:px-0 dark:text-white">
                    <h5 className="text-orange-500 max-w-7xl mx-auto text-2xl uppercase tracking-wider font-semibold mb-8 text-left">
                        Joined Events
                    </h5>

                    {joinedEvents.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            You haven’t joined any events yet.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
                                <thead className="bg-orange-500 text-white">
                                    <tr>
                                        <th className="py-3 px-4 text-left">Thumbnail</th>
                                        <th className="py-3 px-4 text-left">Title</th>
                                        <th className="py-3 px-4 text-left">Joined Date</th>
                                        <th className="py-3 px-4 text-left">Type</th>
                                        <th className="py-3 px-4 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {joinedEvents.map((event, index) => (
                                        <tr
                                            key={index}
                                            className="border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                        >
                                            <td className="py-3 px-4">
                                                <img
                                                    src={event.eventThumbnail}
                                                    alt={event.eventTitle}
                                                    className="w-16 h-12 object-cover rounded"
                                                />
                                            </td>
                                            <td className="py-3 px-4">{event.eventTitle}</td>
                                            <td className="py-3 px-4">
                                                {new Date(event.joinedAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4">{event.eventEventType}</td>
                                            <td className="py-3 px-4">
                                                <Link
                                                    to={`/eventDetails/${event.eventId}`}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                                                >
                                                    View
                                                </Link>
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

export default JoinEvents;
