import React from 'react';
import { Box, Typography, Button, TextField, Grid, Paper, Avatar } from '@mui/material';
import teaImage from '/Users/user/Desktop/virtualr-main/src/assets/teaBg.jpg'; // Chemin de votre image de fond
import teaIcon from '/Users/user/Desktop/virtualr-main/src/assets/teaBg.jpg'; // Chemin de votre icône de thé
import { motion } from 'framer-motion';
import bgV from '/Users/user/Desktop/virtualr-main/src/assets/teaVid1.mp4'
const ParticipationPage = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
       // bgcolor: '#f5f5f5',
        p: 4,
      }}
    >
      {/* Image d'arrière-plan floue */}
      <Box
        component="video"
        src={bgV}
        autoPlay
        loop
        muted
        playsInline
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          objectFit: 'cover',
          filter: 'blur(5px)',
          zIndex: -1,
          width:3000
        }}
      />


      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            color: '#DDA15E',
            fontWeight: 'bold',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.05)' },
              '100%': { transform: 'scale(1)' },
            },
          }}
        >
          Participez au Grand Jeu-Concours de Thé Tip Top
        </Typography>
      </motion.div>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h5" gutterBottom>
              Gagnez des lots incroyables !
            </Typography>
            <Typography variant="body1" paragraph>
              Pour célébrer l’ouverture de notre 10ème boutique à Nice, nous organisons un jeu-concours où tous les participants peuvent gagner des lots exclusifs.
            </Typography>
            <motion.img
              src={teaImage}
              alt="Thé"
              style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
              initial={{ scale: 1.05 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <Typography variant="h6" gutterBottom sx={{ color: '#DDA15E' }}>
              Lots à gagner :
            </Typography>
            <ul>
              <li>Infuseur à thé</li>
              <li>Boîte de thé détox ou d’infusion</li>
              <li>Boîte de thé signature</li>
              <li>Coffret découverte d’une valeur de 39€</li>
              <li>Coffret découverte d’une valeur de 69€</li>
            </ul>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="contained" color="primary" sx={{ backgroundColor: '#DDA15E', '&:hover': { backgroundColor: '#d49a5c' }, mt: 2 }}>
                Voir tous les lots
              </Button>
            </motion.div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#DDA15E' }}>
              Inscription
            </Typography>
            <Typography variant="body1" paragraph>
              Entrez votre code de participation pour tenter votre chance :
            </Typography>
            <TextField
              fullWidth
              label="Code de participation"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="contained" color="primary" fullWidth sx={{ backgroundColor: '#DDA15E', '&:hover': { backgroundColor: '#d49a5c' } }}>
                Participer
              </Button>
            </motion.div>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              * Les participants doivent conserver leur ticket de caisse pour valider leur participation.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#DDA15E' }}>
          Suivez-nous sur les réseaux sociaux !
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {Array.from({ length: 3 }).map((_, index) => (
            <Grid item key={index}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Avatar src={teaIcon} alt="Thé Icon" sx={{ width: 60, height: 60 }} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Participez à notre jeu-concours et suivez nos actualités pour plus de surprises !
        </Typography>
      </Box>

      <Box sx={{ mt: 4, p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" align="center" gutterBottom sx={{ color: '#DDA15E' }}>
          À propos de nous
        </Typography>
        <Typography variant="body1" align="center">
          Chez Thé Tip Top, nous sommes passionnés par le thé de qualité. Découvrez nos mélanges uniques et rejoignez notre communauté de passionnés.
        </Typography>
      </Box>
    </Box>
  );
};

export default ParticipationPage;
