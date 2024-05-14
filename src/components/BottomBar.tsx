import { Paper, Typography } from '@mui/material'
import React from 'react'

export default function BottomBar() {

    return (
            <Paper sx={{textAlign: "center", width: "100%", bottom: 0, position: "absolute"}} elevation={5}>
                <Typography padding="2.5vh">Revised May 2024, Still WIP</Typography>
            </Paper>
        
        
    )
}