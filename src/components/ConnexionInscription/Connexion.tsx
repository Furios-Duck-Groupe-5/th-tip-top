import { FC, useState } from "react";
import { TextField, Button, Typography, Container, Box, Alert } from "@mui/material";
import logo from "../Participation/360.png";
import React from "react";
import axios from "axios";

const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [mot_de_passe, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !mot_de_passe) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return; // Sortir de la fonction si les champs ne sont pas remplis
    }

    setErrorMessage(""); // Réinitialiser le message d'erreur

    try {
      const response = await axios.post('http://localhost:4001/login', {
        email,
        mot_de_passe // Mot de passe envoyé en clair, mais haché côté serveur
      });
      console.log(response);

      // Si la connexion est réussie, gérer la réponse ici
      console.log("Connexion réussie:", response.data);
      window.location.href = '/blog'; 

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message || 'Erreur lors de la connexion.');
      } else {
        setErrorMessage('Une erreur inconnue s\'est produite.');
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
        mt: -10
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' , mt: -25 }}
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
            width: '100%' ,
            mt: -5
          }}
        >
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Connexion
          </Typography>
          {errorMessage && <Alert severity="error" sx={{ marginBottom: 2 }}>{errorMessage}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ 
                bgcolor: 'white',   
                input: { color: 'black' },
                marginBottom: 2
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Mot de passe"
              type="password" // Correction ici
              value={mot_de_passe}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ 
                bgcolor: 'white',
                input: { color: 'black' },
                marginBottom: 2
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                bgcolor: '#DDA15E', 
                '&:hover': { bgcolor: '#d19c5c' }, 
                marginBottom: 2
              }}
            >
              Se connecter
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            Vous n'avez pas de compte? <a href="#" style={{ color: 'orange' }}>Créer un compte</a>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
