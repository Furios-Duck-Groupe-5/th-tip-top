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
import GrandTiragePage from './grand-tirage';
import { useAuth } from '../ConnexionInscription/AuthContext';

const AdminPage: React.FC = () => {
  const [view, setView] = useState<string>('home'); // Etat pour gérer la vue active
  const [subject, setSubject] = useState<string>(''); // Sujet de la notification
  const [message, setMessage] = useState<string>(''); // Message de la notification
  const [openNotificationDialog, setOpenNotificationDialog] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleExportData = async () => {
    try {
      const response = await axios.get('https://backend.dsp5-archi-o23-15m-g5.fr/export-users', {
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

  const handleOpenNotificationDialog = () => {
    setOpenNotificationDialog(true);
  };

  const handleCloseNotificationDialog = () => {
    setOpenNotificationDialog(false);
    setSubject('');
    setMessage('');
  };

  const handleSendNotification = async () => {
    try {
      // Envoi de la notification avec le sujet et le message
      const notificationData = {
        subject,
        message,
      };
      // Remplacer l'URL par celle de votre backend
      await axios.post("https://backend.dsp5-archi-o23-15m-g5.fr/send-newsletter", notificationData);

      setOpenSnackbar(true);
      handleCloseNotificationDialog();
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }
  };

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      return;
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
          <ListItem onClick={() => setView('statistiques')} component="button">
            <ListItemIcon>
              <FaChartBar style={{ color: '#DDA15E' }} />
            </ListItemIcon>
            <ListItemText primary="Statistiques" />
          </ListItem>

          <ListItem onClick={() => setView('gestionUtilisateurs')} component="button">
            <ListItemIcon>
              <FaUsers style={{ color: '#DDA15E' }} />
            </ListItemIcon>
            <ListItemText primary="Gestion des Utilisateurs" />
          </ListItem>

          <ListItem onClick={() => setView('ajouterEmploye')} component="button">
            <ListItemIcon>
              <FaUsers style={{ color: '#DDA15E' }} />
            </ListItemIcon>
            <ListItemText primary="Ajouter un Employé" />
          </ListItem>

          <ListItem onClick={handleOpenNotificationDialog} component="button">
            <ListItemIcon>
              <FaRegBell style={{ color: '#DDA15E' }} />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>

          <ListItem onClick={handleExportData} component="button">
            <ListItemIcon>
              <FaSignOutAlt style={{ color: '#DDA15E' }} />
            </ListItemIcon>
            <ListItemText primary="Exporter les Données" />
          </ListItem>

          <ListItem onClick={() => setView('grand-tirage')} component="button">
            <ListItemIcon>
              <FaGift style={{ color: '#DDA15E' }} />
            </ListItemIcon>
            <ListItemText primary="Grand Tirage" />
          </ListItem>
        </List>

        {/* Bouton de déconnexion */}
        <Box sx={{ position: 'absolute', bottom: 16, left: 0, width: '100%', padding: '0 16px' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#DDA15E',  // Couleur personnalisée
              '&:hover': {
                backgroundColor: '#C88B4D', // Couleur personnalisée au survol
              },
            }}
            fullWidth
            startIcon={<FaSignOutAlt />}
            onClick={handleLogout}
          >
            Déconnexion
          </Button>
        </Box>
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
          <UserListPage />
        )}

        {view === 'ajouterEmploye' && (
          <AddEmployeePage />
        )}

        {view === 'grand-tirage' && (
          <GrandTiragePage />
        )}

        {/* Dialog pour envoyer une notification */}
        <Dialog open={openNotificationDialog} onClose={handleCloseNotificationDialog}>
          <DialogTitle>Envoyer une Notification</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="subject"
              label="Sujet"
              type="text"
              fullWidth
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
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
            <Button onClick={handleSendNotification} color="primary" disabled={!subject.trim() || !message.trim()}>
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
