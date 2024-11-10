import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Snackbar,
    CircularProgress,
} from '@mui/material';
import axios from 'axios';

const EmployeePrizePage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [prizeData, setPrizeData] = useState<any>(null); // Données des gains
    const [isLoading, setIsLoading] = useState<boolean>(false); // Gérer l'état de chargement
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false); // Affichage du Snackbar
    const [snackbarMessage, setSnackbarMessage] = useState<string>(''); // Message du Snackbar

    // Fonction pour rechercher les tickets de l'utilisateur
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
                // Marquez les gains comme 'remis' si leur statut est déjà vrai
                const updatedGains = response.data.gains.map((gain: any) => ({
                    ...gain,
                    remis: gain.remis === true, // Vérifiez ici le champ remis
                }));

                setPrizeData({
                    ...response.data,
                    id_user: response.data.id_user, // Assurez-vous que l'ID de l'utilisateur est bien inclus dans la réponse
                    gains: updatedGains, // Mettez à jour la liste des gains
                });
            } else {
                setPrizeData({ gains: [] }); // Stocke un tableau vide pour indiquer aucun gain
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

    // Fonction pour mettre à jour le statut de remise d'un gain
    const handleClaimPrize = async (id_ticket: number) => {
        try {
            const token = localStorage.getItem("authToken");  // Récupérer le jeton JWT

            if (!token) {
                console.error("Jeton d'authentification manquant.");
                setSnackbarMessage("Vous devez être connecté pour effectuer cette action.");
                setOpenSnackbar(true);
                return;
            }

            console.log("Tentative de mise à jour du ticket avec l'ID:", id_ticket);

            const requestData = { newStatus: true };  // Nouveau statut à envoyer

            const response = await axios.put(
                `http://localhost:4001/update-ticket-status/${id_ticket}`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`  // Ajout du jeton dans l'en-tête
                    }
                }
            );

            console.log("Réponse du serveur:", response);

            // Mise à jour locale des données après la réponse
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
            <Typography variant="h5" gutterBottom>
                Visualisation des Gains
            </Typography>

            {/* Champs de saisie */}
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

            {/* Bouton de recherche */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSearchPrize}
                disabled={isLoading}
                sx={{ mb: 2 }}
            >
                {isLoading ? <CircularProgress size={24} /> : 'Rechercher le gain'}
            </Button>

            {/* Affichage des informations sur les gains ou message "aucun gain trouvé" */}
            {prizeData && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Informations sur les Gains</Typography>
                    {prizeData.gains.length > 0 ? (
                        prizeData.gains.map((gain: any, index: number) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    disabled={gain.remis} // Désactiver si le gain est déjà remis
                                    onClick={() => handleClaimPrize(gain.id_ticket)}
                                    sx={{ mr: 2 }}
                                >
                                    Gain {index + 1}: {gain.gain}
                                </Button>
                                {gain.remis && <Typography color="textSecondary">Déjà remis</Typography>}
                            </Box>
                        ))
                    ) : (
                        <Typography>Aucun gain trouvé pour cet utilisateur.</Typography>
                    )}
                </Box>
            )}

            {/* Snackbar pour afficher les messages de succès ou d'erreur */}
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
