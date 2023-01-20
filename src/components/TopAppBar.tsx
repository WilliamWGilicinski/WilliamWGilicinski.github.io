import { Box, Typography, AppBar, Drawer, Toolbar, IconButton, List, Button, ListItem, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect } from 'react';
import { DarkMode, LightMode } from '@mui/icons-material';
import toggleTheme from '../App';

type AppBarProps = {
    title: string;
    showMenu?: boolean;
}

export default function TopAppBar({ title, showMenu }: AppBarProps) {

    let[open, setOpen] = React.useState(false);
    let[light, setLight] = React.useState(false);

    const handleDrawer = () => {
        if(open)
        {
            setOpen(false);
        } 
        else
        {
            setOpen(true);
        }
    };

    function HamburgerMenu(props: { isOpen: boolean; }) {
        const isOpen = props.isOpen;
        if (isOpen) 
        {
            return <ClearIcon/>
        }
        else
        {
            return <MenuIcon/>
        }
    }

    const getLink = (option: String) => {
        let link = './' + option.toLowerCase();

        return link;
    }


    function handleMode()
    {
        if(light)
        {
            setLight(false);
        }
        else
        {
            setLight(true);
        }
    }

    function ColorMode(props: {isLight: Boolean;}){
        const isLight = props.isLight;
        if(isLight)
        {
            return <LightMode/>
        }
        else
        {
            return <DarkMode/>
        }
    }

    const pages = ['About', 'Something Else'];

    return (
        <Box sx={{ marginBottom: '80px'}}>
            <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    {showMenu !== false && (
                        <IconButton onClick={handleDrawer}>
                            <HamburgerMenu isOpen={open}/>
                        </IconButton>
                    )}
                    <Button sx={{color: "white"}} component='a' href='./' variant='text'>{title}</Button>
                    <IconButton onClick={handleMode}>
                        <ColorMode isLight={light}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer 
            sx={{
                width: `100%`,
                    '& .MuiDrawer-paper': {
                        width: `100%`,
                        boxSizing: 'border-box',
                    },
            }}
            open={open}
            variant="persistent"
            anchor="left"
            >
                <Box display="flex" width="100%" height="100%" position="fixed" top="40%" justifyContent="center">
                    <List>
                        {pages.map((text, index) => (
                            <ListItem key={text} >
                                <ListItemButton sx={{justifyContent: "center"}}component='a' href={getLink(text)}>
                                    <Typography display="flex" justifyContent="center" color="textPrimary">{text}</Typography>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    )


}