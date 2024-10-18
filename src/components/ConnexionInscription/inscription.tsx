import { FC, useState } from "react";
import { TextField, Button, Typography, Container, Box, Alert, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import logo from "../../assets/thebgbg.png";
import React from "react";

const SignUpPage: FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !dateOfBirth || !phoneNumber || !gender || !email || !password) {
      setErrorMessage("Veuillez remplir tous les champs.");
    } else {
      setErrorMessage("");
      console.log("Nom:", firstName);
      console.log("Prénom:", lastName);
      console.log("Date de naissance:", dateOfBirth);
      console.log("Numéro de téléphone:", phoneNumber);
      console.log("Genre:", gender);
      console.log("Email:", email);
      console.log("Mot de passe:", password);
      // Ajoutez votre logique d'inscription ici
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
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  label="Genre"
                >
                  <MenuItem value="male">Homme</MenuItem>
                  <MenuItem value="female">Femme</MenuItem>
                  <MenuItem value="other">Autre</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Numéro de téléphone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              sx={{ bgcolor: 'white', input: { color: 'black' }, marginBottom: 2 }}
            />
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