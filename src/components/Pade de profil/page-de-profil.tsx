import { FC, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Grid,
} from "@mui/material";
import React from "react";

const ProfilePage: FC = () => {
  const [firstName, setFirstName] = useState<string>("Jean");
  const [lastName, setLastName] = useState<string>("Dupont");
  const [dateOfBirth, setDateOfBirth] = useState<string>("2000-01-01");
  const [phoneNumber, setPhoneNumber] = useState<string>("0123456789");
  const [gender, setGender] = useState<string>("male");
  const [email, setEmail] = useState<string>("jean.dupont@example.com");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !dateOfBirth || !phoneNumber || !gender || !email || !password || !confirmPassword) {
      setErrorMessage("Veuillez remplir tous les champs.");
    } else if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
    } else {
      setErrorMessage("");
      setSuccessMessage("Profil mis à jour avec succès !");
      // Logic for saving profile data can be added here
    }
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePicture(e.target.files[0]);
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 5 }}>
      <Box
        sx={{
          bgcolor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'center',
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Profil
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        {/* Profile Picture */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <label>
            <Avatar
              alt="Photo de profil"
              src={profilePicture ? URL.createObjectURL(profilePicture) : ''}
              sx={{ width: 100, height: 100, cursor: 'pointer', border: '2px solid #DDA15E' }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              style={{ display: 'none' }} // Hide the input
            />
          </label>
        </Box>

        <form onSubmit={handleSave}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Date de naissance"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Numéro de téléphone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" required sx={{ marginBottom: 2 }}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Confirmer le mot de passe"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ bgcolor: '#DDA15E', '&:hover': { bgcolor: '#d19c5c' } }}
          >
            Enregistrer
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ProfilePage;
