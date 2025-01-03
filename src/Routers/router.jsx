import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from "../Page/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../Page/Login";
import Register from "../Page/Register";
import MyBooking from "../Component/MyBooking/MyBooking";
import Rooms from "../Component/Rooms/Rooms";
import ErrorPage from "../Page/ErrorPage";


const router = createBrowserRouter([

    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                
            },

            {
                path: 'login',
                element: <Login></Login>
                
            },

            {
                path: 'register',
                element: <Register></Register>
            },

            {
                path: '/rooms',
                element: <Rooms></Rooms>
            },
            {
                path: '/mybookings',
                element: <MyBooking></MyBooking>
            },
            
            {
                path: '*',
                element: <ErrorPage></ErrorPage>,
            }


        ],

       
    }

   



])

export default router;