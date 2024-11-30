import React from "react";
import { CheckCircle } from "@mui/icons-material";
import { Box, Typography, Grid, Paper } from "@mui/material";
import codeImg from "../assets/bgThe.jpg"; 
import { checklistItems } from "../constants";
import { Helmet } from "react-helmet";

const Workflow = () => {
  return (
    <>
      <Helmet>
        {/* SEO Meta Tags */}
        <title>Découvrez l'art du thé | Une expérience enrichissante</title>
        <meta
          name="description"
          content="Découvrez l'art du thé avec notre guide étape par étape pour une expérience enrichissante. Apprenez les étapes essentielles pour maîtriser l'infusion parfaite."
        />
        <meta
          name="keywords"
          content="thé, infuser le thé, art du thé, guide du thé, expérience enrichissante, thé parfait"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags for social sharing */}
        <meta property="og:title" content="Découvrez l'art du thé | Une expérience enrichissante" />
        <meta
          property="og:description"
          content="Découvrez l'art du thé avec notre guide étape par étape pour une expérience enrichissante. Apprenez les étapes essentielles pour maîtriser l'infusion parfaite."
        />
        <meta property="og:image" content={codeImg} />
        <meta property="og:url" content="URL_de_votre_page_workflow" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:title" content="Découvrez l'art du thé | Une expérience enrichissante" />
        <meta
          name="twitter:description"
          content="Apprenez à maîtriser l'art du thé grâce à notre guide détaillé. Découvrez les étapes essentielles pour infuser le thé à la perfection."
        />
        <meta name="twitter:image" content={codeImg} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Découvrez l'art du thé :{" "}
          <span
            style={{
              background: "linear-gradient(to right, #DDA15E, #ac6434)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            une expérience enrichissante.
          </span>
        </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <img src={codeImg} alt="Thé" style={{ width: '100%', borderRadius: '8px' }} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} sx={{ pt: 4 }}>
            {checklistItems.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box
                  sx={{
                    backgroundColor: '#DDA15E',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mr: 2,
                  }}
                >
                  <CheckCircle sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Workflow;
