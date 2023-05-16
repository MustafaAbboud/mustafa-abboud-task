import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {

    return (
        <Box sx={{ position: 'absolute', top: 75, width: 'calc(100vw - 40px)', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
            <CircularProgress />
        </Box>
    );
}

export default Loader;