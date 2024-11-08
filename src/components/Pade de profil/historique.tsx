import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Card, CardContent, List, ListItem, Divider, CircularProgress, Alert } from "@mui/material";

// Exemple de données statiques pour l'historique des gains
const sampleGainHistory = [
  { lot: "Infuseur à thé", date: "2024-10-01" },
  { lot: "Boîte de 100g de thé détox", date: "2024-10-05" },
  { lot: "Coffret découverte 39€", date: "2024-10-10" },
  { lot: "Boîte de 100g de thé signature", date: "2024-10-15" },
  { lot: "Coffret découverte 69€", date: "2024-10-20" },
];

// TODO : Le historique ne fonctionne pas , pas encore implémanter :)

const UserGainHistoryPage: React.FC = () => {
  const [gainHistory, setGainHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Simuler un délai de chargement
    setLoading(true);

    // Utilisation de données simulées pour l'historique des gains
    setTimeout(() => {
      setGainHistory(sampleGainHistory);
      setLoading(false);
    }, 1000); // Simule 1 seconde de chargement
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
          Historique de vos gains
        </Typography>
        <Typography variant="body1" sx={{ color: "#666" }}>
          Voici la liste de vos lots gagnés !
        </Typography>
      </Box>

      {errorMessage && <Alert severity="error" sx={{ mb: 4 }}>{errorMessage}</Alert>}

      {gainHistory.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body1" sx={{ fontStyle: "italic", color: "#777" }}>
            Vous n'avez pas encore de gains.
          </Typography>
        </Box>
      ) : (
        <List>
          {gainHistory.map((gain, index) => (
            <Card key={index} sx={{ mb: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {gain.lot}
                </Typography>
                <Typography variant="body2" sx={{ color: "#777" }}>
                  Gagné le : {gain.date}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </List>
      )}
    </Container>
  );
};

export default UserGainHistoryPage;
