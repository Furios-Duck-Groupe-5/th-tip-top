import { FC, useState } from "react";
import { TextField, Button, Typography, Container, Box, Alert, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import logo from "../../assets/thebgbg.png";
import React from "react";

const ProfilePage: FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [gender, setGender] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Fonction pour envoyer les données mises à jour
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!firstName || !lastName || !dateOfBirth || gender === null || !email || !password) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    const updatedUserData = {
      nom: lastName,
      prenom: firstName,
      date_de_naissance: dateOfBirth,
      sexe: gender ? "H" : "F",
      email: email,
      mot_de_passe: password,
    };

    try {
      // Récupérer le token depuis localStorage
      const token = localStorage.getItem('authToken');

      if (!token) {
        setErrorMessage("Token manquant, veuillez vous reconnecter.");
        return;
      }

      // Envoyer les données à l'API pour mise à jour avec le token dans les en-têtes
      const response = await axios.put("http://localhost:4001/user-profile", updatedUserData, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Ajout du token dans l'en-tête
        },
      });

      setSuccessMessage("Profil mis à jour avec succès !");
      setErrorMessage("");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "Une erreur s'est produite.");
      } else {
        setErrorMessage("Erreur de connexion au serveur.");
      }
    }
  };

  return (
    <Box 
      sx={{ 
        bgcolor: "#f5f5f5", 
        height: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        mt: -5
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: -5 }}
      >
        <img 
          src={logo} 
          alt="Logo" 
          style={{ height: '120px', marginBottom: '24px' }} 
        />

        <Box 
          sx={{ 
            bgcolor: 'white', 
            padding: 4, 
            borderRadius: 2, 
            boxShadow: 3, 
            width: '100%',
            mt : -5
          }}
        >
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Modifier le Profil
          </Typography>
          {errorMessage && <Alert severity="error" sx={{ marginBottom: 2 }}>{errorMessage}</Alert>}
          {successMessage && <Alert severity="success" sx={{ marginBottom: 2 }}>{successMessage}</Alert>}
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Nom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                sx={{ bgcolor: 'white', input: { color: 'black' }, marginRight: 1 }}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Prénom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{ bgcolor: 'white', input: { color: 'black' }, marginLeft: 1 }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Date de naissance"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ bgcolor: 'white', input: { color: 'black' }, marginRight: 1 }}
              />
              <FormControl fullWidth variant="outlined" required sx={{ marginLeft: 1 }}>
                <InputLabel>Genre</InputLabel>
                <Select
                  value={gender === null ? "" : gender ? "male" : "female"}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setGender(selectedValue === "male");
                  }}
                  label="Genre"
                >
                  <MenuItem value="male">Homme</MenuItem>
                  <MenuItem value="female">Femme</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TextField
              variant="outlined"
              required
              fullWidth
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ bgcolor: 'white', input: { color: 'black' }, marginBottom: 2 }}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ bgcolor: 'white', input: { color: 'black' }, marginBottom: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ bgcolor: '#DDA15E', '&:hover': { bgcolor: '#d19c5c' }, marginBottom: 2 }}
            >
              Mettre à jour
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfilePage;
