import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import { sendEmailVerification } from 'firebase/auth';
import { Helmet } from 'react-helmet';

const SignUp = () => {
    const { createUser, updateUser } = useContext(AuthContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        setError("");


        if (password.length < 8) {
            Swal.fire("Error", "Password must be at least 8 characters", "error");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            Swal.fire("Error", "Password must contain at least one uppercase letter", "error");
            return;
        }
        if (!/[a-z]/.test(password)) {
            Swal.fire("Error", "Password must contain at least one lowercase letter", "error");
            return;
        }


        createUser(email, password)
            .then((result) => {
                const user = result.user;

                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        sendEmailVerification(user)
                            .then(() => {

                                Swal.fire(
                                    "Registration Successful!",
                                    "Please check your email and verify it before logging in.",
                                    "success"
                                ).then(() => {
                                    form.reset();
                                    navigate("/login");
                                });
                            })
                            .catch((error) => {
                                Swal.fire("Email Error", error.message, "error");
                            });
                    })
                    .catch((error) => {
                        Swal.fire("Update Error", error.message, "error");
                    });
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            });
    };

    return (
        <>

            <Helmet>
                <title>ServeSphere || Sign up</title>
            </Helmet>
            <div className="dark:bg-gray-800 bg-white flex dark:text-white items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-8 space-y-6">
                    

                    <h2 className="text-center text-2xl font-bold text-gray-900  dark:text-gray-300">Sign up for an account</h2>

                    <form onSubmit={handleRegister} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Name
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="photo" className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                                    Photo URL
                                </label>
                                <input
                                    name="photo"
                                    type="text"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                                    Email address
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                            >
                                Sign Up
                            </button>
                        </div>

                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </form>

                    <p className="text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-orange-500">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default SignUp;
