import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  List,
  Divider,
} from '@mui/material';
import axios from 'axios';

const UserGainHistoryPage: React.FC = () => {
  const [gainHistory, setGainHistory] = useState<any[]>([]); // Store gains
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [errorMessage, setErrorMessage] = useState<string>(""); // Error message

  useEffect(() => {
    // Fetch user gain history data when component mounts
    const fetchGainHistory = async () => {
      setLoading(true); // Set loading to true before the request

      try {
        const response = await axios.post("https://backend.dsp5-archi-o23-15m-g5.fr/user-historique", {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include JWT token from localStorage
          },
        });

        // Check if the response contains gain data
        if (response.data.gains) {
          console.log("Gain Data:", response.data.gains); // Log the entire gain data from the response
          setGainHistory(response.data.gains); // Set the gains in state
        } else {
          setErrorMessage("Aucun gain trouvé pour cet utilisateur."); // If no gains
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique des gains:', error);
        setErrorMessage("Erreur lors de la récupération des gains."); // If error occurs
      } finally {
        setLoading(false); // Set loading to false after request is completed
      }
    };

    fetchGainHistory(); // Call the function to fetch gain history
  }, []); // Empty dependency array to fetch on component mount

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

      {errorMessage ? (
        <Alert severity="error" sx={{ mb: 4 }}>
          {errorMessage} {/* Display error message if any */}
        </Alert>
      ) : gainHistory.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body1" sx={{ fontStyle: "italic", color: "#777" }}>
            Vous n'avez pas encore de gains. {/* Display message if no gains */}
          </Typography>
        </Box>
      ) : (
        <List>
          {gainHistory.map((gain, index) => {
            console.log("Ticket:", gain); // Log each ticket
            console.log("Status (Remis):", gain.remis); // Log the 'remis' status of each ticket

            return (
              <React.Fragment key={gain.id_ticket}>
                <Card sx={{ mb: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {gain.gain} {/* Display gain name */}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#777" }}>
                      Gagné le : {gain.date_validation} {/* Display gain date */}
                    </Typography>
                    <Typography variant="body2" sx={{ color: gain.remis === "Remis" ? "green" : "red" }}>
                      {gain.remis} {/* Affiche la valeur de "Remis" ou "Non remis" directement */}
                    </Typography>
                  </CardContent>
                </Card>
                {index < gainHistory.length - 1 && <Divider />} {/* Add divider between items */}
              </React.Fragment>
            );
          })}
        </List>
      )}
    </Container>
  );
};

export default UserGainHistoryPage;
