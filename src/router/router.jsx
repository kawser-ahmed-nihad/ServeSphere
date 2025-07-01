import React from 'react';
import { createBrowserRouter } from "react-router";
import Layouts from '../Layouts/Layouts';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword ';
import CreateEvent from '../pages/CreateEvent';
import EventCard from '../pages/EventCard';
import EventDetails from '../pages/EventDetails';
import JoinEvents from '../pages/JoinEvents ';
import NotFound from '../pages/NotFound';
import ManageEvents from '../pages/ManageEvents';
import UpdateEvents from '../pages/UpdateEvents';
import PrivateRoute from '../Context/PrivateRoute';
import BlogDetails from '../pages/BlogDetails ';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "create-event",
        element: <PrivateRoute><CreateEvent /></PrivateRoute>,
      },
      {
        path: "upcoming-events",
        element: <EventCard />,
      },
      {
        path: "eventDetails/:id",
        element: <PrivateRoute><EventDetails /></PrivateRoute>,
      },
      {
        path: "joined-events",
        element: <PrivateRoute><JoinEvents /></PrivateRoute>,
      },
      {
        path: "manage-events",
        element: <PrivateRoute><ManageEvents /></PrivateRoute>,
      },
      {
        path: "/update-event/:id",
        element: <PrivateRoute><UpdateEvents /></PrivateRoute>,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetails />,
      },
    ]

  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "forgot",
    element: <ForgotPassword />
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);

export default router;
