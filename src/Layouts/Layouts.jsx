import React from 'react';
import { Outlet } from 'react-router';
import Fotter from '../Components/Fotter';
import Navbar from '../Components/Navbar';

const Layouts = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Fotter></Fotter>
        </div>
    );
};

export default Layouts;