import { Box } from "@mui/material";
import BottomBar from "./BottomBar";
import TopAppBar from "./TopAppBar";
import CharacterSheet from '../../public/characters.png';
import styled, { keyframes } from 'styled-components';
import King from './King';
import { Translate } from "@mui/icons-material";
import { color, motion } from 'framer-motion';
import { bgcolor } from "@mui/system";
import React from "react";

export default function Animation(props: {handleThemeChange: any}) {

    const {handleThemeChange} = props;
    const [rotate, setRotate] = React.useState(false);

    return(

        <Box
        sx={{
            
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            class: "parent"
        }}>
            <TopAppBar title="about" handleThemeChange={handleThemeChange}/>


            
                <King as={motion.div}
                     
                     animate={{rotate: rotate ? 90 : 0}}
                     onClick={() => {
                         setRotate(!rotate);
                     }}
                    drag/>
             
            

            <motion.div 
                    animate={{
                        rotate: rotate ? 90 : 0,
                        
                            }}
                    onClick={() => {
                        setRotate(!rotate);
                    }}
                    drag
                    style={{background: "red", height: "100px", width: "100px"}}>
            </motion.div>

            <Box marginTop={'93vh'} position={'relative'}>
                <BottomBar/>
            </Box>
        </Box>


    )

    function gravity (transform: any)
        {
            console.log(transform);
        }

    

}