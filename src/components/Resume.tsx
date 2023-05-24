import styled from '@emotion/styled/types/base';
import { Box, CircularProgress, List, ListItem, ListItemIcon, Paper, Typography } from '@mui/material'
import { CircleOutlined as Point } from '@mui/icons-material';
import React from 'react'
import TopAppBar from './TopAppBar'
import BottomBar from './BottomBar';


export default function Resume(props: {handleThemeChange: any}) {

    const {handleThemeChange} = props;


    function BulletPoint(props: {text: string})
    {
        return(
        <ListItem>
            <ListItemIcon>
                <Point fontSize="small"/>
            </ListItemIcon>
            <Typography variant='body2' color='textSecondary'>{props.text}</Typography>
        </ListItem>
        )
    }

    return (
        <Box
        sx={{
            bgcolor: 'background.default',
            display: "flex",
            height: "100vh",
            flexDirection: "column"
        }}>
            <TopAppBar title="resume" handleThemeChange={handleThemeChange}/>
            <Typography color="textPrimary" variant="h1" textAlign="center">My Resume / CV</Typography>
            <Box sx={{margin: '5%', boxShadow: 16, borderRadius: '5%'}}>
                <Paper elevation={2}>
                <Typography variant='h2' color='textPrimary'>William Gilicinski</Typography>
                <hr/>
                <Box width='70%' color="textPrimary"/>
                <Typography variant='h3' color='textPrimary'>Objective</Typography>
                <Typography variant="body2" color='textSecondary'>Software engineer internship opportunity for May 
                - August 2023, utilizing technical skills such as programming, version control, and working with 
                other team members.</Typography>
                <hr/>
                <Typography variant='h3' color='textPrimary'>Education</Typography>
                <Typography variant='h4' color='textPrimary'>The Ohio State University</Typography>
                <List>
                    <BulletPoint text='Fall 2020 to present'/>
                    <BulletPoint text='B.S. in Computer Science and Engineering, Expected graduation May 2024'/>
                    <BulletPoint text='Recipient of Trustees Scholarship, Dean’s List; 3.56 cumulative GPA'/>
                </List>
                <hr/>
                <Typography variant='h3'></Typography>
                </Paper>
            </Box>
        <BottomBar/>
        </Box>
        
        
    )
}