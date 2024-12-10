import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Snackbar } from '@mui/material';
import axios from 'axios';

const GrandTiragePage: React.FC = () => {
  // État pour gérer l'ouverture de la modale et le gagnant
  const [openGrandTirageDialog, setOpenGrandTirageDialog] = useState<boolean>(false);
  const [winner, setWinner] = useState<any>(null); // Gagnant du tirage
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false); // Pour afficher un message de succès
  const [notificationStatus, setNotificationStatus] = useState<string>(''); // Pour l'état de la notification

  // Fonction pour ouvrir la modale
  const handleOpenGrandTirageDialog = () => {
    setOpenGrandTirageDialog(true);
  };

  // Fonction pour fermer la modale
  const handleCloseGrandTirageDialog = () => {
    setOpenGrandTirageDialog(false);
    setWinner(null);
    setNotificationStatus('');
  };

  // Fonction pour effectuer le tirage
  const handleGrandTirage = async () => {
    try {
      // Appel API pour obtenir le gagnant
      const response = await axios.post("https://backend.dsp5-archi-o23-15m-g5.fr/grand-tirage", {});

      console.log('Réponse de l\'API:', response.data); // Log de la réponse API

      // Vérifie si la réponse contient un gagnant
      if (response.data && response.data.winner) {
        setWinner(response.data.winner); // Assigner le gagnant (prénom, nom, email)
      } else {
        console.error("Aucun gagnant dans la réponse de l'API");
      }

      setOpenGrandTirageDialog(true); // Ouvrir la modale pour afficher le gagnant

    } catch (error) {
      console.error('Erreur lors du tirage du grand lot:', error);
    }
  };

  // Fonction pour envoyer la notification au gagnant
  const handleSendNotification = async () => {
    try {
      if (!winner) {
        console.error('Aucun gagnant à notifier');
        return;
      }

      const subject = 'Félicitations pour votre victoire !';
      const message = `
Bonjour ${winner.prenom},

🎉 Félicitations ! 🎉

Vous avez remporté notre Grand Tirage ! 🏆

Nous avons le plaisir de vous annoncer que vous êtes notre heureux gagnant. Un email détaillant votre prix et les prochaines étapes vous a été envoyé à l'adresse suivante : ${winner.email}. 

Nous vous encourageons à vérifier votre boîte de réception, ainsi que votre dossier de courriers indésirables, pour ne rien manquer !

Nous tenons à vous remercier pour votre participation et espérons que ce gain vous apportera beaucoup de joie et de bonheur. 😊

Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter à tout moment à l'adresse thetiptop@exemple.fr

Encore toutes nos félicitations et à très bientôt pour d'autres tirages !

Bien à vous,
                L'équipe du Thé Tip Top
`;

      // Appel API pour envoyer la notification (email, message, etc.)
      await axios.post("https://backend.dsp5-archi-o23-15m-g5.fr/send-notification-grand", {
        email: winner.email, // Utilisation de l'email du gagnant
        subject: subject,
        message: message
      });

      setNotificationStatus('Notification envoyée avec succès.');
      setOpenSnackbar(true)
      handleCloseGrandTirageDialog();
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification:', error);
      setNotificationStatus('Erreur lors de l\'envoi de la notification.');
    }
  };

  return (
    <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#f4f4f9', borderRadius: '8px' }}>
      {/* Titre */}
      <Typography variant="h4" sx={{ mb: 3, color: '#333', fontWeight: 'bold' }}>
        Grand Tirage
      </Typography>

      {/* Bouton de lancement du tirage */}
      <Button
        onClick={handleGrandTirage}
        variant="contained"
        sx={{
          backgroundColor: '#DDA15E',
          '&:hover': {
            backgroundColor: '#C88B4D',
          },
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease',
        }}
      >
        Lancer le Grand Tirage
      </Button>

      {/* Snackbar de succès */}
      <Snackbar
  open={openSnackbar}
  autoHideDuration={3000}
  onClose={() => setOpenSnackbar(false)}
  message="Le tirage a été effectué avec succès!"
  sx={{
  
    transform: 'translateX(-50%)',
    bgcolor: '#28a745',
    color: '#fff',
    borderRadius: '8px',
    marginRight:'100px',
    padding: '10px',
    fontWeight: 'bold',
    zIndex: 1400,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', 
  }}
/>

      {/* Modale affichant le gagnant */}
      <Dialog
        open={openGrandTirageDialog}
        onClose={handleCloseGrandTirageDialog}
        sx={{
          '& .MuiDialog-paper': {
            display: 'flex',
            alignItems: 'center',   // Centre verticalement
            justifyContent: 'center', // Centre horizontalement
            padding: '20px',
            width: '400px',
          }
        }}
      >
        <DialogTitle sx={{ backgroundColor: '#DDA15E', color: '#fff' }}>
          Résultat du Grand Tirage
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#f9f9f9' }}>
          {winner ? (
            <>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                🎉 Félicitations à {winner.prenom} {winner.nom} 🎉
              </Typography>

              <Typography sx={{ fontWeight: 'bold', color: '#333', mt: 2 }}>
                Email:
              </Typography>
              <Typography variant="body1" sx={{ color: '#555', mb: 2 }}>
                {winner.email}
              </Typography>

              <Typography sx={{ fontWeight: 'bold', color: '#333', mt: 2 }}>
                Détails de la notification envoyée :
              </Typography>
              <Typography variant="body1" sx={{ color: '#555' }}>
                🎁 Objet : Félicitations pour votre victoire !<br />
                📧 Message : Bonjour {winner.nom} {winner.prenom},<br /><br />

                🎉 Félicitations ! 🎉 <br /><br />

                Vous avez remporté notre Grand Tirage ! 🏆

                Nous avons le plaisir de vous annoncer que vous êtes notre heureux gagnant. Un email détaillant votre prix et les prochaines étapes vous a été envoyé à l'adresse suivante : ${winner.email}.

                Nous vous encourageons à vérifier votre boîte de réception, ainsi que votre dossier de courriers indésirables, pour ne rien manquer !

                Nous tenons à vous remercier pour votre participation et espérons que ce gain vous apportera beaucoup de joie et de bonheur. 😊

                Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter à tout moment à l'adresse support@thetiptop.fr.

                Encore toutes nos félicitations et à très bientôt pour d'autres tirages !

                Bien à vous,
                L'équipe du Thé Tip Top
              </Typography>

            </>
          ) : (
            <Typography variant="body1" sx={{ color: '#555' }}>
              Aucun gagnant pour le moment.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSendNotification}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: '#DDA15E', // Couleur de fond
              '&:hover': {
                backgroundColor: '#C88B4D', // Couleur lors du survol
              },
            }}
          >
            Envoyer Notification
          </Button>
          
          <Button // TODO il faut supprimer ça puis fermer la fenetre de grand tirage apers que l'admin clqiue surenvoyer la nottification puis grisé le bouton du grand tirage
            onClick={handleCloseGrandTirageDialog}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: '#DDA15E', // Couleur de fond
              '&:hover': {
                backgroundColor: '#C88B4D', // Couleur lors du survol
              },
            }}
          >
            Fermer
          </Button>

        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GrandTiragePage;
