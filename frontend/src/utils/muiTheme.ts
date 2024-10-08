import '@fontsource/plus-jakarta-sans/300.css';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/700.css';

import { createTheme } from '@mui/material/styles';

export const themeSchema: any = {
    palette: {
        primary: {
            light: '#85B7FE',
            main: '#0F6BAC',
            dark: '#2A3950',
            contrastText: '#e9edef',
        },
        secondary: {
            main: '#',
            contrastText: '#',
        },
    },
    typography: {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        textTransform: 'none',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '50px',
                    padding: "10px 20px",
                },
            }
        },
    }
}

export const theme = createTheme(themeSchema);