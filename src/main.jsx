// Import required modules
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css';
import { RouterProvider } from "react-router-dom";

import router from './Routers/router.jsx';
import Provider from './AuthProvider/Provider.jsx';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <Provider>
    {/* Wrap the app with HelmetProvider */}
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  </Provider>
);
