import { createTheme } from '@mui/material/styles';

//wraps the app with custom mui theme
const theme = createTheme({

    components: {
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    "&.MuiMenuItem-root:hover": {
                        backgroundColor: '#ffffff',
                        color: '#1976d2',
                        borderRadius: 4
                    },
                    "&.Mui-selected": {
                        backgroundColor: '#ffffff',
                        color: '#1976d2',
                        borderRadius: 4
                    }
                }
            }
        }
    }
});

export default theme