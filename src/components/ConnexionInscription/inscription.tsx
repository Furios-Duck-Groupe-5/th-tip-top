import { FC, useState } from "react";
import { TextField, Button, Typography, Container, Box, Alert, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage: FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [gender, setGender] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  // Fonction de vérification de la solidité du mot de passe
  const checkPasswordStrength = (password: string) => {
    const lengthCheck = password.length >= 8;
    const upperCheck = /[A-Z]/.test(password);
    const lowerCheck = /[a-z]/.test(password);
    const numberCheck = /\d/.test(password);

    return {
      lengthCheck,
      upperCheck,
      lowerCheck,
      numberCheck,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification des valeurs
    console.log("Values on submit:", {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      password,
      confirmPassword,
    });

    // Vérifier si tous les champs sont remplis
    if (!firstName || !lastName || !dateOfBirth || gender === null || !email || !password || !confirmPassword) {
      setErrorMessage("Veuillez remplir tous les champs.");
      console.error("Erreur: champs incomplets");
    } else {
      const passwordStrength = checkPasswordStrength(password);

      // Vérification des critères du mot de passe
      if (!passwordStrength.lengthCheck) {
        setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
      } else if (!passwordStrength.upperCheck) {
        setErrorMessage("Le mot de passe doit contenir au moins une majuscule.");
      } else if (!passwordStrength.lowerCheck) {
        setErrorMessage("Le mot de passe doit contenir au moins une minuscule.");
      } else if (!passwordStrength.numberCheck) {
        setErrorMessage("Le mot de passe doit contenir au moins un chiffre.");
      } else if (password !== confirmPassword) {
        setErrorMessage("Les mots de passe ne correspondent pas.");
      } else {
        setErrorMessage(""); // Réinitialiser les messages d'erreur

        // Préparer les données pour l'envoi
        const userData = {
          nom: lastName,
          prenom: firstName,
          date_de_naissance: dateOfBirth,
          sexe: gender ? "H" : "F",
          email: email,
          mot_de_passe: password,
        };

        console.log("User data prepared for sending:", userData);

        try {
          // Envoyer les données à l'API
          const response = await axios.post("https://backend.dsp5-archi-o23-15m-g5.fr/signup", userData);
          console.log("Response from API:", response.data);
          setSuccessMessage("Inscription réussie !");
        } catch (error) {
          // Vérifier si l'erreur vient d'Axios
          if (axios.isAxiosError(error) && error.response) {
            console.error("API error:", error.response.data);
            setErrorMessage(error.response.data.message || "Une erreur s'est produite.");
          } else {
            console.error("Error with the server connection:", error);
            setErrorMessage("Erreur de connexion au serveur.");
          }
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
        mt: -5,
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: -5 }}
      >
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
                  value={gender === null ? "" : gender ? "male" : "female"}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    console.log("Gender selected:", selectedValue);  // Log de la sélection du genre
                    setGender(selectedValue === "male");
                  }}
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
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Confirmer le mot de passe"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            Vous avez déjà un compte?{" "}
            <span style={{ color: 'orange', cursor: 'pointer' }} onClick={handleLoginRedirect}>
              Se connecter
            </span>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUpPage;
