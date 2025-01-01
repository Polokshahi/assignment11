import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from "../Page/Home";
import MainLayout from "../Layout/MainLayout";


const router = createBrowserRouter([

    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                
            },

        ],
    }

   



])

export default router;