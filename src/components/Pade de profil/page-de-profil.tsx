import { FC, useState, useEffect } from "react";
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
  const [password, setPassword] = useState<string>(""); // Champ mot de passe initialisé vide
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Fonction pour récupérer les données de l'utilisateur
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setErrorMessage("Token manquant, veuillez vous reconnecter.");
        setLoading(false);
        return;
      }

      const response = await axios.get("https://backend.dsp5-archi-o23-15m-g5.fr/user-profile", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const userData = response.data;
      setFirstName(userData.prenom);
      setLastName(userData.nom);

      const formattedDate = new Date(userData.date_de_naissance).toISOString().slice(0, 10);
      setDateOfBirth(formattedDate);

      setGender(userData.sexe === "H");
      setEmail(userData.email);
      setLoading(false);
    } catch (error) {
      setErrorMessage("Erreur lors du chargement des données de l'utilisateur.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !dateOfBirth || gender === null || !email) {
      setErrorMessage("Veuillez remplir les champs obligatoires.");
      return;
    }

    // Crée un objet avec uniquement les champs à mettre à jour
    const updatedUserData: any = {
      nom: lastName,
      prenom: firstName,
      date_de_naissance: dateOfBirth,
      sexe: gender ? "H" : "F",
      email: email,
    };

    // Ajoute le mot de passe uniquement s'il est fourni
    if (password) {
      updatedUserData.mot_de_passe = password;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setErrorMessage("Token manquant, veuillez vous reconnecter.");
        return;
      }

      await axios.put("https://backend.dsp5-archi-o23-15m-g5.fr/user-profile", updatedUserData, {
        headers: {
          'Authorization': `Bearer ${token}`,
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
            mt: -5
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
              disabled={loading}
            >
              {loading ? "Chargement..." : "Mettre à jour"}
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfilePage;