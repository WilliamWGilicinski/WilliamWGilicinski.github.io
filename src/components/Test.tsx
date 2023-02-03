import { Button } from '@mui/material'
import React from 'react'
import handleTest from '../App'


export default function Test(props: { handleThemeChange: any }) {

    const {handleThemeChange} = props
    return (
        <Button onClick={handleTest}>Test</Button>
    )
}