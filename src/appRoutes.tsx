import React from 'react';
import { RouteProps } from 'react-router-dom';
import handleTest from './App';
import About from './components/About';
import LandingPage from './components/LandingPage';
import LoadingPage from './components/LoadingPage';
import Test from './components/Test';

const appRoutes: RouteProps[] = [
    // {
    //     path: '/about',
    //     element: <About/>
    // },
    // {
    //     path: '/',
    //     element: <LandingPage handleTest={handleTest}/>
    // },
    // {
    //     path: 'load',
    //     element: <LoadingPage/>
    // },
    {
        path: '/test',
        element: <Test handleTest={handleTest}/>
    }
];

export default appRoutes;