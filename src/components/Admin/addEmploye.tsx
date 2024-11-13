import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, MenuItem, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Define the Employee interface for form state
interface Employee {
  name: string;
  firstName: string;
  role: string;
  email: string;
  gender: string; // 'H' or 'F'
  birthDate: string;
}

const AddEmployeePage: React.FC = () => {
  const navigate = useNavigate();
  const [newEmployee, setNewEmployee] = useState<Employee>({
    name: '',
    firstName: '',
    role: 'Employé', // Pre-set and unmodifiable
    email: '',
    gender: '', // Will be 'H' or 'F'
    birthDate: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!newEmployee.name || !newEmployee.firstName || !newEmployee.email || !newEmployee.gender || !newEmployee.birthDate) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    try {
      // Send a POST request to the backend API to add the employee
      const response = await fetch("https://backend.dsp5-archi-o23-15m-g5.fr/add-employee", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: newEmployee.name,
          prenom: newEmployee.firstName,
          email: newEmployee.email,
          sexe: newEmployee.gender, // Will be 'H' or 'F'
          date_de_naissance: newEmployee.birthDate,
          mot_de_passe: 'default_password', // Assign a default or temporary password
        }),
      });

      if (response.ok) {
        // Display success message and reset the form
        setSnackbarOpen(true);
        setNewEmployee({ name: '', firstName: '', role: 'Employé', email: '', gender: '', birthDate: '' });
      } else {
        const data = await response.json();
        alert(data.message || 'Une erreur est survenue lors de l\'ajout de l\'employé.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      alert('Une erreur est survenue lors de la connexion au serveur.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', p: 4, bgcolor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 600, p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#DDA15E', fontWeight: 'bold' }}>
          Ajouter un Nouvel Employé
        </Typography>

        <Grid container spacing={2}>
          {/* Nom */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nom"
              name="name"
              value={newEmployee.name}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Prénom */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Prénom"
              name="firstName"
              value={newEmployee.firstName}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Role (Disabled and Pre-filled) */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Rôle"
              name="role"
              value={newEmployee.role}
              disabled
              InputProps={{ readOnly: true }}
              required
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={newEmployee.email}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Sexe */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Sexe"
              name="gender"
              value={newEmployee.gender}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="H">Homme</MenuItem>
              <MenuItem value="F">Femme</MenuItem>
            </TextField>
          </Grid>

          {/* Date de Naissance */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date de Naissance"
              name="birthDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={newEmployee.birthDate}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mot de passe"
              name="role"
              value={"default_password"}
              disabled
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: '#DDA15E', '&:hover': { backgroundColor: '#d49a5c' }, mt: 2 }}
              onClick={handleSubmit}
            >
              Ajouter l'employé
            </Button>
          </Grid>
        </Grid>

        {/* Snackbar for success feedback */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message="Nouvel employé ajouté avec succès"
        />
      </Box>
    </Box>
  );
};

export default AddEmployeePage;
