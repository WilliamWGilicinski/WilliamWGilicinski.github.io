import styled from '@emotion/styled/types/base';
import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import React from 'react'
import TopAppBar from './TopAppBar'

export default function Resume(props: {handleThemeChange: any}) {

    const {handleThemeChange} = props;


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
                <Typography variant='h1' color='textPrimary'>William Gilicinski</Typography>
                <Box width='70%' color="textPrimary"/>
                <Typography variant='h4' color='textPrimary'>Objective</Typography>
                <Typography variant="body1" color='textSecondary'>Software engineer internship opportunity for May - August 2023, utilizing technical skills such as programming, version control, and working with other team members.</Typography>
                </Paper>
            </Box>

        </Box>
        
        
    )
}