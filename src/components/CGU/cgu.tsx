import React from "react";
import { Box, Typography, Container, Divider, Link } from "@mui/material";

const TermsOfUse = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5, pb: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: 'bold', color: '#DDA15E' }}
      >
        Conditions Générales d'Utilisation
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          1. Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          Bienvenue sur le site de Thé Tip Top. Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation de notre site web accessible à l'adresse <Link href="https://www.thetiptop.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#DDA15E' }}>www.thetiptop.com</Link>. En accédant à ce site, vous acceptez d'être lié par ces CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#DDA15E' }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          2. Objet
        </Typography>
        <Typography variant="body1" paragraph>
          Les CGU ont pour objet de définir les modalités et conditions d'utilisation des services proposés par Thé Tip Top, notamment la vente de thé, les jeux concours et l'accès à diverses informations sur nos produits. Ces conditions s'appliquent à tous les utilisateurs du site, qu'ils soient consommateurs, clients ou visiteurs.
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#DDA15E' }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          3. Utilisation du Site
        </Typography>
        <Typography variant="body1" paragraph>
          Vous vous engagez à utiliser ce site uniquement à des fins légales. Vous ne devez pas :
        </Typography>
        <Typography variant="body1" paragraph>
          - Utiliser le site d'une manière qui pourrait causer des dommages au site ou à son accès.
          <br />
          - Utiliser le site d'une manière qui est illégale, frauduleuse ou nuisible.
          <br />
          - Contacter les utilisateurs de manière abusive ou non sollicitée.
          <br />
          - Tenter d'accéder sans autorisation à d'autres systèmes informatiques ou réseaux connectés au site.
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#DDA15E' }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          4. Participation aux Jeux Concours
        </Typography>
        <Typography variant="body1" paragraph>
          Pour participer à nos jeux concours, vous devez être âgé d'au moins 18 ans et résider en France. Chaque client ayant effectué un achat supérieur à 40 euros reçoit un code unique sur son ticket de caisse, lui permettant de participer. Tous les codes sont gagnants, et les lots doivent être récupérés en magasin. Vous devez respecter les règles spécifiques à chaque concours, qui seront publiées sur notre site.
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#DDA15E' }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          5. Propriété Intellectuelle
        </Typography>
        <Typography variant="body1" paragraph>
          Tout le contenu présent sur ce site, y compris les textes, images, logos, et graphismes, est la propriété de Thé Tip Top et est protégé par les lois sur la propriété intellectuelle. Vous n'êtes pas autorisé à reproduire, distribuer ou modifier ce contenu sans notre autorisation écrite préalable. Toute violation des droits de propriété intellectuelle peut donner lieu à des poursuites judiciaires.
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#DDA15E' }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          6. Limitation de Responsabilité
        </Typography>
        <Typography variant="body1" paragraph>
          Thé Tip Top ne saurait être tenu responsable des dommages directs ou indirects pouvant survenir lors de l'utilisation de ce site, y compris la perte de profits, de données ou de l'utilisation de notre site. Nous ne garantissons pas que le site sera accessible sans interruption ou sans erreurs. En cas de problème, veuillez nous contacter pour obtenir de l'aide.
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#DDA15E' }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          7. Données Personnelles
        </Typography>
        <Typography variant="body1" paragraph>
          Nous nous engageons à protéger vos données personnelles conformément à notre <Link href="/politique-de-confidentialite" sx={{ color: '#DDA15E' }}>politique de confidentialité</Link>. Les informations que vous fournissez lors de votre inscription ou de votre participation à nos concours seront utilisées uniquement dans le cadre de nos services et ne seront pas partagées avec des tiers sans votre consentement.
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#DDA15E' }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          8. Modifications des CGU
        </Typography>
        <Typography variant="body1" paragraph>
          Nous nous réservons le droit de modifier ces Conditions Générales d'Utilisation à tout moment. Les modifications entreront en vigueur dès leur publication sur le site. Nous vous encourageons à consulter régulièrement cette page pour rester informé des changements. Votre utilisation continue du site après la publication des modifications constitue votre acceptation des nouvelles conditions.
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#DDA15E' }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          9. Droit Applicable
        </Typography>
        <Typography variant="body1" paragraph>
          Les présentes CGU sont régies par le droit français. En cas de litige, les tribunaux compétents seront ceux de Paris.
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#DDA15E' }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          10. Contact
        </Typography>
        <Typography variant="body1" paragraph>
          Pour toute question concernant ces Conditions Générales d'Utilisation, veuillez nous contacter à l'adresse suivante : <Link href="mailto:contact@thetiptop.com" sx={{ color: '#DDA15E' }}>contact@thetiptop.com</Link>.
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsOfUse;
