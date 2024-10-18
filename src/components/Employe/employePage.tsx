import React, { FC, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';

// Type pour un gain
interface Gain {
  ticketNumber: string;
  prize: string;
  claimed: boolean;
}

// Props pour le composant
interface EmployeePageProps {}

const mockGainsData: Gain[] = [
  { ticketNumber: '12345', prize: 'Bon d\'achat de 50€', claimed: false },
  { ticketNumber: '67890', prize: 'Tablette', claimed: false },
  { ticketNumber: '54321', prize: 'Vélo', claimed: true },
];

const EmployeePage: FC<EmployeePageProps> = () => {
  const [ticketNumber, setTicketNumber] = useState<string>('');
  const [gains, setGains] = useState<Gain[]>([]);
  const [code, setCode] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  const handleCheckGains = () => {
    const foundGains = mockGainsData.filter(gain => gain.ticketNumber === ticketNumber);
    setGains(foundGains);
  };

  const handleClaimGain = (gain: Gain) => {
    if (gain.claimed) {
      alert('Ce lot a déjà été réclamé.');
      return;
    }
    alert(`Le gain "${gain.prize}" a été marqué comme remis.`);
    setGains(gains.map(g => g.ticketNumber === gain.ticketNumber ? { ...g, claimed: true } : g));
  };

  const handleGiveCode = () => {
    if (code && userEmail) {
      alert(`Le code pour le lot a été envoyé à l'email: ${userEmail}`);
      setCode('');
      setUserEmail('');
    } else {
      alert('Veuillez entrer un code valide et un email.');
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
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
          Page de l'Employé
        </Typography>
      </motion.div>

      <Grid container spacing={4} justifyContent="center">
        {/* Vérification des Gains */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#DDA15E' }}>
              Vérification des Gains
            </Typography>
            <TextField
              fullWidth
              label="Numéro de Ticket"
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#DDA15E',
                '&:hover': { backgroundColor: '#d49a5c' },
                mt: 2,
              }}
              onClick={handleCheckGains}
            >
              Vérifier
            </Button>

            {gains.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6">Gains trouvés :</Typography>
                {gains.map((gain, index) => (
                  <Paper key={index} sx={{ p: 2, mt: 1 }}>
                    <Typography variant="body1">{gain.prize}</Typography>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#DDA15E',
                        '&:hover': { backgroundColor: '#d49a5c' },
                        mt: 1,
                      }}
                      onClick={() => handleClaimGain(gain)}
                      disabled={gain.claimed}
                    >
                      {gain.claimed ? 'Déjà Réclamé' : 'Marquer comme Remis'}
                    </Button>
                  </Paper>
                ))}
              </Box>
            )}
            {gains.length === 0 && ticketNumber && (
              <Typography variant="body1" color="text.secondary">
                Aucun gain trouvé pour ce numéro de ticket.
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Don de Code */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#DDA15E' }}>
              Don de Code à l'Utilisateur
            </Typography>
            <TextField
              fullWidth
              label="Entrez le Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email de l'Utilisateur"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#DDA15E',
                '&:hover': { backgroundColor: '#d49a5c' },
                mt: 2,
              }}
              onClick={handleGiveCode}
            >
              Donner le Code
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeePage;
