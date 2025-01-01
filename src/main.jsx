import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  
  RouterProvider,
} from "react-router-dom";
import router from './Routers/router.jsx';
import Provider, { AuthContext } from './AuthProvider/Provider.jsx';

createRoot(document.getElementById('root')).render(
  <Provider>
    <RouterProvider router={router}></RouterProvider>
  </Provider>,
)
