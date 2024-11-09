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
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { FaRegBell, FaUsers, FaGift, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import DetailedStatisticsPage from './statistics-page';
import UserListPage from './users-page';
import AddEmployeePage from './addEmploye';
import axios from 'axios';

const AdminPage: React.FC = () => {
  const [view, setView] = useState<string>('home'); // Etat pour gérer la vue active
  const [message, setMessage] = useState<string>('');

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
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleOpenNotificationDialog = () => {
    setOpenNotificationDialog(true);
  };

  const handleCloseNotificationDialog = () => {
    setOpenNotificationDialog(false);
    setMessage('');
  };

  const handleSendNotification = async () => {
    try {
      // Envoi de la notification (à implémenter selon ton backend)
      setOpenSnackbar(true);
      handleCloseNotificationDialog();
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Sidebar */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#333',
            color: '#fff',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem button onClick={() => setView('statistiques')}>
            <ListItemIcon>
              <FaChartBar style={{ color: '#DDA15E' }} />
            </ListItemIcon>
            <ListItemText primary="Statistiques" />
          </ListItem>

          <ListItem button onClick={() => setView('gestionUtilisateurs')}>
            <ListItemIcon>
              <FaUsers style={{ color: '#DDA15E' }} />
            </ListItemIcon>
            <ListItemText primary="Gestion des Utilisateurs" />
          </ListItem>

          <ListItem button onClick={() => setView('ajouterEmploye')}>
            <ListItemIcon>
              <FaUsers style={{ color: '#DDA15E' }} />
            </ListItemIcon>
            <ListItemText primary="Ajouter un Employé" />
          </ListItem>

          <ListItem button onClick={handleOpenNotificationDialog}>
            <ListItemIcon>
              <FaRegBell style={{ color: '#DDA15E' }} />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>

          <ListItem button onClick={handleExportData}>
  <ListItemIcon>
    <FaSignOutAlt style={{ color: '#DDA15E' }} />
  </ListItemIcon>
  <ListItemText primary="Exporter les Données" />
</ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* Contenu en fonction de la vue active */}
        {view === 'home' && (
          <Typography variant="h4">Bienvenue dans l'Admin Page</Typography>
        )}

        {view === 'statistiques' && (
          <DetailedStatisticsPage /> 
        )}

        {view === 'gestionUtilisateurs' && (
          <UserListPage/>
        )}

        {view === 'ajouterEmploye' && (
          <AddEmployeePage/>
        )}

        {/* Dialog pour envoyer une notification */}
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
            <Button onClick={handleSendNotification} color="primary" disabled={!message.trim()}>
              Envoyer
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar pour success */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message="Notification envoyée avec succès!"
          sx={{ bottom: 20 }}
        />
      </Box>
    </Box>
  );
};

export default AdminPage;
