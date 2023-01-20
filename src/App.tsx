import { Box, ThemeProvider, Typography } from '@mui/material';
import React, { Suspense, useEffect, useState } from 'react';
import { darkTheme, lightTheme }  from './theme';
import LoadingPage from './components/LoadingPage';
import appRoutes from './appRoutes';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Theme } from '@mui/system/createTheme';
import { DarkMode } from '@mui/icons-material';
import useToggle from './useChangeTheme';
import { storage } from './storage';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10_000
        }
    }
})



export default function App() {
    
    const [selectedTheme, setSelectedTheme] = useState(darkTheme)

    const HandleThemeChange = (theme: any) => {
        setSelectedTheme(theme);
    }

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