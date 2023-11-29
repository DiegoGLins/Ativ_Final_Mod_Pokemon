import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#e3350d',
        },
        secondary: {
            main: '#feca1b',
            light: '#F5EBFF',
            contrastText: '#47008F',
        },
    },
});


export default defaultTheme