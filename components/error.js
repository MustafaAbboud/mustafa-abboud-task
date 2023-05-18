import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function ErrorBox(props) {

    return (
        <Box sx={{ position: 'absolute', top: 72, width: 'calc(100vw - 25px)', height: 'calc(100vh - 72px)', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'hsla(0, 0%, 100%, 0.4)' }}>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>

                <Box sx={{ maxWidth: '600px', border: 1, borderRadius: '16px', borderColor: '#d11111', boxShadow: 3, padding: '40px', backgroundColor: 'hsl(0, 0%, 100%)' }}>
                    <Box sx={{ height: 10, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <IconButton sx={{ marginRight: -4 }} onClick={() => props.setErrorMsg('')}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Typography style={{ color: '#d11111', marginTop: 20 }}>
                        {props.errorMsg}
                    </Typography>
                </Box>

            </Box>

        </Box>
    )
}

export default ErrorBox