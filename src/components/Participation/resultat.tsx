import React from 'react';
import { Modal, Box, Typography, Button, Fade, Backdrop, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { motion } from 'framer-motion';

interface Result {
  image?: string; 
  name: string;   
}

interface ResultPopupProps {
  open: boolean;      // open doit être un boolean
  handleClose: () => void; // handleClose est une fonction
  result: Result;     // result est un objet de type Result
}

const ResultPopup: React.FC<ResultPopupProps> = ({ open, handleClose, result }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      aria-labelledby="result-popup-title"
      aria-describedby="result-popup-description"
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 4,
            boxShadow: 24,
            textAlign: 'center',
            maxWidth: 400,
            width: '90%',
          }}
        >
          {result?.image ? (
            <Box>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <img
                  src={result.image}
                  alt={result.name}
                  style={{ maxWidth: '100%', marginBottom: '16px' }}
                />
              </motion.div>
              <Typography id="result-popup-title" variant="h5" sx={{ fontWeight: 'bold', color: '#DDA15E' }}>
                Félicitations ! Vous avez gagné :
              </Typography>
              <Typography id="result-popup-description" variant="h6" sx={{ mt: 2, color: '#555' }}>
                {result.name}
              </Typography>
              <IconButton
                color="success"
                sx={{ fontSize: 60, mt: 2 }}
              >
                <CheckCircleIcon fontSize="inherit" />
              </IconButton>
            </Box>
          ) : (
            <Box>
              <CancelIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
              <Typography id="result-popup-title" variant="h5" sx={{ fontWeight: 'bold', color: '#DDA15E' }}>
                {result?.name}
              </Typography>
            </Box>
          )}
          <Button
            variant="contained"
            onClick={handleClose}
            aria-label="Close result popup"
            sx={{
              mt: 3,
              backgroundColor: '#DDA15E',
              '&:hover': { backgroundColor: '#d49a5c' },
            }}
          >
            OK
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ResultPopup;
