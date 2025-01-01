import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from "../Page/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../Page/Login";
import Register from "../Page/Register";


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
            }

        ],
    }

   



])

export default router;