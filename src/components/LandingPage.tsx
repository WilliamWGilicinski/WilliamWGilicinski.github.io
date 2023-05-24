import TopAppBar from "./TopAppBar";
import BottomBar from "./BottomBar";
import { Box, Button, Typography } from "@mui/material"; 
import React from 'react';
import headshot from "./headshot.jpeg";
import { AlignVerticalCenter } from "@mui/icons-material";

export default function LandingPage(props: { handleThemeChange: any }) {

    const{handleThemeChange} = props

    const schoolName = "The Ohio State University";

    return(
        <Box
        sx={{
            bgcolor: 'background.default',
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column"
        }}>
            <TopAppBar title="Home" handleThemeChange={handleThemeChange}/>
            <Box height={"100%"} flex="1 0 auto" overflow={"scroll"}>
                <Box display="flex" width="100%" justifyContent="center">
                    <Typography variant='h1' color='textPrimary' style={{whiteSpace: 'pre-line'}}>
                      Hello there {'\n'}I'm William.
                    </Typography>
                </Box>
                <Box marginTop="5%" display="flex" width="100%" justifyContent="center">
                   <Typography variant='h4' color='textSecondary' style={{whiteSpace: 'pre-line'}} sx={{textAlign: "center"}}>
                   A CS student at<Typography variant="body1" sx={[{'&:hover':{color: 'red'}}]}>{schoolName}</Typography>
                   </Typography>
                </Box>
                <Box marginTop="10%" marginLeft="5%" display="flex" justifyContent="center">
                    <img style={{borderRadius: 1000}} width="35%" className="photo" src={headshot} alt="me"/>
                    <Box margin="auto" padding="0% 5%"display="flex" textAlign="center" justifyContent="center" height="fit-content">
                        <Typography height="fit-content" top="center" variant="body2">Welcome to my website! I created this using create-react-app, JavaScript, Typescript, and hosted on github pages! </Typography>
                    </Box>
                </Box>
            </Box>
            <Box marginTop={'50vh'} position={'relative'}>
                <BottomBar/>
            </Box>
        </Box>
    )
}