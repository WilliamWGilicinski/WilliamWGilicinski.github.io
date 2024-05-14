import { Button } from '@mui/material'
import React from 'react'
import handleTest from '../App'
import Container from './Container'


export default function Test(props: { handleThemeChange: any }) {

    const {handleThemeChange} = props

    const testPage = <h1>Hello</h1>

    return (
        <Container handleThemeChange={handleThemeChange} title="test" page={testPage}/>
    )
}