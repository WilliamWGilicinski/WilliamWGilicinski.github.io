import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import BottomBar from './BottomBar';
import TopAppBar from './TopAppBar'

export default function About(props: {handleThemeChange: any}) {

    const {handleThemeChange} = props;

    return (
        <Box
        sx={{
            bgcolor: 'background.default',
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            position: "relative",
        }}>
            <Box sx={{paddingBottom: "30px"}}>
            <TopAppBar title="about" handleThemeChange={handleThemeChange}/>
            <Box>
                <Typography color='textPrimary' variant="h1" textAlign="center">About This Page</Typography>
                <Typography color="textSecondary" margin="5%" variant="body1">I created this website using create-react-app, 
                Typescript, Java Script, and gh-pages for Github pages to host. It is a project
                I started in December of 2022, dropped, then picked back up again in Janurary 2023</Typography>
            </Box>
            </Box>
            <Box>
                <BottomBar/>
            </Box>
        </Box>
        
        
    )
}