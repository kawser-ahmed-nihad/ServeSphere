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
        element: <CreateEvent />,
      },
      {
        path: "upcoming-events",
        element: <EventCard />,
      },
      {
        path: "eventDetails/:id",
        element: <EventDetails />,
      },
      {
        path: "joined-events",
        element: <JoinEvents />,
      },
      {
        path: "manage-events",
        element: <ManageEvents />,
      },
      {
        path: "/update-event/:id",
        element: <UpdateEvents/>,
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
