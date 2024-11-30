import React, { useState } from "react";
import { Box, Grid, Typography, Link, Divider, Avatar, TextField, Button, IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter, LinkedIn, Pinterest, X } from "@mui/icons-material"; 
import logo from "../assets/thebgbg.png"; 

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    if (!email) {
      setMessage("Veuillez entrer un email valide.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://backend.dsp5-archi-o23-15m-g5.fr/add-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage("Vous êtes bien inscrit à la newsletter !");
        setEmail(""); // Clear input after success
      } else {
        setMessage(data.message || "Une erreur est survenue. Essayez à nouveau.");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription à la newsletter :", error);
      setMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        py: 6,
        bgcolor: "#f5f5f5",
        color: "#333",
        borderTop: "1px solid #ddd",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <Avatar
            src={logo}
            alt="Logo Thé Tip Top"
            sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
          />
          <Typography variant="body1" gutterBottom>
            Thé Tip Top
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Découvrez l'univers des thés d'exception, soigneusement sélectionnés pour une expérience unique.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom textAlign="center">
            Ressources
          </Typography>
          <Divider sx={{ mb: 2, bgcolor: "#bbb" }} />
          <ul style={{ listStyleType: "none", padding: 0, textAlign: "center" }}>
            {["CGU", "Mentions légales", "Politique de confidentialité"].map((text) => (
              <li key={text}>
                <Link
                  href={`/${text.replace(/\s+/g, '-').toLowerCase()}`}
                  color="inherit"
                  underline="hover"
                  sx={{
                    display: "block",
                    py: 0.5,
                    color: "#000000",
                    "&:hover": { color: "#FF8C00" },
                  }}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom textAlign="center">
            Concours de Thé
          </Typography>
          <Divider sx={{ mb: 2, bgcolor: "#bbb" }} />
          <Typography variant="body2" gutterBottom textAlign="center">
            Participez à notre concours de dégustation de thés et tentez de gagner des coffrets exclusifs de nos meilleures sélections !
          </Typography>
          <Link
            href="/concours"
            color="inherit"
            underline="hover"
            sx={{
              color: "#000000",
              "&:hover": { color: "#FF8C00" },
            }}
          >
            En savoir plus et participer
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom textAlign="center">
            Newsletter
          </Typography>
          <Divider sx={{ mb: 2, bgcolor: "#bbb" }} />
          <Typography variant="body2" gutterBottom textAlign="center">
            Inscrivez-vous pour recevoir les dernières actualités et offres spéciales de Thé Tip Top !
          </Typography>
          <TextField
            fullWidth
            placeholder="Entrez votre email"
            size="small"
            value={email}
            onChange={handleEmailChange}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            sx={{ bgcolor: "#DDA15E", "&:hover": { bgcolor: "#cc8d53" } }}
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "En cours..." : "S'inscrire"}
          </Button>
          {message && (
            <Typography
              variant="body2"
              color={message.includes("succès") ? "success.main" : "error.main"}
              align="center"
              sx={{ mt: 2 }}
            >
              {message}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} textAlign="center">
          <Typography variant="h6" gutterBottom>
            Suivez-nous
          </Typography>
          <Divider sx={{ mb: 2, bgcolor: "#bbb" }} />
          <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
              rel="noopener noreferrer"
              sx={{ color: "#3b5998", mx: 1 }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
              rel="noopener noreferrer"
              sx={{ color: "#E4405F", mx: 1 }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              aria-label="Twitter"
              rel="noopener noreferrer"
              sx={{ color: "#1DA1F2", mx: 1 }}
            >
              <X />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, bgcolor: "#bbb" }} />

      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} Thé Tip Top. Tous droits réservés. Rejoignez-nous pour célébrer la passion du thé !
      </Typography>
    </Box>
  );
};

export default Footer;
