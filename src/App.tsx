import "core-js";
import { Box, Theme, ThemeProvider, Typography } from '@mui/material';
import React, { Suspense, useEffect, useState } from 'react';
import { darkTheme, lightTheme }  from './theme';
import LoadingPage from './components/LoadingPage';
// import appRoutes from './appRoutes';
import { BrowserRouter as Router, Route, RouteProps, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Test from './components/Test';
import LandingPage from './components/LandingPage';
import About from './components/About';
import Resume from './components/Resume';
import Animation from './components/Animation';
import BottomBar from './components/BottomBar';
import TopAppBar from './components/TopAppBar';
import WebGL from './components/WebGL';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10_000
        }
    }
})

console.log("Hello");


export default function App(this: any) {
    
    const [selectedTheme, setSelectedTheme] = useState(darkTheme);

    // useEffect(() => {
    //     const selectedTheme = JSON.parse(localStorage.getItem('selectedTheme'));
    //     localStorage.setItem('selectedTheme', JSON.stringify(selectedTheme));
    // }, [selectedTheme])

    const handleThemeChange = (isLight: boolean) => {
    if(isLight)
    {
        setSelectedTheme(lightTheme);
    }
    else
    {
        setSelectedTheme(darkTheme);
    }
}

//Had to bring in the routes inside App because I couldn't pass props otherwise
const appRoutes: RouteProps[] = [
    {
        path: '/about',
        element: <About handleThemeChange={handleThemeChange}/>
    },
    {
        path: '/',
        element: <LandingPage handleThemeChange={handleThemeChange}/>
    },
    {
        path: '/test',
        element: <Test handleThemeChange={handleThemeChange}/>
    },
    {
        path: 'resume',
        element: <Resume handleThemeChange={handleThemeChange}/>
    },
    {
        path: '/animation',
        element: <Animation handleThemeChange={handleThemeChange}/>
    },
    {
        path: '/test',
        element: <Test handleThemeChange={handleThemeChange}/>
    },
    {
        path: '/webgl',
        element: <WebGL handleThemeChange={handleThemeChange}/>
    },
];

    return (
        <Router>
            <ThemeProvider theme={selectedTheme}>
                <QueryClientProvider client={queryClient}>
                    <Suspense fallback={
                        <LoadingPage/>
                    }>
                        <Routes>
                            {appRoutes.map(({ ...routeProps }) =>
                                <Route {...routeProps} key={routeProps.path as string} />
                                )}          
                        </Routes>
                    </Suspense>
                </QueryClientProvider>
            </ThemeProvider>
        </Router>
    );
}