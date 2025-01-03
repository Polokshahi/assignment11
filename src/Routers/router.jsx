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
import PrivateRoute from "./PrivateRoute";
import RoomDetailsPage from "../Component/Rooms/RoomDetailsPage";


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
                path: '/rooms/room_details_page/:roomId',
                element: <RoomDetailsPage></RoomDetailsPage>,
                loader: () => fetch(`http://localhost:3000/rooms`)
                

            },
            {
                path: '/mybookings',
                element: <PrivateRoute><MyBooking></MyBooking></PrivateRoute>
            },

            {
                path: '*',
                element: <ErrorPage></ErrorPage>,
            }


        ],

       
    }

   



])

export default router;