import TopAppBar from "./TopAppBar";
import { Box, List, ListItem, Typography } from "@mui/material"; 
import { ContentStyle } from '../style/ContentStyle';
import React from 'react';
import { letterSpacing } from "@mui/system";

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
                A CS student at <Typography sx={[{'&:hover':{color: 'red'}}]}>{schoolName}</Typography>
                </Typography>
            </Box>
            <Box>
                <img className="photo" width="40%" height="40%"src="https://cdn.discordapp.com/attachments/697235018703044669/941171568585887804/IMG_3277.jpg"/>
            </Box>
            
        </Box>
    )
}