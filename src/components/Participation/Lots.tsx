import React, { FC } from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import teaInfuser from '/src/components/Participation/infusseur.png';
import detoxTea from '/src/components/Participation/detox.png';
import signatureTea from '/src/components/Participation/signature.png';
import discoverySetSmall from '/src/components/Participation/39.png';
import discoverySetLarge from '/src/components/Participation/69.png';
import teaForAYear from '/src/components/Participation/360.png';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';  // Importation de React Helmet

const LotsPage: FC = () => {
  const lots = [
    {
      title: 'Infuseur à Thé',
      image: teaInfuser,
      description: 'Un infuseur artisanal pour préparer vos thés avec élégance.',
    },
    {
      title: 'Thé Détox',
      image: detoxTea,
      description: 'Un mélange de thé revitalisant pour un bien-être optimal.',
    },
    {
      title: 'Thé Signature',
      image: signatureTea,
      description: 'Un mélange raffiné et exclusif pour les amateurs de thé.',
    },
    {
      title: 'Coffret Découverte (39€)',
      image: discoverySetSmall,
      description: 'Un assortiment de nos meilleurs thés pour une expérience unique.',
    },
    {
      title: 'Coffret Découverte (69€)',
      image: discoverySetLarge,
      description: 'Une expérience complète avec nos thés les plus prestigieux.',
    },
  ];
  const navigate = useNavigate();

  const handleGoToDraw = () => {
    navigate("/")
  }

  return (
    <>
      {/* Ajout de balises SEO avec Helmet */}
      <Helmet>
        <title>Découvrez Nos Lots Exceptionnels - Jeu-concours Thé</title>
        <meta name="description" content="Participez à notre jeu-concours et tentez de gagner des lots exceptionnels comme des thés de qualité et bien plus encore !" />
        <meta name="keywords" content="jeu concours, thé, infuseur, coffret découverte, lots exceptionnels, thé detox, thé signature" />
        <meta name="author" content="Votre Nom ou Entreprise" />
        <link rel="canonical" href="https://dsp5-archi-o23-15m-g5.fr/lots" />
        {/* Open Graph meta tags (pour un meilleur partage sur les réseaux sociaux) */}
        <meta property="og:title" content="Découvrez Nos Lots Exceptionnels - Jeu-concours Thé" />
        <meta property="og:description" content="Participez à notre jeu-concours pour gagner des lots incroyables, y compris un an de thé !" />
        <meta property="og:image" content="https://www.thetiptop.com/images/teaForAYear.jpg" />
        <meta property="og:url" content="https://dsp5-archi-o23-15m-g5.fr/lots" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Box sx={{ p: 4, minHeight: '100vh', backgroundColor: '#fff', position: 'relative', overflow: 'hidden' }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            color: '#DDA15E',
            fontWeight: 'bold',
            mb: 4,
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            animation: 'fadeIn 1.5s',
            '@keyframes fadeIn': {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 },
            },
          }}
        >
          Découvrez Nos Lots Exceptionnels
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {lots.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Card sx={{ boxShadow: 10, borderRadius: 5, backgroundColor: '#F5F5F5', overflow: 'visible' }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      objectFit: 'cover',
                      borderRadius: '5px 5px 0 0',
                      transition: 'transform 0.5s',
                      '&:hover': { transform: 'scale(1.1)' },
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: '#333', fontWeight: 'bold', mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}

          {/* GRAND TIRAGE AU SORT - 1 AN DE THÉ */}
          <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card sx={{ boxShadow: 15, border: '3px solid #DDA15E', borderRadius: 5 }}>
                <CardMedia
                  component="img"
                  height="350"
                  image={teaForAYear}
                  alt="1 an de thé"
                  sx={{
                    objectFit: 'cover',
                    borderRadius: '5px 5px 0 0',
                    transition: 'transform 0.5s',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div" sx={{ color: '#333', fontWeight: 'bold' }}>
                    Grand Tirage au Sort - Gagnez 1 An de thé !
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Participez à notre Grand Tirage au Sort et tentez de remporter un an de thé gratuit, d'une valeur de 360€ !
                    Profitez d'une sélection exclusive de nos meilleurs mélanges tout au long de l'année.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="large"
                    variant="contained"
                    sx={{
                      backgroundColor: '#DDA15E',
                      '&:hover': { backgroundColor: '#b89e48' },
                      color: '#fff',
                    }}
                  >
                    Explication de jeu concours
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: '#DDA15E', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
          >
            Participez à notre jeu-concours pour gagner ces lots incroyables, y compris 1 an de thé !
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#DDA15E',
              '&:hover': { backgroundColor: '#b89e48' },
              padding: '10px 30px',
              fontSize: '16px',
              borderRadius: 5,
              boxShadow: 3,
              transition: 'transform 0.2s',
              '&:active': { transform: 'scale(0.95)' },
            }}
            onClick={handleGoToDraw}
          >
            Participer maintenant
          </Button>
        </Box>

        {/* Effet graphique d'arrière-plan */}
        <Paper
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            backgroundImage: 'url("/src/components/Participation/39.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
          }}
        />
      </Box>
    </>
  );
};

export default LotsPage;
