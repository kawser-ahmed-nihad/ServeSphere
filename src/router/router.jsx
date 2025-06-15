import React from 'react';
import { createBrowserRouter } from "react-router";
import Layouts from '../Layouts/Layouts';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword ';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        index: true,
        element: <Home />,
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
  }
]);

export default router;
