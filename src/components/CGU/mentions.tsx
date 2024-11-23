import React from "react";
import { Box, Typography, Container, Divider, Link } from "@mui/material";

const LegalMentions = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5, pb: 5 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Mentions Légales
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          1. Identification de l'éditeur
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Nom de l'entreprise :</strong> Thé Tip Top
          <br />
          <strong>Siège social :</strong> 123 Rue du Thé, 75001 Paris, France
          <br />
          <strong>Numéro de SIRET :</strong> 123 456 789 00010
          <br />
          <strong>Téléphone :</strong> 01 23 45 67 89
          <br />
          <strong>Email :</strong> <Link href="mailto:contact@thetiptop.com">contact@thetiptop.com</Link>
          <br />
          <strong>Site internet :</strong> <Link href="https://www.thetiptop.com" target="_blank" rel="noopener noreferrer">www.thetiptop.com</Link>
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          2. Directeur de publication
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Nom :</strong> Jean Dupont
          <br />
          <strong>Fonction :</strong> Gérant
          <br />
          Le directeur de publication est responsable du contenu éditorial du site et des informations qui y sont publiées.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          3. Hébergement du site
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Nom de l'hébergeur :</strong> Google Cloud Platform
          <br />
          <strong>Adresse :</strong> 1600 Amphitheatre Parkway, Mountain View, CA 94043, États-Unis
          <br />
          Le site est hébergé par Google Cloud Platform, garantissant une sécurité, une rapidité et une disponibilité optimales.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          4. Propriété intellectuelle
        </Typography>
        <Typography variant="body1" paragraph>
          Le contenu du site, y compris, mais sans s'y limiter, les textes, images, logos, et éléments graphiques, est la propriété exclusive de Thé Tip Top et est protégé par les lois sur la propriété intellectuelle.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          5. Données personnelles
        </Typography>
        <Typography variant="body1" paragraph>
          Conformément à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Pour exercer ces droits, vous pouvez nous contacter à l'adresse email suivante : <Link href="mailto:contact@thetiptop.com">contact@thetiptop.com</Link>.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          6. Cookies
        </Typography>
        <Typography variant="body1" paragraph>
          Le site utilise des cookies pour améliorer votre expérience utilisateur. Ces fichiers sont stockés sur votre ordinateur et permettent de personnaliser votre visite. Vous pouvez choisir de désactiver les cookies à tout moment dans les paramètres de votre navigateur. Pour plus d'informations sur notre utilisation des cookies, consultez notre <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          7. Limitations de responsabilité
        </Typography>
        <Typography variant="body1" paragraph>
          Thé Tip Top ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser le site.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          8. Modifications des mentions légales
        </Typography>
        <Typography variant="body1" paragraph>
          Nous nous réservons le droit de modifier ces mentions légales à tout moment. Les modifications seront publiées sur cette page.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          9. Droit applicable
        </Typography>
        <Typography variant="body1" paragraph>
          Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux de Paris seront seuls compétents.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          10. Contact
        </Typography>
        <Typography variant="body1" paragraph>
          Pour toute question, n'hésitez pas à nous contacter par email : <Link href="mailto:contact@thetiptop.com">contact@thetiptop.com</Link>.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          11. Conditions d'utilisation du site
        </Typography>
        <Typography variant="body1" paragraph>
          L'accès et l'utilisation du site sont soumis aux présentes mentions légales. En accédant au site, vous acceptez sans réserve ces conditions.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          12. Responsabilité des utilisateurs
        </Typography>
        <Typography variant="body1" paragraph>
          Les utilisateurs s'engagent à utiliser le site de manière conforme aux lois et règlements en vigueur.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          13. Liens vers d'autres sites
        </Typography>
        <Typography variant="body1" paragraph>
          Le site peut contenir des liens vers d'autres sites internet. Thé Tip Top ne saurait être tenu responsable des contenus de ces sites.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          14. Force majeure
        </Typography>
        <Typography variant="body1" paragraph>
          Thé Tip Top ne pourra être tenu responsable de l'inexécution de ses obligations en cas de force majeure.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          15. Acceptation des mentions légales
        </Typography>
        <Typography variant="body1" paragraph>
          En utilisant ce site, vous reconnaissez avoir pris connaissance des présentes mentions légales et vous vous engagez à les respecter.
        </Typography>
      </Box>
    </Container>
  );
};

export default LegalMentions;
