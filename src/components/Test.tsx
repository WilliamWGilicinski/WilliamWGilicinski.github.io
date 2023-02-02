import { Button } from '@mui/material'
import React from 'react'
import handleTest from '../App'


export default function Test(props: { handleTest: any }) {

    const {handleTest} = props
    return (
        <Button onClick={handleTest}>Test</Button>
    )
}