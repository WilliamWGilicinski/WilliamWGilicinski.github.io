import { Box, ThemeProvider, Typography } from '@mui/material';
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

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10_000
        }
    }
})


export default function App(this: any) {
    
    const [selectedTheme, setSelectedTheme] = useState(darkTheme);
        // const savedTheme = JSON.stringify(localStorage.getItem("theme"));
        // const initialState = JSON.parse(savedTheme);
        // return initialState || darkTheme;

    const handleThemeChange = () => {
    console.log('test');
    console.log(selectedTheme.palette);
    if(selectedTheme === darkTheme)
    {
        setSelectedTheme(lightTheme);
        // localStorage.setItem("theme", JSON.stringify(lightTheme));
    }
    else
    {
        setSelectedTheme(darkTheme);
        // localStorage.setItem("theme", JSON.stringify(darkTheme));
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
    // {
    //     path: 'load',
    //     element: <LoadingPage/>
    // },
    {
        path: '/test',
        element: <Test handleThemeChange={handleThemeChange}/>
    },
    {
        path: 'resume',
        element: <Resume handleThemeChange={handleThemeChange}/>
    }
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