// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css'
import {
  
  RouterProvider,
} from "react-router-dom";
import router from './Routers/router.jsx';
import Provider, { AuthContext } from './AuthProvider/Provider.jsx';
const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <Provider>
    <QueryClientProvider client = {queryClient}>
    <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </Provider>,
)
