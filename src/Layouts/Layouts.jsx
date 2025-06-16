import React from 'react';
import { Outlet } from 'react-router';
import Fotter from '../Components/Fotter';
import Navbar from '../Components/Navbar';

const Layouts = () => {
    return (
        <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen pt-16">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Fotter></Fotter>
        </div>
    );
};

export default Layouts;