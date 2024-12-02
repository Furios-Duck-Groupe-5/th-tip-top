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

interface TicketData {
  gain: string;
  count: number;
}

const DetailedStatisticsPage: React.FC = () => {
  const [winners, setWinners] = useState<WinnerData[]>([]);
  const [ageGroups, setAgeGroups] = useState<AgeGroupData[]>([]);
  const [ticketStats, setTicketStats] = useState<TicketData[]>([]);
  const COLORS = ['#0088FE', '#FF69B4','#4CAF50']

  useEffect(() => {
    // Récupérer les statistiques générales
    fetch("https://backend.dsp5-archi-o23-15m-g5.fr/statistics")
      .then(response => response.json())
      .then(data => {
        console.log("Données des statistiques générales:", data); // Log pour vérifier les données
  
        const genderStats = data.genderStats.map((item: any) => ({
          gender: item.sexe === 'H' ? 'Homme' : item.sexe === 'F' ? 'Femme' : 'Autre',
          count: parseInt(item.count, 10),
        }));
  
        const otherGender = { gender: 'Autre', count: 0 };
        const genders = genderStats.filter((item: { gender: string; }) => item.gender !== 'Autre');
        
        if (genders.length === genderStats.length) {
          genders.push(otherGender); 
        }
  
        setWinners(genders);
        
        setAgeGroups(data.ageStats.map((item: any) => ({
          ageGroup: item.age_group,
          count: parseInt(item.count, 10),
        })));
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques :', error);
      });
  
    // Récupérer les statistiques des tickets
    fetch("https://backend.dsp5-archi-o23-15m-g5.fr/ticket-statistics")
      .then(response => response.json())
      .then(data => {
        console.log("Données des statistiques des tickets:", data); // Log pour vérifier les données des tickets

        // Adapter pour récupérer les tickets depuis 'availableTickets'
        setTicketStats(data.availableTickets.map((item: any) => ({
          gain: item.gain,
          count: parseInt(item.count, 10), // Assurez-vous de convertir count en nombre
        })));
      })
      .catch(error => console.error('Erreur lors de la récupération des statistiques des tickets :', error));
  }, []);

  // Log des données avant de les envoyer aux graphiques
  useEffect(() => {
    console.log("Winners:", winners);
    console.log("Age Groups:", ageGroups);
    console.log("Ticket Stats:", ticketStats);
  }, [winners, ageGroups, ticketStats]);

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
        {/* Statistiques par Sexe */}
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

        {/* Statistiques par Âge */}
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

        {/* Statistiques des Tickets */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h6" gutterBottom>Statistiques des Tickets disponibles</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ticketStats}>
                <XAxis dataKey="gain" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#4F7CAC" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailedStatisticsPage;
