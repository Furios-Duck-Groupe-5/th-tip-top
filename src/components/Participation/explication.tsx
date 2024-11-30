import React from "react";
import "aos/dist/aos.css";
import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ExplanationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToParticipation = () => {
    navigate("/");
  };

  return (
    <>
      <Helmet>
        {/* SEO Meta Tags */}
        <title>Règlement du Jeu Concours "Thé Tip Top" | Participez et Gagnez</title>
        <meta
          name="description"
          content="Découvrez le règlement du jeu concours 'Thé Tip Top' et tentez de gagner des lots exceptionnels, y compris 1 an de thé d'une valeur de 360€."
        />
        <meta
          name="keywords"
          content="jeu concours, thé, concours, lots, participer, gagner, thé tip top, règlement concours, infuseur à thé"
        />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags for social sharing */}
        <meta property="og:title" content="Règlement du Jeu Concours 'Thé Tip Top'" />
        <meta
          property="og:description"
          content="Prenez connaissance des conditions de participation pour le jeu concours 'Thé Tip Top' et gagnez des lots exceptionnels."
        />
        <meta property="og:image" content="url_de_l_image" />
        <meta property="og:url" content="URL_de_votre_page_explanation" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:title" content="Règlement du Jeu Concours 'Thé Tip Top'" />
        <meta
          name="twitter:description"
          content="Découvrez comment participer au jeu concours 'Thé Tip Top' et gagner des lots fantastiques."
        />
        <meta name="twitter:image" content="url_de_l_image" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

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
    </>
  );
};

export default ExplanationPage;
