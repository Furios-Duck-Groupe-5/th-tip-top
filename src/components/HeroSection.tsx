import React from "react";
import { Box, Typography, Button } from "@mui/material";
import video1 from "../assets/teaVid1.mp4";
import video2 from "../assets/teaVid2.mp4";

const HeroSection = () => {
  return (
    <Box sx={{ textAlign: 'center', bgcolor: '#f5f5f5', p: 4, mt: -5 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Thé Tip Top
          <span style={{ color: '#ac6434' }}>
            {" "}Pour les amateurs de thé
          </span>
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth="600px" mx="auto">
          Plongez dans l'univers fascinant du thé ! Participez à notre concours excitant, découvrez des saveurs uniques et tentez de remporter des lots exclusifs. Chaque gorgée vous rapproche d'une aventure inoubliable !
        </Typography>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: '#DDA15E', 
            '&:hover': { 
              bgcolor: '#71C067' // Couleur au hover
            }, 
            mr: 2 
          }}
        >
          Participer
        </Button>
        <Button variant="outlined" sx={{ borderColor: '#DDA15E', color: '#DDA15E' }}>
          Les lots
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <video
          autoPlay
          loop
          muted
          style={{ borderRadius: '8px', width: '45%', margin: '0 10px', border: '2px solid #DDA15E' }}
        >
          <source src={video1} type="video/mp4" />
          Votre navigateur ne prend pas en charge la balise vidéo.
        </video>
        <video
          autoPlay
          loop
          muted
          style={{ borderRadius: '8px', width: '45%', margin: '0 10px', border: '2px solid #DDA15E' }}
        >
          <source src={video2} type="video/mp4" />
          Votre navigateur ne prend pas en charge la balise vidéo.
        </video>
      </Box>
    </Box>
  );
};

export default HeroSection;
