import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Snackbar,
    CircularProgress,
    Grid,
    Paper,
    Card,
    CardContent,
    CardActions,
    Tooltip
} from '@mui/material';
import axios from 'axios';

const EmployeePrizePage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [prizeData, setPrizeData] = useState<any>(null); // Prize data
    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false); // Snackbar visibility
    const [snackbarMessage, setSnackbarMessage] = useState<string>(''); // Snackbar message

    // Function to search for user tickets
    const handleSearchPrize = async () => {
        if (!name || !email) {
            setSnackbarMessage('Veuillez saisir le nom et l\'email.');
            setOpenSnackbar(true);
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:4001/get-user-tickets', {
                nom: name,
                email: email,
            });

            if (response.data.gains && response.data.gains.length > 0) {
                const updatedGains = response.data.gains.map((gain: any) => ({
                    ...gain,
                    remis: gain.remis === true,
                }));

                setPrizeData({
                    ...response.data,
                    id_user: response.data.id_user,
                    gains: updatedGains,
                });
            } else {
                setPrizeData({ gains: [] });
                setSnackbarMessage('Aucun gain trouvé pour cet utilisateur.');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des tickets:', error);
            setSnackbarMessage('Erreur lors de la récupération des tickets.');
        } finally {
            setIsLoading(false);
            setOpenSnackbar(true);
        }
    };

    // Function to claim a prize
    const handleClaimPrize = async (id_ticket: number) => {
        try {
            const token = localStorage.getItem("authToken");

            if (!token) {
                console.error("Jeton d'authentification manquant.");
                setSnackbarMessage("Vous devez être connecté pour effectuer cette action.");
                setOpenSnackbar(true);
                return;
            }

            const requestData = { newStatus: true };

            const response = await axios.put(
                `http://localhost:4001/update-ticket-status/${id_ticket}`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            setPrizeData((prevData: any) => {
                const updatedGains = prevData.gains.map((gain: any) =>
                    gain.id_ticket === id_ticket ? { ...gain, remis: true } : gain
                );

                return {
                    ...prevData,
                    gains: updatedGains,
                };
            });

            setSnackbarMessage('Le gain a été marqué comme remis.');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut du gain:', error);
            setSnackbarMessage('Erreur lors de la mise à jour du statut du gain.');
        } finally {
            setOpenSnackbar(true);
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            {/* Title with the color DDA15E */}
            <Typography variant="h4" gutterBottom sx={{ color: '#DDA15E' }}>
                Visualisation des Gains
            </Typography>

            {/* Search Form */}
            <Paper sx={{ padding: 3, mb: 3, display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>Rechercher un utilisateur</Typography>
                <TextField
                    label="Nom"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#DDA15E', // Utilisation de la couleur DDA15E pour le bouton
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#B58A3B', // Effet au survol (une nuance plus foncée)
                        },
                        mb: 2,
                        textTransform: 'none'
                    }}
                    onClick={handleSearchPrize}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : 'Rechercher le gain'}
                </Button>
            </Paper>

            {/* Prize Information */}
            {prizeData && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" gutterBottom color="primary" sx={{ color: '#DDA15E' }}>Informations sur les Gains</Typography>
                    {prizeData.gains.length > 0 ? (
                        <Grid container spacing={3}>
                            {prizeData.gains.map((gain: any, index: number) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 2 }}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                Gain {index + 1}: {gain.gain}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Statut: {gain.remis ? 'Réclamé' : 'Disponible'}
                                            </Typography>
                                        </CardContent>
                                        <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
                                            <Tooltip title={gain.remis ? 'Ce gain a déjà été réclamé' : 'Cliquer pour réclamer'}>
                                                <Button
                                                    variant="contained"
                                                    color="success" // Utilisation d'un vert neutre pour le bouton de réclamation
                                                    disabled={gain.remis || isLoading}
                                                    onClick={() => handleClaimPrize(gain.id_ticket)}
                                                    sx={{
                                                        textTransform: 'none',
                                                        '&:hover': {
                                                            backgroundColor: '#388E3C', // Vert foncé au survol
                                                        },
                                                    }}
                                                >
                                                    {gain.remis ? 'Déjà remis' : 'Réclamer'}
                                                </Button>
                                            </Tooltip>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography>Aucun gain trouvé pour cet utilisateur.</Typography>
                    )}
                </Box>
            )}

            {/* Snackbar */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default EmployeePrizePage;
