import { Box, ThemeProvider, Typography } from '@mui/material';
import React, { Suspense, useEffect, useState } from 'react';
import { darkTheme, lightTheme }  from './theme';
import LoadingPage from './components/LoadingPage';
// import appRoutes from './appRoutes';
import { BrowserRouter, HashRouter, Route, RouteProps, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Theme } from '@mui/system/createTheme';
import { DarkMode } from '@mui/icons-material';
import useToggle from './useChangeTheme';
import { storage } from './storage';
import Test from './components/Test';
import LandingPage from './components/LandingPage';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10_000
        }
    }
})


export default function App(this: any) {
    
    const [selectedTheme, setSelectedTheme] = useState(darkTheme);

    const handleThemeChange = () => {
    console.log('test');
    console.log(selectedTheme.palette);
    if(selectedTheme === darkTheme)
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
    // {
    //     path: '/about',
    //     element: <About/>
    // },
    {
        path: '/',
        element: <LandingPage handleTest={handleThemeChange}/>
    },
    // {
    //     path: 'load',
    //     element: <LoadingPage/>
    // },
    {
        path: '/test',
        element: <Test handleTest={handleThemeChange}/>
    }
];

    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}