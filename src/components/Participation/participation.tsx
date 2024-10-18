import React, { useState, useEffect, FC } from 'react';
import { Box, Typography, Button, TextField, Grid, Paper, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import ResultPopup from './resultat';
import HistoryPopup from './historique-gain';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import Lottie from 'lottie-react';
import fireworksAnimation from './fire-work.json';
// TODO: Ajouter une animation de première visite
// import starExplosionAnimation from './starts.json';
type Prize = {
  name: string;
  image: string;
};
const ParticipationPage: FC = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [code, setCode] = useState('');
  const [gains, setGains] = useState<Array<{ name: string; date: string }>>([]);
  const [codeValidated, setCodeValidated] = useState(false);
  const [codeMessage, setCodeMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(30 * 24 * 60 * 60 * 1000);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  // Vérification de la première visite
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  // Compte à rebours
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1000);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Affichage de l'animation lors de la validation du code
  useEffect(() => {
    if (codeValidated) {
      setShowAnimation(true);
      const animationTimeout = setTimeout(() => {
        setShowAnimation(false);
      }, 5000);
      return () => clearTimeout(animationTimeout);
    }
  }, [codeValidated]);

  // Formater le temps restant
  const formatTimeLeft = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTimeLeft(timeLeft);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenHistoryModal = () => setOpenHistoryModal(true);
  const handleCloseHistoryModal = () => setOpenHistoryModal(false);
  const handleRedirectToDraw = () => navigate('/lots');

  //TODO à changer la logique de boucle de participation
  const handleCodeSubmit = () => {
    //TODO à changer c'st juste pour le test
    if (code === '1234567890') {
      if (!codeValidated) {
        const randomValue = Math.random();
        //TODO àc changer le type de prize
        let prize : Prize;

        if (randomValue < 0.3) {
          prize = { name: 'Infuseur à thé', image: 'src/components/Participation/infusseur.png' };
        } else if (randomValue < 0.5) {
          prize = { name: 'Thé détox', image: 'src/components/Participation/detox.png' };
        } else if (randomValue < 0.7) {
          prize = { name: 'Thé Signature', image: 'src/components/Participation/signature.png' };
        } else if (randomValue < 0.9) {
          prize = { name: 'Coffret Découverte (39€)', image: 'src/components/Participation/39.png' };
        } else {
          prize = { name: 'Coffret Découverte (69€)', image: 'src/components/Participation/69.png' };
        }

        setResult(prize);
        setCodeValidated(true);

        if (prize.name && prize.name !== 'Désolé, vous n\'avez rien gagné.') {
          setGains((prevGains) => [
            ...prevGains,
            { name: prize.name, date: new Date().toLocaleString() },
          ]);
        }

        handleOpenModal();
      } else {
        setCodeMessage('Code déjà validé');
      }
    } else {
      setCodeMessage('Code invalide');
    }
  };

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', p: 4, backgroundColor: '#F0F4EF' }}>
      {/* Confetti si le code est validé */}
      {codeValidated && <Confetti numberOfPieces={200} />}

      {/* Animation de première visite */}
      {isFirstVisit && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999,
          }}
        >
          {/* TODO: Activer l'animation */}
          {/* <Lottie animationData={starExplosionAnimation} loop={true} /> */}
        </Box>
      )}

      {/* Animation de validation du code */}
      {showAnimation && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999,
          }}
        >
          <Lottie animationData={fireworksAnimation} loop={true} />
        </Box>
      )}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            color: '#DDA15E',
            fontWeight: 'bold',
            mb: 4,
            fontFamily: 'cursive',
            letterSpacing: '2px',
          }}
        >
          Participez au Grand Jeu-Concours de Thé Tip Top !
        </Typography>
      </motion.div>

      <Box sx={{ textAlign: 'center', mb: 4, p: 3, backgroundColor: '#fff', borderRadius: '12px', boxShadow: 4 }}>
        <Typography variant="h5" sx={{ color: '#DDA15E', mb: 1 }}>
          Le jeu se termine dans :
        </Typography>
        <Typography variant="h6" sx={{ color: '#DDA15E' }}>
          {days} jours {hours} heures {minutes} minutes {seconds} secondes
        </Typography>
      </Box>

      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <motion.div initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ type: 'spring', stiffness: 50 }}>
            <Box sx={{ textAlign: 'center' }}>
              <img
                src="src/components/Participation/concour.png"
                alt="Concours Thé Tip Top"
                style={{
                  width: '100%',
                  maxWidth: '600px',
                  height: 'auto',
                  borderRadius: '20px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                }}
              />
            </Box>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 3, backgroundColor: '#FFFBF2' }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#DDA15E', mb: 2 }}>
              Gagnez des cadeaux exclusifs !
            </Typography>
            <Typography variant="body1" paragraph>
              Pour célébrer l’ouverture de notre nouvelle boutique, tentez votre chance et gagnez un an de thé, des coffrets et plus encore !
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ color: '#DDA15E' }}>
              Lots à gagner :
            </Typography>
            <ul style={{ color: '#DDA15E', fontWeight: 'bold' }}>
              <li>Infuseur à thé</li>
              <li>Boîte de thé détox ou infusion</li>
              <li>Coffrets découverte</li>
              <li>Thé signature</li>
              <li>Un an de thé gratuit</li>
            </ul>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body1" paragraph sx={{ mb: 2 }}>
              Entrez votre code pour participer :
            </Typography>
            <TextField
              fullWidth
              label="Code de participation"
              variant="outlined"
              sx={{ mb: 2 }}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              InputLabelProps={{
                style: { color: '#DDA15E' }
              }}
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ backgroundColor: '#DDA15E', '&:hover': { backgroundColor: '#4B7260' } }}
                onClick={handleCodeSubmit}
              >
                Participer
              </Button>
            </motion.div>
            {codeMessage && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                {codeMessage}
              </Typography>
            )}

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Box sx={{ flex: 1, ml: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ backgroundColor: '#DDA15E', '&:hover': { backgroundColor: '#d49a5c' }, width: '100%' }}
                    onClick={handleRedirectToDraw}
                  >
                    Voir tous les lots
                  </Button>
                </Box>
              </motion.div>

            </Box>
          </Paper>
        </Grid>
      </Grid>

      <ResultPopup open={openModal} handleClose={handleCloseModal} result={result} />
      <HistoryPopup open={openHistoryModal} onClose={handleCloseHistoryModal} gains={gains} />
    </Box>
  );
};

export default ParticipationPage;
