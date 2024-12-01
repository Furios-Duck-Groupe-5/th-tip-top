import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Paper,
  Grid,
  IconButton,
  Divider,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '', // Ajout du champ "Sujet"
    message: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    setSnackbarOpen(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <header>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: '#DDA15E', fontWeight: 'bold', textAlign: 'center' }}
        >
          Contactez-Nous
        </Typography>
      </header>
      <section>
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
                Informations de Contact
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#DDA15E', mr: 2 }}>
                  <EmailIcon />
                </Avatar>
                <Typography variant="body1" sx={{ color: '#555' }}>
                  <a href="mailto:contact@example.com" style={{ textDecoration: 'none', color: '#555' }}>
                    contact@example.com
                  </a>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#DDA15E', mr: 2 }}>
                  <PhoneIcon />
                </Avatar>
                <Typography variant="body1" sx={{ color: '#555' }}>
                  <a href="tel:+1234567890" style={{ textDecoration: 'none', color: '#555' }}>
                    +1 234 567 890
                  </a>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#DDA15E', mr: 2 }}>
                  <LocationOnIcon />
                </Avatar>
                <Typography variant="body1" sx={{ color: '#555' }}>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=123+Rue+Exemple,+Paris"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: '#555' }}
                  >
                    123 Rue Exemple, Paris
                  </a>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Nom"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
                <TextField
                  label="Sujet"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
                <TextField
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  required
                  variant="outlined"
                  sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: '8px', width: '100%',bgcolor: '#DDA15E' }}>
                  Envoyer
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </section>

      {/* Snackbar pour confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Votre message a été envoyé avec succès !"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default ContactPage;
