import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ExplanationPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialiser AOS pour les animations de défilement
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
  }, []);

  const handleGoToParticipation = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#e0dad3",
        padding: 4,
      }}
    >
      <Container sx={{ textAlign: "center", maxWidth: "lg" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            backgroundColor: "white",
            color: "#DDA15E",
            padding: "8px 16px",
            borderRadius: "20px",
            marginBottom: 4,
            border: "2px solid #DDA15E",
          }}
        >
          Règlement du Jeu Concours "Thé Tip Top"
        </Typography>

        <Box data-aos="fade-up" data-aos-duration="1000">
          <Typography variant="h5" sx={{ marginBottom: 3 }}>
            Bienvenue à notre jeu concours ! Pour participer et tenter de gagner des lots exceptionnels, veuillez prendre connaissance des conditions de participation.
          </Typography>

          <Typography variant="body1" sx={{ marginBottom: 3 }}>
            Le concours **"Thé Tip Top"** est une occasion unique de découvrir nos thés raffinés et de gagner des lots incroyables.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Conditions Générales de Participation :
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            1. Le concours est ouvert à toute personne âgée de plus de 18 ans, résidant en France métropolitaine.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            2. Pour participer, vous devez acheter pour 49€ minimum et obtenir un code unique sur votre ticket de caisse.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            3. Chaque ticket de caisse génère un code, et tous les tickets sont gagnants !
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            4. Le tirage au sort pour le gros lot de 1 an de thé d'une valeur de 360€ sera effectué sous contrôle d'un huissier de justice.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 4, marginBottom: 2 }}>
            Lots à Gagner :
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3 }}>
            - **Infuseur à thé** (modèle exclusif de la marque)
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3 }}>
            - **Coffret découverte** (Valeur de 39€ ou 69€)
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3 }}>
            - **Boîte de thé détox** ou **thé signature** (100g)
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#DDA15E",
              color: "white",
              borderRadius: "20px",
              padding: "12px 24px",
              "&:hover": {
                backgroundColor: "#c77a3e",
              },
            }}
            onClick={handleGoToParticipation}
          >
            Participez maintenant !
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ExplanationPage;
