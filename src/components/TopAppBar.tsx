import { Box, Typography, AppBar, Drawer, Toolbar, IconButton, List, Button, ListItem, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useMemo } from 'react';
import { DarkMode, LightMode } from '@mui/icons-material';
import toggleTheme from '../App';
import handleThemeChange from '../App';
import { darkTheme } from '../theme';
import { HandleFunction } from 'connect';
import { useMediaQuery } from 'react-responsive';
import createPersistedState from 'use-persisted-state';
const useColorSchemeState = createPersistedState("colorScheme");

type AppBarProps = {
    title: string;
    showMenu?: boolean;
    handleThemeChange: any;
}


export default function TopAppBar({ title, showMenu, handleThemeChange }: AppBarProps) {

    let[open, setOpen] = React.useState(false);
    const { isDark, setIsDark } = useColorScheme();

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

    function handleMode(){
        if(isDark){
            setIsDark(false);
        } else{
            setIsDark(true);
        }
    }

    //From https://blog.logrocket.com/dark-mode-react-in-depth-guide/#implementing-color-scheme-toggle
    function useColorScheme() {
        const systemPrefersDark = useMediaQuery(
          {
            query: "(prefers-color-scheme: dark)",
          },
          undefined
        );
    
        const [isDark, setIsDark] = useColorSchemeState();
        const value = useMemo(
          () => (isDark === undefined ? !!systemPrefersDark : isDark),
          [isDark, systemPrefersDark]
        );
    
        useEffect(() => {
          handleThemeChange(!value);
        }, [value]);
    
        return {
          isDark: value,
          setIsDark,
        };
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

    const pages = ['About', 'Resume', 'Animation', 'WebGL', 'Test'];

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
                        <ColorMode isLight={!isDark}/>
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