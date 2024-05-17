import { Box, Typography } from "@mui/material";
import TopAppBar from "./TopAppBar";
import BottomBar from "./BottomBar";
import { Component } from "react";

export default function Container(props: {handleThemeChange: any, title: any, page: any}) {

    const {handleThemeChange, title, page} = props;


    return (
        <Box
        sx={{
            bgcolor: 'background.default',
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            position: "relative",
        }}>
            <Box sx={{paddingBottom: "30px"}}>
            <TopAppBar title={title} handleThemeChange={handleThemeChange}/>
               <Box sx={{minHeight: '80vh'}}>
                {page}
                </Box> 
            <Box marginTop={"10px"}>
                <BottomBar/>
            </Box>
            </Box>
        </Box>
        
        
    )
}