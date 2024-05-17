import styled from '@emotion/styled/types/base';
import { Box, Button, CircularProgress, List, ListItem, ListItemIcon, Paper, Typography } from '@mui/material'
import { CircleOutlined as Point, LineAxis } from '@mui/icons-material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import React from 'react'
import TopAppBar from './TopAppBar'
import BottomBar from './BottomBar';
import { Link } from 'react-router-dom';


export default function Resume(props: {handleThemeChange: any}) {

    const {handleThemeChange} = props;

    // Function will execute on click of button
    const onButtonClick = () => {
     
        // using Java Script method to get PDF file
        fetch("William Gilicinski Resume May 2024.pdf").then((response) => {
            response.blob().then((blob) => {
             
                // Creating new object of PDF file
                const fileURL =
                    window.URL.createObjectURL(blob);
                     
                // Setting various property values
                let alink = document.createElement("a");
                alink.href = fileURL;
                alink.download = "SamplePDF.pdf";
                alink.click();
            });
        });
    };


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

    interface linkProps {
        text?: string;
        linkName?: string;
        href?: string;
    }

    const defaultProps = {

    };
    function SubPoint(propsIn: linkProps) {

        const props = {...defaultProps, ...propsIn};

        return(
            <ListItem sx={{paddingLeft: "5%"}}>
            <ListItemIcon>
                <ChevronRightOutlinedIcon fontSize="small"/>
            </ListItemIcon>
            <Typography variant='body2' color='textSecondary'>{props.text}{<a href={props.href}>{props.linkName}</a>}</Typography>
        </ListItem>
        )
    }

    return (
        <Box
        sx={{
            bgcolor: 'background.default',
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column"
        }}>
            <TopAppBar title="resume" handleThemeChange={handleThemeChange}/>
            <Button onClick={onButtonClick}>
                <Typography color="textPrimary" variant="h1" textAlign="center">My Resume / CV</Typography>
            </Button>
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
                <Typography variant='h3' color='textPrimary'>Work Experience</Typography>
                    <List>
                        <BulletPoint text='Flairsoft, Columbus Ohio'/>
                        <SubPoint text='Software Intern, Summer 2023 - Full time'/>
                        <SubPoint text='Used ASP.NET to create a web interface that took users’ address data and daisy chained called multiple address validation APIs for a right of way software solution'/>
                        <SubPoint text='Worked with another intern and a supervisor using Azure DevOps and Microsoft Teams'/>
                        <BulletPoint text='Rx|Minder, Dublin Ohio'/>
                        <SubPoint text='Software Intern, Summer 2022 - Full time'/>
                        <SubPoint text='Used React JS and TS for the front end, MariaDB, MYSQL, and Node JS for the back end to help create a reminder service designed to alleviate the medical adherence problem. '/>
                        <SubPoint text='Worked with a small team of senior devs using version control with Git and hosted on Bitbucket'/>
                        <BulletPoint text='Donatos Pizza, Powell Ohio'/>
                        <SubPoint text='Opening Associate, Summer 2021 - Full time'/>
                        <SubPoint text='Partook in daily operations of creating pizzas, cleaning, order taking, and various other tasks '/>
                        <BulletPoint text='Giant Eagle, Dublin Ohio'/>
                        <SubPoint text='Personal Shopper, Summer 2020 - Full Time'/>
                        <SubPoint text='Acquired groceries customers submitted to their online shopping list and loaded into their car'/>
                    </List>
                <hr/>
                <Typography variant='h3' color='textPrimary'>Education</Typography>
                <Typography variant='h4' color='red' fontStyle={"italic"}>The Ohio State University</Typography>
                <List>
                    <BulletPoint text='Fall 2020 to present'/>
                    <BulletPoint text='B.S. in Computer Science and Engineering, Expected graduation December 2024'/>
                    <BulletPoint text='Recipient of Trustees Scholarship, Dean’s List; 3.57 cumulative GPA'/>
                </List>
                <hr/>
                <Typography variant='h3' color='textPrimary'>Qualifications</Typography>
                <List>
                    <BulletPoint text='Experienced in Java, React (Java Script & Typescript), C, C#, SQL, and MATLAB'/>
                    <BulletPoint text='Experienced with agile workflow and version control via Git'/>
                    <BulletPoint text='Coursework: Development of software in C and Assembly through a Linux environment, Working in Agile Teams using Github, analyzing run time, data structures, Interfaces and Abstract Classes, Programming Languages, etc'/>
                    <BulletPoint text='Software: VS and VS Code, Unity, Bitbucket, Eclipse, and MATLAB'/>
                </List>
                <hr/>
                <Typography variant='h3' color='textPrimary'>Academic Software Projects</Typography>
                <List>
                    <BulletPoint text='Video Game'/>
                    <SubPoint text='Recreated Dungeon Level: 1 from The Legend Of Zelda with a team of six using C# and Monogame'/>
                    <BulletPoint text='Unity Scene'/>
                    <Typography>
                        <SubPoint text='Created a scene in Unity with my own cloth simulation, ocean shaders, and more.' href='https://youtu.be/lPqJbeKAtlY' linkName='Youtube Demo Link'/>
                    </Typography>
                    <BulletPoint text='Course Grade Program'/>
                    <SubPoint text='Created software in C that reads a file of student names and grades and offers the user 10 different options to alter, change, and view grades'/>
                    <BulletPoint text='Glossary website'/>
                    <SubPoint text='Created an automated glossary where keywords linked to different pages'/>
                </List>
                <hr/>
                <Typography variant='h3' color='textPrimary'>Activities and Interests</Typography>
                    <List>
                        <BulletPoint text='C-row Flugelhorn member in The Ohio State Marching Band (TBDBITL), 2022-2023'/>
                        <BulletPoint text='3rd Trumpet in OSU Jazz Lab Big Band (2021-2022) and Workshop Big Band (Spring 2023)'/>
                        <BulletPoint text='Active Member of OSU Longboard Club'/>
                        <BulletPoint text='Eagle Scout: Troop 117, March 2020'/>
                    </List>
                <hr/>
                </Paper>
            </Box>
            <Box marginTop={'50vh'} position={'relative'}><BottomBar/></Box>
        </Box>
        
        
    )
}