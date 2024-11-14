import React from "react";
import { Box, Typography, Container, Divider, Link } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5, pb: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: 'bold', color: '#DDA15E' }}
      >
        Politique de Confidentialité
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          1. Collecte des Informations
        </Typography>
        <Typography variant="body1" paragraph>
          Nous collectons les informations suivantes lorsque vous utilisez notre site :
        </Typography>
        <Typography variant="body1" paragraph>
          - Informations personnelles (nom, prénom, adresse email, numéro de téléphone)
          <br />
          - Informations de connexion (identifiants, historique de connexion)
          <br />
          - Données de participation aux jeux concours
          <br />
          - Historique des achats et des transactions
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#DDA15E' }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          2. Utilisation des Données
        </Typography>
        <Typography variant="body1" paragraph>
          Nous utilisons vos données personnelles pour :
        </Typography>
        <Typography variant="body1" paragraph>
          - Gérer votre compte et vos commandes
          <br />
          - Vous permettre de participer aux jeux concours
          <br />
          - Vous informer sur nos produits et promotions
          <br />
          - Améliorer nos services et votre expérience utilisateur
          <br />
          - Respecter nos obligations légales et réglementaires
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#DDA15E' }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          3. Protection des Données
        </Typography>
        <Typography variant="body1" paragraph>
          Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction. Ces mesures incluent le chiffrement des données, des pare-feux et des protocoles de sécurité.
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#DDA15E' }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          4. Cookies et Traceurs
        </Typography>
        <Typography variant="body1" paragraph>
          Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil qui nous aident à :
        </Typography>
        <Typography variant="body1" paragraph>
          - Mémoriser vos préférences
          <br />
          - Analyser le trafic du site
          <br />
          - Personnaliser votre expérience
          <br />
          - Sécuriser votre connexion
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#DDA15E' }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          5. Vos Droits
        </Typography>
        <Typography variant="body1" paragraph>
          Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
        </Typography>
        <Typography variant="body1" paragraph>
          - Droit d'accès à vos données
          <br />
          - Droit de rectification des données inexactes
          <br />
          - Droit à l'effacement (droit à l'oubli)
          <br />
          - Droit à la limitation du traitement
          <br />
          - Droit à la portabilité des données
          <br />
          - Droit d'opposition au traitement
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#DDA15E' }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          6. Conservation des Données
        </Typography>
        <Typography variant="body1" paragraph>
          Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, conformément à la législation en vigueur. Au-delà de cette période, vos données sont soit supprimées, soit anonymisées.
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#DDA15E' }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          7. Partage des Données
        </Typography>
        <Typography variant="body1" paragraph>
          Nous ne partageons vos données personnelles qu'avec :
        </Typography>
        <Typography variant="body1" paragraph>
          - Nos employés qui en ont besoin pour leur travail
          <br />
          - Nos prestataires de services sélectionnés
          <br />
          - Les autorités compétentes lorsque la loi l'exige
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#DDA15E' }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          8. Consentement
        </Typography>
        <Typography variant="body1" paragraph>
          En utilisant notre site, vous consentez à notre politique de confidentialité. Vous pouvez retirer votre consentement à tout moment en nous contactant.
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#DDA15E' }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#DDA15E' }}
        >
          9. Modifications
        </Typography>
        <Typography variant="body1" paragraph>
          Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page et, si elles sont significatives, nous vous en informerons directement.
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
          Pour toute question concernant notre politique de confidentialité ou pour exercer vos droits, contactez notre délégué à la protection des données à : 
          <Link href="mailto:dpo@tiptop.fr" sx={{ color: '#DDA15E' }}>dpo@tiptop.fr</Link>.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
