import React from "react";
import { CheckCircle } from "@mui/icons-material";
import { Box, Typography, Grid, Paper } from "@mui/material";
import codeImg from "../assets/bgThe.jpg"; // Remplacez par une image de thé si possible
import { checklistItems } from "../constants";

const Workflow = () => {
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Découvrez l'art du thé :{" "}
        <span style={{ background: "linear-gradient(to right, #DDA15E, #ac6434)", WebkitBackgroundClip: "text", color: "transparent" }}>
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
              <Box sx={{ backgroundColor: '#DDA15E', borderRadius: '50%', width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2 }}>
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
  );
};

export default Workflow;
