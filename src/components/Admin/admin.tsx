import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaRegBell, FaUsers, FaGift } from 'react-icons/fa';

const AdminPage = () => {
  const navigate = useNavigate();
  const [openPrizeModal, setOpenPrizeModal] = useState(false);
  const [prizes, setPrizes] = useState([]);
  const [newPrize, setNewPrize] = useState({ name: '', image: null });
  const [editIndex, setEditIndex] = useState(null);

  // States for adding a new employee
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', role: 'employé' });
  const [employees, setEmployees] = useState([]); // Stores the list of employees

  const handleViewStatistics = () => {
    navigate('/detailed-statistics');
  };

  const handleViewUsers = () => {
    navigate('/users');
  };

  const handleOpenPrizeModal = () => {
    setOpenPrizeModal(true);
  };

  const handleClosePrizeModal = () => {
    setOpenPrizeModal(false);
    setNewPrize({ name: '', image: null });
    setEditIndex(null);
  };

  // Handle adding new employee
  const handleAddEmployee = () => {
    setEmployees([...employees, newEmployee]);
    setNewEmployee({ name: '', email: '', role: 'employé' });
    alert('Nouvel employé ajouté avec succès');
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
            </Grid>

            {/* Form to add new employee */}
            <Typography variant="h6" gutterBottom sx={{ color: '#DDA15E', marginTop: '20px' }}>
              Ajouter un nouvel employé
            </Typography>
            <TextField
              fullWidth
              label="Nom de l'employé"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email de l'employé"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Rôle"
              value={newEmployee.role}
              onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: '#DDA15E', '&:hover': { backgroundColor: '#d49a5c' }, mt: 2 }}
              onClick={handleAddEmployee}
            >
              Ajouter un employé
            </Button>
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
            <Button variant="contained" color="primary" sx={{ backgroundColor: '#DDA15E', '&:hover': { backgroundColor: '#d49a5c' }, mt: 2 }}>
              Envoyer une notification
            </Button>
          </Paper>
        </Grid>
      </Grid>

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
