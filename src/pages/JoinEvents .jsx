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
            .get(`https://a11-37fs.onrender.com/joinedEvents?email=${user.email}`,{
                withCredentials: true
            })
            .then((res) => {
                const sortedEvents = res.data.sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
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
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>ServeSphere || Joind Events</title>
            </Helmet>
            <div className="max-w-6xl  dark:bg-black  dark:text-white mx-auto px-4 py-20">
                <h5 className="text-orange-500 text-2xl uppercase tracking-wider font-semibold mb-8 text-center">
                    Joined Events
                </h5>

                {joinedEvents.length === 0 ? (
                    <p className="text-center text-gray-500">You haven’t joined any events yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {joinedEvents.map((event, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-2xl shadow-md flex flex-col space-y-4"
                            >
                                <p className="text-orange-500 font-medium">
                                    {new Date(event.joinedAt).toLocaleDateString()}
                                </p>

                                <h2 className="text-xl font-semibold text-gray-800 leading-snug">
                                    {event.eventTitle}
                                </h2>

                                <img
                                    src={event.eventThumbnail}
                                    alt={event.eventTitle}
                                    className="rounded-lg w-full h-48 object-cover"
                                />

                                <Link
                                    to={`/eventDetails/${event.eventId}`}
                                    className="text-orange-500 font-medium inline-flex items-center hover:underline"
                                >
                                    Read More <span className="ml-1">→</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default JoinEvents;
