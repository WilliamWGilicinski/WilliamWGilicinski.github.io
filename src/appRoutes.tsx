import React from 'react';
import { RouteProps } from 'react-router-dom';

import About from './components/About';
import LandingPage from './components/LandingPage';
import LoadingPage from './components/LoadingPage';

const appRoutes: RouteProps[] = [
    {
        path: '/about',
        element: <About/>
    },
    {
        path: '/',
        element: <LandingPage/>
    },
    {
        path: 'load',
        element: <LoadingPage/>
    }
];

export default appRoutes;