import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { features } from "../constants";

const FeatureSection = () => {
  return (
    <Box sx={{ position: 'relative', mt: 8, borderBottom: '1px solid #4a4a4a', minHeight: '800px' }}>
      <Box textAlign="center">
        <Box sx={{ bgcolor: '#DDA15E', color: 'white', borderRadius: '20px', height: '30px', display: 'inline-block', padding: '0 10px' }}>
          <Typography variant="caption" fontWeight="medium" textTransform="uppercase">
            Bonjour
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
          Bonjour bonjour{" "}
          <span style={{ background: 'linear-gradient(to right, #FF8C00, #C0392B)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            bonjouuur
          </span>
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={2} sx={{ display: 'flex', alignItems: 'center', padding: 2, borderRadius: 2 }}>
              <Box sx={{ bgcolor: '#DDA15E', color: 'white', borderRadius: '50%', height: '40px', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 }}>
                {feature.icon}
              </Box>
              <Box>
                <Typography variant="h6" sx={{ mb: 1, color: 'white' }}>
                  {feature.text}
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  {feature.description}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeatureSection;
