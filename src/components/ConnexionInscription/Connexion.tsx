import { FC, useState } from "react";
import { TextField, Button, Typography, Container, Box, Alert } from "@mui/material";
import logo from "/Users/user/Desktop/virtualr-main/src/assets/thébgbg.png";
import React from "react";

const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs.");
    } else {
      setErrorMessage("");
      console.log("Email:", email);
      console.log("Mot de passe:", password);
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
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' ,          mt: -25}}
      >
        {/* Agrandir et centrer le logo */}
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
            mt:-5
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
                bgcolor: 'white',   // Couleur de fond blanc
                input: { color: 'black' },  // Couleur du texte en noir
                marginBottom: 2
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ 
                bgcolor: 'white',  // Couleur de fond blanc
                input: { color: 'black' },  // Couleur du texte en noir
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
