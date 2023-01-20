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