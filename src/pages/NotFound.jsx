import React from 'react';
import { Link } from 'react-router';

import errorPng from '../assets/404.png'
import { Helmet } from 'react-helmet';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const NotFound = () => {
    return (

        <>
            <Helmet>
                <title>ServeSphere || Page not Found</title>
            </Helmet>

            <div className="min-h-screen dark:bg-gray-800   dark:text-white flex flex-col justify-center items-center bg-white px-4 text-center">
                <DotLottieReact
                    src="https://lottie.host/ed6b01d7-e123-47e4-90fa-2c172df78845/lQH0xR3mag.lottie"
                    loop
                    autoplay
                />

                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Oops! page not found
                </h1>

                <p className="text-gray-600 text-lg mb-6">
                    Sorry, We can't find the page you're looking.
                </p>

                <Link
                    to="/"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-full transition duration-300"
                >
                    Back To Home →
                </Link>
            </div>
        </>
    );
};

export default NotFound;
