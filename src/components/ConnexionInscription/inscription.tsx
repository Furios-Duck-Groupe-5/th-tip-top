import { FC, useState } from "react";
import { TextField, Button, Typography, Container, Box, Alert, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import logo from "../../assets/thebgbg.png";
import React from "react";
import axios from "axios"; 


const SignUpPage: FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [gender, setGender] = useState<boolean | null>(null); // Modifié pour être un booléen ou null
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>(""); // Pour le message de succès

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifier si tous les champs sont remplis
    if (!firstName || !lastName || !dateOfBirth || gender === null || !email || !password) {
      setErrorMessage("Veuillez remplir tous les champs.");
    } else {
      setErrorMessage("");

      // Préparer les données pour l'envoi
      const userData = {
        nom: lastName,
        prenom: firstName,
        date_de_naissance: dateOfBirth,
        sexe: gender ? "H" : "F", // Ici, on suppose que 'male' est vrai et 'female' est faux
        email: email,
        mot_de_passe: password,
      };

      try {
        // Envoyer les données à l'API
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, userData);
        setSuccessMessage("Inscription réussie !");
        console.log(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // Gérer les erreurs renvoyées par le serveur
          setErrorMessage(error.response.data.message || "Une erreur s'est produite.");
        } else {
          setErrorMessage("Erreur de connexion au serveur.");
        }
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
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt :-5 }}
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
            Inscription
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
                  value={gender === null ? "" : gender ? "male" : "female"} // Affiche 'male' si true et 'female' si false
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
              S'inscrire
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            Ou inscrivez-vous avec:
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 1, borderColor: '#3b5998', color: '#3b5998' }}
            onClick={() => console.log("Inscription avec Facebook")}
          >
            Facebook
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ borderColor: '#db4437', color: '#db4437' }}
            onClick={() => console.log("Inscription avec Google")}
          >
            Google
          </Button>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            Vous avez déjà un compte? <a href="#" style={{ color: 'orange' }}>Se connecter</a>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUpPage;
