import { createTheme } from '@mui/material';
import palette from './palette';
import components from './components';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    mixins: {
        navigationWidth: 240
    },
    components
  });

  /*
  Creates size dependent text
  */

  darkTheme.typography.h1 = {
    fontWeight: "100",
    fontFamily: "Roboto",
    color: "rgba(255, 255, 255, 0.7)",
    [darkTheme.breakpoints.up('xs')]: {
        fontSize: '3rem'
    },
    [darkTheme.breakpoints.up('sm')]: {
        fontSize: '4rem',
    },
    [darkTheme.breakpoints.up('md')]: {
      fontSize: '5rem',
    },
    [darkTheme.breakpoints.up('lg')]: {
        fontSize: '6rem',
    },
    [darkTheme.breakpoints.up('xl')]: {
        fontSize: '7rem',
    }
  };

  darkTheme.typography.body1 = {
    fontWeight: "100",
    fontFamily: "Roboto",
    color: "rgba(255, 255, 255, 0.7)",
    [darkTheme.breakpoints.up('xs')]: {
        fontSize: '1rem'
    },
    [darkTheme.breakpoints.up('sm')]: {
        fontSize: '2rem',
    },
    [darkTheme.breakpoints.up('md')]: {
      fontSize: '3rem',
    },
    [darkTheme.breakpoints.up('lg')]: {
        fontSize: '4rem',
    },
    [darkTheme.breakpoints.up('xl')]: {
        fontSize: '5rem',
    }
  };

  darkTheme.typography.h4 = {
    fontWeight: "100",
    fontFamily: "Roboto",
    color: "rgba(255, 255, 255, 0.7)",
    [darkTheme.breakpoints.up('xs')]: {
        fontSize: '2rem'
    },
    [darkTheme.breakpoints.up('sm')]: {
        fontSize: '3rem',
    },
    [darkTheme.breakpoints.up('md')]: {
      fontSize: '4rem',
    },
    [darkTheme.breakpoints.up('lg')]: {
        fontSize: '5rem',
    },
    [darkTheme.breakpoints.up('xl')]: {
        fontSize: '6rem',
    }
  };

  



  const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
    mixins: {
        navigationWidth: 240
    },
    components
  })
  
  export { darkTheme, lightTheme };