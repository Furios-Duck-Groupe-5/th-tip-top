import React from "react";
import { Box, Typography, Container } from "@mui/material";

const LegalMentions = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5, pb: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Mentions Légales
      </Typography>

      <Box>
        <Typography variant="h6" gutterBottom>
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
          <strong>Email :</strong> contact@thetiptop.com
          <br />
          <strong>Site internet :</strong> <a href="https://www.thetiptop.com" target="_blank" rel="noopener noreferrer">www.thetiptop.com</a>
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. Directeur de publication
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Nom :</strong> Jean Dupont
          <br />
          <strong>Fonction :</strong> Gérant
          <br />
          Le directeur de publication est responsable du contenu éditorial du site et des informations qui y sont publiées.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Hébergement du site
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Nom de l'hébergeur :</strong> Google Cloud Platform
          <br />
          <strong>Adresse :</strong> 1600 Amphitheatre Parkway, Mountain View, CA 94043, États-Unis
          <br />
          Le site est hébergé par Google Cloud Platform, garantissant une sécurité, une rapidité et une disponibilité optimales. Les données sont sauvegardées régulièrement et des mesures de sécurité strictes sont mises en place pour protéger les informations des utilisateurs.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Propriété intellectuelle
        </Typography>
        <Typography variant="body1" paragraph>
          Le contenu du site, y compris, mais sans s'y limiter, les textes, images, logos, et éléments graphiques, est la propriété exclusive de Thé Tip Top et est protégé par les lois sur la propriété intellectuelle. Toute reproduction ou représentation, totale ou partielle, est interdite sans autorisation préalable.
          <br />
          Les marques et noms de produits mentionnés sur ce site sont la propriété de leurs titulaires respectifs. Nous respectons les droits de propriété intellectuelle des tiers et nous attendons la même chose de nos utilisateurs.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Données personnelles
        </Typography>
        <Typography variant="body1" paragraph>
          Conformément à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Pour exercer ces droits, vous pouvez nous contacter à l'adresse email suivante : contact@thetiptop.com.
          <br />
          Nous nous engageons à protéger vos données personnelles et à ne les utiliser que dans le cadre de nos activités. Aucune donnée personnelle ne sera vendue ou transférée à des tiers sans votre consentement.
          <br />
          Nous collectons uniquement les informations nécessaires pour vous offrir un service de qualité, notamment pour la gestion des jeux de concours.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Cookies
        </Typography>
        <Typography variant="body1" paragraph>
          Le site utilise des cookies pour améliorer votre expérience utilisateur. Ces fichiers sont stockés sur votre ordinateur et permettent de personnaliser votre visite. Vous pouvez choisir de désactiver les cookies à tout moment dans les paramètres de votre navigateur. Cependant, certaines fonctionnalités du site peuvent ne pas fonctionner correctement sans cookies.
          <br />
          Pour plus d'informations sur notre utilisation des cookies et sur la manière de gérer vos préférences, veuillez consulter notre <a href="/politique-de-confidentialite">politique de confidentialité</a>.
        </Typography>

        <Typography variant="h6" gutterBottom>
          7. Limitations de responsabilité
        </Typography>
        <Typography variant="body1" paragraph>
          Thé Tip Top ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser le site, de la perte de données ou de l'accès non autorisé aux systèmes. Nous nous efforçons de fournir des informations précises et à jour, mais nous ne garantissons pas l'exhaustivité ou l'actualité des informations.
          <br />
          Nous ne saurions être tenus responsables de l'indisponibilité temporaire du site ou de toute autre difficulté technique.
        </Typography>

        <Typography variant="h6" gutterBottom>
          8. Modifications des mentions légales
        </Typography>
        <Typography variant="body1" paragraph>
          Nous nous réservons le droit de modifier ces mentions légales à tout moment. Les modifications seront publiées sur cette page. Nous vous encourageons à consulter régulièrement cette page pour rester informé des changements. Si des modifications substantielles sont apportées, nous nous engageons à informer nos utilisateurs par le biais d'un avis sur notre site.
        </Typography>

        <Typography variant="h6" gutterBottom>
          9. Droit applicable
        </Typography>
        <Typography variant="body1" paragraph>
          Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux de Paris seront seuls compétents. Nous encourageons tous les utilisateurs à nous contacter directement pour toute question ou réclamation avant de faire appel à un arbitrage ou à une action en justice.
        </Typography>

        <Typography variant="h6" gutterBottom>
          10. Contact
        </Typography>
        <Typography variant="body1" paragraph>
          Pour toute question relative aux mentions légales ou pour toute demande d'information, n'hésitez pas à nous contacter par email à l'adresse suivante : <a href="mailto:contact@thetiptop.com">contact@thetiptop.com</a>. Nous nous engageons à répondre à toutes les demandes dans un délai raisonnable.
        </Typography>

        <Typography variant="h6" gutterBottom>
          11. Conditions d'utilisation du site
        </Typography>
        <Typography variant="body1" paragraph>
          L'accès et l'utilisation du site sont soumis aux présentes mentions légales et à la législation en vigueur. En accédant au site, vous acceptez sans réserve ces conditions. Si vous n'acceptez pas ces conditions, vous devez immédiatement cesser d'utiliser le site.
        </Typography>

        <Typography variant="h6" gutterBottom>
          12. Responsabilité des utilisateurs
        </Typography>
        <Typography variant="body1" paragraph>
          Les utilisateurs s'engagent à utiliser le site de manière conforme aux lois et règlements en vigueur. Ils sont responsables de l'utilisation de leur compte et doivent veiller à la confidentialité de leurs informations d'identification. En cas d'utilisation frauduleuse ou non autorisée de leur compte, les utilisateurs doivent en informer immédiatement Thé Tip Top.
        </Typography>

        <Typography variant="h6" gutterBottom>
          13. Liens vers d'autres sites
        </Typography>
        <Typography variant="body1" paragraph>
          Le site peut contenir des liens vers d'autres sites internet. Thé Tip Top ne saurait être tenu responsable des contenus, pratiques ou politiques de confidentialité de ces sites. L'accès à ces sites se fait sous votre propre responsabilité.
        </Typography>

        <Typography variant="h6" gutterBottom>
          14. Force majeure
        </Typography>
        <Typography variant="body1" paragraph>
          Thé Tip Top ne pourra être tenu responsable de l'inexécution de ses obligations en cas de force majeure. Sont considérés comme des cas de force majeure, sans que cette liste soit exhaustive, les événements tels que les grèves, les pandémies, les catastrophes naturelles, les guerres, ou toute autre situation échappant au contrôle raisonnable de Thé Tip Top.
        </Typography>

        <Typography variant="h6" gutterBottom>
          15. Acceptation des mentions légales
        </Typography>
        <Typography variant="body1" paragraph>
          En utilisant ce site, vous reconnaissez avoir pris connaissance des présentes mentions légales et vous vous engagez à les respecter. Si vous ne souhaitez pas être lié par ces mentions légales, vous devez cesser d'utiliser le site immédiatement.
        </Typography>
      </Box>
    </Container>
  );
};

export default LegalMentions;
