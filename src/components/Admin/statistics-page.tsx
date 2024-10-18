import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const DetailedStatisticsPage = () => {
  // Remplacez les valeurs ci-dessous par des données réelles
  const totalTickets = 15000;
  const usedTickets = 12000;
  const wonLots = 300;

  // Données pour les graphiques
  const winners = [
    { gender: 'Homme', count: 180 },
    { gender: 'Femme', count: 120 },
  ];

  const ageGroups = [
    { ageGroup: '18-25', count: 50 },
    { ageGroup: '26-35', count: 100 },
    { ageGroup: '36-50', count: 80 },
    { ageGroup: '51+', count: 70 },
  ];

  // Couleurs pour le diagramme circulaire
  const COLORS = ['#0088FE', '#FFBB28'];

  return (
    <Box
      sx={{
        p: 4,
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#DDA15E' }}>
        Statistiques Détaillées du Jeu-Concours
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h6" gutterBottom>Total des Tickets Fournis</Typography>
            <Typography variant="body1">{totalTickets}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h6" gutterBottom>Total des Tickets Utilisés</Typography>
            <Typography variant="body1">{usedTickets}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h6" gutterBottom>Total des Lots Gagnés</Typography>
            <Typography variant="body1">{wonLots}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h6" gutterBottom>Statistiques par Sexe</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={winners}
                  dataKey="count"
                  nameKey="gender"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {winners.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h6" gutterBottom>Statistiques par Âge</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageGroups}>
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#DDA15E" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailedStatisticsPage;
