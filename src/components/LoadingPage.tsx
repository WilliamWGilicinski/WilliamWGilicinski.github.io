import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

export default function LoadingPage() {
    return (
        <><Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', minHeight: '80vh' }}>
            <CircularProgress size={200} />
        </Box></>
    )
}
