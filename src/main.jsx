import React from 'react';

import ReactDOM from 'react-dom/client'; 
import './index.css';
import {RecoilRoot} from 'recoil';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout.jsx';
import Jobs from './Pages/Jobs.jsx';
import JobDescription from './Components/Jobs/JobDescription.jsx';
 
import Home from './Pages/Home.jsx';
import Error from './Pages/Error.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/Jobs',
        element: <Jobs />,
      },
      {
        path: "/:jobId" ,
        element: <JobDescription />,
      },
     {
        path: '/Error',
        element: <Error />,
      },
    
    
    ],
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RecoilRoot>
    <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>,
);
