import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaRegBell, FaUsers, FaGift } from 'react-icons/fa';
import axios from 'axios';
import * as XLSX from 'xlsx';

// Define types for new employee
interface Employee {
  name: string;
  email: string;
  role: string;
}

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [openPrizeModal, setOpenPrizeModal] = useState<boolean>(false);
  const [prizes, setPrizes] = useState<Array<{ name: string; image: File | null }>>([]);
  const [newPrize, setNewPrize] = useState<{ name: string; image: File | null }>({ name: '', image: null });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // States for adding a new employee
  const [newEmployee, setNewEmployee] = useState<Employee>({ name: '', email: '', role: 'employé' });
  const [employees, setEmployees] = useState<Employee[]>([]); // Stores the list of employees

  const handleViewStatistics = () => {
    navigate('/detailed-statistics');
  };

  const handleViewUsers = () => {
    navigate('/users');
  };

  const handleOpenPrizeModal = () => {
    setOpenPrizeModal(true);
  };

  // const handleClosePrizeModal = () => {
  //   setOpenPrizeModal(false);
  //   setNewPrize({ name: '', image: null });
  //   setEditIndex(null);
  // };

  const handleExportData = async () => {
    try {
      const response = await axios.get('http://localhost:4001/export-users', {
        responseType: 'blob', // Pour traiter le fichier en tant que blob (données binaires)
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'utilisateurs.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Erreur lors de l\'exportation des données :', error);
    }
  };

  const [openNotificationDialog, setOpenNotificationDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  // Function to handle the opening of the notification dialog
  const handleOpenNotificationDialog = () => {
    setOpenNotificationDialog(true);
  };

  // Function to handle the closing of the notification dialog
  const handleCloseNotificationDialog = () => {
    setOpenNotificationDialog(false);
    setMessage('');
  };

  // Function to handle the message submission
  const handleSendNotification = async () => {
    try { // TODO
      // // Send the message to the specified email (for testing purpose, we use axios to simulate sending)
      // await axios.post('http://localhost:4001/send-email', {
      //   to: 'med_abbad@outlook.fr',
      //   subject: 'Nouvelle Notification',
      //   message: message,
      // });
      // // Show success notification (Snackbar)
      // setOpenSnackbar(true);
      // handleCloseNotificationDialog();
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }
  };


  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        p: 4,
        bgcolor: '#f5f5f5',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            color: '#DDA15E',
            fontWeight: 'bold',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.05)' },
              '100%': { transform: 'scale(1)' },
            },
          }}
        >
          Tableau de Bord Administrateur
        </Typography>
      </motion.div>

      <Grid container spacing={4} justifyContent="center">
        {/* Section Statistiques */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#DDA15E' }}>
              Statistiques du Jeu-Concours
            </Typography>
            <Typography variant="body1" paragraph>
              Total des participants : 5000
            </Typography>
            <Typography variant="body1" paragraph>
              Nombre de tickets distribués : 15000
            </Typography>
            <Typography variant="body1" paragraph>
              Lots gagnés : 300
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: '#DDA15E', '&:hover': { backgroundColor: '#d49a5c' }, mt: 2 }}
              onClick={handleViewStatistics}
            >
              Voir plus de statistiques
            </Button>
          </Paper>
        </Grid>


        {/* Section Gestion des Utilisateurs */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#DDA15E' }}>
              Gestion des Utilisateurs <FaUsers />
            </Typography>
            <input
              type="text"
              placeholder="Rechercher un utilisateur"
              style={{ width: '100%', marginBottom: '16px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: '#DDA15E', '&:hover': { backgroundColor: '#d49a5c' }, mt: 2 }}
                >
                  Rechercher
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: '#DDA15E', '&:hover': { backgroundColor: '#d49a5c' }, mt: 2 }}
                  onClick={handleViewUsers}
                >
                  Voir tous les utilisateurs
                </Button>
              </Grid>
              <Grid item xs={12} textAlign="center">
                {/* Button to navigate to Add Employee Page */}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: '#DDA15E', '&:hover': { backgroundColor: '#d49a5c' }, mt: 2 }}
                  onClick={() => navigate('/add-employee')}
                >
                  Ajouter un nouvel employé
                </Button>
              </Grid>
            </Grid>

          </Paper>
        </Grid>

        {/* Section Gestion des Lots */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#DDA15E' }}>
              Gestion des Lots <FaGift />
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenPrizeModal}
              sx={{ backgroundColor: '#DDA15E', '&:hover': { backgroundColor: '#d49a5c' }, mt: 2 }}
            >
              Gérer les Lots
            </Button>
          </Paper>
        </Grid>

        {/* Section Notifications */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#DDA15E' }}>
              Notifications <FaRegBell />
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: '#DDA15E', '&:hover': { backgroundColor: '#d49a5c' }, mt: 2 }}
              onClick={handleOpenNotificationDialog}
            >
              Envoyer une notification
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleExportData}
              sx={{ backgroundColor: '#DDA15E', '&:hover': { backgroundColor: '#d49a5c' }, mt: 2 }}
            >
              Exporter les données
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Notification Dialog */}
      <Dialog open={openNotificationDialog} onClose={handleCloseNotificationDialog}>
        <DialogTitle>Envoyer une Notification</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Votre Message"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNotificationDialog} color="primary">
            Annuler
          </Button>
          <Button
            onClick={handleSendNotification}
            color="primary"
            disabled={!message.trim()}
          >
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar for showing success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Notification envoyée avec succès!"
        sx={{ bottom: 20 }}
      />

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#DDA15E' }}>
          Suivez-nous sur les réseaux sociaux !
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Gestion du concours et des utilisateurs facilement depuis cette page.
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminPage;
