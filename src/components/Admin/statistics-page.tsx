import React, { useEffect, useState } from 'react';
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

// Types pour les données de statistiques
interface WinnerData {
  gender: string;
  count: number;
}

interface AgeGroupData {
  ageGroup: string;
  count: number;
}

const DetailedStatisticsPage: React.FC = () => {
  const [winners, setWinners] = useState<WinnerData[]>([]);
  const [ageGroups, setAgeGroups] = useState<AgeGroupData[]>([]);
  const COLORS = ['#0088FE', '#FFBB28'];

  useEffect(() => {
    fetch('http://localhost:4001/statistics')
      .then(response => response.json())
      .then(data => {
        // Mise en forme des données pour le graphique de sexe
        setWinners(data.genderStats.map((item: any) => ({
          // TODO pourquoi h = femme?
          gender: item.sexe === 'H' ? 'Homme' : 'Femme',
          count: parseInt(item.count, 10),
        })));
        
        // Mise en forme des données pour le graphique d'âge
        setAgeGroups(data.ageStats.map((item: any) => ({
          ageGroup: item.age_group,
          count: parseInt(item.count, 10),
        })));
      })
      .catch(error => console.error('Erreur lors de la récupération des statistiques :', error));
  }, []);

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
