import { FC, useState } from "react";
import { TextField, Button, Typography, Container, Box, Alert, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios"; 
import logo from "../../assets/thebgbg.png";
import { useNavigate } from "react-router-dom"; // Importer useNavigate

const SignUpPage: FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate(); // Hook pour la navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification si tous les champs sont remplis
    if (!firstName || !lastName || !dateOfBirth || !phoneNumber || !gender || !email || !password) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage(""); 

    try {
      // Appel à l'API pour l'inscription
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        gender,
        email,
        password,
      });

      setSuccessMessage(response.data.message || "Inscription réussie ! Vous pouvez maintenant vous connecter.");

      setTimeout(() => {
        navigate("/login"); 
      }, 4000); 
    } catch (error: any) {
      console.error("Erreur lors de l'inscription :", error);

     
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Erreur lors de l'inscription. Veuillez réessayer.");
      } else {
        setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", mt: -5 }}>
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: -5 }}>
        <img src={logo} alt="Logo" style={{ height: '120px', marginBottom: '24px' }} />
        <Box sx={{ bgcolor: 'white', padding: 4, borderRadius: 2, boxShadow: 3, width: '100%', mt: -5 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>Inscription</Typography>

          {/* Affichage du message d'erreur */}
          {errorMessage && <Alert severity="error" sx={{ marginBottom: 2 }}>{errorMessage}</Alert>}

          {/* Affichage du message de succès */}
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
                sx={{ marginRight: 1 }}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Prénom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{ marginLeft: 1 }}
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
                sx={{ marginRight: 1 }}
              />
              <FormControl fullWidth required sx={{ marginLeft: 1 }}>
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
              sx={{ marginBottom: 2 }}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: 2 }}
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
            Vous avez déjà un compte? <a href="/login" style={{ color: 'orange' }}>Se connecter</a>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUpPage;
