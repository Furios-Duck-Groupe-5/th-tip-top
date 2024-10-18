import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';

// Définition de l'interface pour les articles
interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  content: string;
}

// Données des articles
const articles: Article[] = [
  {
    id: 1,
    title: 'Comment organiser un concours réussi',
    excerpt: 'Découvrez les étapes clés pour organiser un concours qui attire de nombreux participants et engage votre audience.',
    image: 'src/assets/bgThe.jpg',
    content: `
      ### Étape 1 : Définir des objectifs clairs
      Avant de commencer, déterminez ce que vous souhaitez atteindre avec votre concours. Que ce soit pour augmenter votre base de données clients ou accroître votre visibilité, des objectifs clairs vous aideront à orienter votre stratégie.
      
      ### Étape 2 : Choisir le bon prix
      Offrir un prix attrayant est essentiel pour attirer des participants. Un bon prix peut être un produit, un service, ou une expérience unique.
      
      ### Étape 3 : Promouvoir votre concours
      Utilisez les réseaux sociaux, votre site web et d'autres canaux pour promouvoir votre concours. Créez un hashtag et encouragez vos participants à partager.
      
      ### Conclusion
      Avec ces étapes, vous serez sur la bonne voie pour organiser un concours réussi qui engage votre audience !
    `,
  },
  {
    id: 2,
    title: 'Les meilleures pratiques pour engager vos participants',
    excerpt: 'Engager vos participants est essentiel pour le succès de votre concours. Voici quelques pratiques à suivre pour maintenir l\'intérêt de votre audience.',
    image: 'src/assets/bgThe.jpg',
    content: `
      ### 1. Interactions régulières
      Postez régulièrement des mises à jour sur le concours, partagez des anecdotes et encouragez les participants à interagir.
      
      ### 2. Partagez les histoires de gagnants
      Montrez des témoignages et des histoires inspirantes de participants qui ont gagné, cela incitera d'autres à participer.
      
      ### 3. Utilisez des visuels attrayants
      Créez des graphiques et des vidéos captivantes pour attirer l'attention et encourager le partage sur les réseaux sociaux.
      
      ### Conclusion
      En appliquant ces pratiques, vous maximiserez l'engagement de vos participants et rendrez votre concours plus vivant.
    `,
  },
  {
    id: 3,
    title: 'L’importance de la transparence dans les concours',
    excerpt: 'La transparence est cruciale pour instaurer la confiance auprès de vos participants. Découvrez pourquoi cela compte.',
    image: 'src/assets/bgThe.jpg',
    content: `
      ### Pourquoi la transparence est-elle importante ?
      Les participants doivent sentir qu'ils ont une chance équitable de gagner. Partager les règles, les critères de sélection et les processus d'attribution des prix est essentiel.
      
      ### Comment assurer la transparence ?
      - Publiez les règles du concours de manière claire et accessible.
      - Partagez les résultats et expliquez comment les gagnants ont été choisis.
      - Soyez réactif aux questions et préoccupations des participants.
      
      ### Conclusion
      La transparence est un pilier fondamental pour la réussite de votre concours et pour établir une relation de confiance avec vos participants.
    `,
  },
];

const BlogPage: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleOpen = (article: Article) => {
    setSelectedArticle(article);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArticle(null);
  };

  return (
    <Box
      sx={{
        p: 4,
        minHeight: '100vh',
        backgroundImage: `url(src/assets/bgThe.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}
    >
      <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
        Blog
      </Typography>
      <Typography variant="body1" align="center" sx={{ marginBottom: 4, color: '#fff', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}>
        Bienvenue sur notre blog ! Découvrez des conseils et astuces pour réussir vos concours et engager votre audience.
      </Typography>
      <Grid container spacing={4}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, transition: '0.3s', backgroundColor: 'rgba(255, 255, 255, 0.9)', '&:hover': { transform: 'scale(1.03)' } }}>
              <img src={article.image} alt={article.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
              <Typography variant="h5" sx={{ mt: 1, color: '#DDA15E' }}>
                {article.title}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, color: '#555' }}>
                {article.excerpt}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ backgroundColor: '#DDA15E', '&:hover': { backgroundColor: '#d49a5c' }, mt: 2 }}
                onClick={() => handleOpen(article)}
              >
                Lire la suite
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              width: { xs: '90%', sm: '600px' },
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {selectedArticle && (
              <>
                <Typography variant="h4" sx={{ color: '#DDA15E', fontWeight: 'bold' }}>
                  {selectedArticle.title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, color: '#444' }}>
                  {selectedArticle.content}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: '#DDA15E', '&:hover': { backgroundColor: '#d49a5c' }, mt: 4 }}
                  onClick={handleClose}
                >
                  Fermer
                </Button>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default BlogPage;
