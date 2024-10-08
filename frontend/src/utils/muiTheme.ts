import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createTheme } from '@mui/material/styles';

export const themeSchema: any = {
    palette: {
        primary: {
            light: '#85B7FE',
            main: '#0F6BAC',
            dark: '#2A3950',
            contrastText: '#e9edef',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        textTransform: 'none',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '50px',
                    padding: "6px 28px",
                },
            }
        },
    }
}

export const theme = createTheme(themeSchema);