import React, { FC, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';

// Type pour les gains
interface Gain {
  id: number;
  name: string;
  status: 'non réclamé' | 'réclamé' | 'réclamé en boutique';
  imageUrl: string;
}

// Données initiales des gains
const initialGains: Gain[] = [
  { id: 1, name: 'Infuseur à thé', status: 'non réclamé', imageUrl: 'src/assets/teaBg.jpg' },
  { id: 2, name: 'Thé détox', status: 'réclamé en boutique', imageUrl: 'src/assets/pexels-tim-durand-361277653-14387126.jpg' },
  { id: 3, name: 'Coffret découverte', status: 'non réclamé', imageUrl: 'src/assets/pexels-rachel-claire-5864768.jpg' },
];

// Composant fonctionnel pour la gestion des gains
const GainsManagementPage: FC = () => {
  const [gains, setGains] = useState<Gain[]>(initialGains);
  const [openClaimDialog, setOpenClaimDialog] = useState<boolean>(false);
  const [selectedGain, setSelectedGain] = useState<Gain | null>(null);
  const [claimMethod, setClaimMethod] = useState<string>('en boutique');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('tous');

  // Ouvrir le dialogue pour réclamer un gain
  const handleOpenClaimDialog = (gain: Gain) => {
    setSelectedGain(gain);
    setOpenClaimDialog(true);
  };

  // Fermer le dialogue de réclamation
  const handleCloseClaimDialog = () => {
    setOpenClaimDialog(false);
    setSelectedGain(null);
  };

  // Gérer la réclamation d'un gain
  const handleClaim = () => {
    if (!selectedGain) return;

    setGains((prevGains) =>
      prevGains.map((gain) =>
        gain.id === selectedGain.id ? { ...gain, status: 'réclamé' } : gain
      )
    );
    setSnackbarOpen(true);
    handleCloseClaimDialog();
  };

  // Fermer la snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Gérer le changement de filtre
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value as string);
  };

  // Filtrer les gains selon le statut
  const filteredGains = gains.filter((gain) => {
    if (filter === 'tous') return true;
    return gain.status === filter;
  });

  return (
    <Box sx={{ p: 4, backgroundColor: '#f7f9fc', minHeight: '100vh' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#DDA15E', fontWeight: 'bold' }}>
        Gestion des Gains
      </Typography>

      <Select
        value={filter}
        onChange={handleFilterChange}
        sx={{ mb: 3, width: '200px' }}
        variant="outlined"
        displayEmpty
      >
        <MenuItem value="tous">Tous les gains</MenuItem>
        <MenuItem value="non réclamé">Non réclamés</MenuItem>
        <MenuItem value="réclamé">Réclamés</MenuItem>
      </Select>

      <Grid container spacing={4}>
        {filteredGains.map((gain) => (
          <Grid item xs={12} sm={6} md={4} key={gain.id}>
            <Card
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              elevation={3}
              sx={{
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={gain.imageUrl}
                alt={gain.name}
                sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {gain.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Statut: {gain.status}
                </Typography>
                {gain.status === 'non réclamé' && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => handleOpenClaimDialog(gain)}
                  >
                    Réclamer
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog pour réclamer le gain */}
      <Dialog open={openClaimDialog} onClose={handleCloseClaimDialog}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Réclamation de Lot</Typography>
          <IconButton onClick={handleCloseClaimDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Vous réclamez le lot : <strong>{selectedGain?.name}</strong>
          </Typography>
          <TextField
            select
            label="Méthode de Réclamation"
            value={claimMethod}
            onChange={(e) => setClaimMethod(e.target.value)}
            fullWidth
            SelectProps={{
              native: true,
            }}
            sx={{ mb: 2 }}
          >
            <option value="en boutique">En Boutique</option>
            <option value="en ligne">En Ligne</option>
          </TextField>
          <Typography variant="body2" color="text.secondary">
            Veuillez choisir la méthode pour réclamer votre lot.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClaimDialog}>Annuler</Button>
          <Button onClick={handleClaim} color="primary">Réclamer</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar pour confirmation */}
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message="Votre lot a été réclamé avec succès !"
        autoHideDuration={3000}
      />
    </Box>
  );
};

export default GainsManagementPage;
