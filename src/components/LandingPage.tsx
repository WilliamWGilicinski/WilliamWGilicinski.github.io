import TopAppBar from "./TopAppBar";
import { Box, Typography } from "@mui/material"; 
import React from 'react';
import mePhoto from "./me.jpeg";

export default function LandingPage() {


    const schoolName = "The Ohio State University";

    return(
        <Box
        sx={{
            bgcolor: 'background.default',
            display: "flex",
            height: "100vh",
            flexDirection: "column"
        }}>
        <TopAppBar title="Home"/>
            <Box display="flex" width="100%" justifyContent="center">
                <Typography variant='h1' color='textPrimary' style={{whiteSpace: 'pre-line'}}>
                  Hello there! {'\n'}I'm William.
                </Typography>
            </Box>
            <Box marginTop="5%" display="flex" width="100%" justifyContent="center">
                <Typography variant='h4' color='textSecondary' style={{whiteSpace: 'pre-line'}} sx={{textAlign: "center"}}>
                A CS student at<Typography sx={[{'&:hover':{color: 'red'}}]}>{schoolName}</Typography>
                </Typography>
            </Box>
            <Box marginTop="5%" marginLeft="5%" display="inline-flex">
                <img style={{borderRadius: 1000}} className="photo" width="40%" src={mePhoto} alt="me"/>
                <Box display="flex" textAlign="center" margin={"5%"}>
                    <Typography sx={{justifyContent: "center"}}>Welcome to my website! I created this using create-react-app, JavaScript, Typescript, and hosted on github pages! </Typography>
                </Box>
            </Box>
            
        </Box>
    )
}