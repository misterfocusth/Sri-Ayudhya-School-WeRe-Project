import { createTheme } from '@material-ui/core/styles';

export const customizedTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#00a152',
            contrastText: '#ffffff',
            light: '#00e676',
            dark: '#33eb91',
        },
        secondary: {
            main: '#ff1744',
            light: '#ff4569',
            dark: '#b2102f',
            contrastText: '#ffffff',
        }
    },
    typography: {
        fontFamily: [
            'Prompt',
            'sans-serif',
        ].join(','),
    }
});