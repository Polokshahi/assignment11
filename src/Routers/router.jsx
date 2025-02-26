import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../Page/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../Page/Login";
import Register from "../Page/Register";
import Rooms from "../Component/Rooms/Rooms";
import ErrorPage from "../Page/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import RoomDetails from "../Component/Rooms/RoomDetails";
import MyBookings from "../Component/MyBooking/MyBookings";




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
                path: '/login',
                element: <Login></Login>
                
            },

            {
                path: '/register',
                element: <Register></Register>
            },
          

            {
                path: '/rooms',
                element: <Rooms></Rooms>
            },
           

            {
                path: "/rooms/:id",
                element: <RoomDetails></RoomDetails>,
              },




            {
                path: '/bookings',
                element: (
                    <PrivateRoute>
                        <MyBookings></MyBookings>
                    </PrivateRoute>
                ),
                // loader: () =>fetch('https://assignment11-server-side-nine.vercel.app/bookings')
            },

           

          

            {
                path: '*',
                element: <ErrorPage></ErrorPage>,
            }


        ],

       
    }

   



])

export default router;