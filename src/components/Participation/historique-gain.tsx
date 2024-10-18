import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Icône pour fermer la boîte de dialogue
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Icône de succès
import { motion } from 'framer-motion'; // Pour les animations

const HistoryPopup = ({ open, onClose, gains }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ color: '#DDA15E' }}>Historique des Gains</Typography>
        <IconButton onClick={onClose} color="inherit">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography variant="body1" gutterBottom sx={{ color: '#555' }}>
          Voici vos gains :
        </Typography>
        <List>
          {gains.length > 0 ? (
            gains.map((gain, index) => (
              <ListItem key={index} component={motion.div} whileHover={{ scale: 1.03 }}>
                <CheckCircleIcon sx={{ color: '#4caf50', marginRight: 1 }} />
                <ListItemText
                  primary={`${gain.name}`}
                  secondary={`Gagné le ${gain.date}`}
                  primaryTypographyProps={{ fontWeight: 'bold', color: '#333' }}
                  secondaryTypographyProps={{ color: '#777' }}
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ width: '100%' }}>
              Aucune victoire à afficher.
            </Typography>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" sx={{ backgroundColor: '#DDA15E', '&:hover': { backgroundColor: '#d49a5c' } }}>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HistoryPopup;
