import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import TopAppBar from './TopAppBar'

export default function About() {
    return (
        <Box
        sx={{
            bgcolor: 'background.default',
            display: "flex",
            height: "100vh",
            flexDirection: "column"
        }}>
            <TopAppBar title='About'/>
            <Typography variant="h2">Actually care infested hell-hole</Typography>
        </Box>
        
        
    )
}