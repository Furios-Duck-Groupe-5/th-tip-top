import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import sleeveAnimation from './bg.json';
import teaAnimation from './the.json';
import fireWork from './fire-work.json'
import BiryaniImg1 from "../../components/Participation/infusseur.png";
import BiryaniImg2 from "../../components/Participation/39.png";
import BiryaniImg3 from "../../components/Participation/69.png";
import BiryaniImg4 from "../../components/Participation/detox.png";
import BiryaniImg5 from "../../components/Participation/signature.png";
import "../../components/Participation/spin.css";
import { Box, Button, Typography, Container, TextField, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { CheckCircle, ErrorOutline } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ImageList = [
  { id: 1, img: BiryaniImg1 },
  { id: 2, img: BiryaniImg2 },
  { id: 3, img: BiryaniImg3 },
  { id: 4, img: BiryaniImg4 },
  { id: 5, img: BiryaniImg5 },
];

interface ParticipationPage { }

const ParticipationPage: React.FC<ParticipationPage> = () => {
  const [imageId, setImageId] = useState<string>(BiryaniImg1);
  const [code, setCode] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarType, setSnackbarType] = useState<"success" | "error">("success");


  const navigate = useNavigate();

  const handleGoToLots = () => {
    navigate("/lots")
  }
  // État pour le popup
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [lotGagne, setLotGagne] = useState<string>("");

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
  }, []);

  // Fonction pour obtenir l'image en fonction du gain
  const getImageForPrize = (gain: string) => {
    switch (gain) {
      case "infuseur à thé":
        return BiryaniImg1;
      case "boîte de 100g thé détox ou infusion":
        return BiryaniImg4;
      case "boîte de 100g thé signature":
        return BiryaniImg5;
      case "coffret découverte 39€":
        return BiryaniImg2;
      case "coffret découverte 69€":
        return BiryaniImg3;
      default:
        return BiryaniImg1; // Image par défaut au cas où aucun gain ne correspond
    }
  };

  const handleSubmitCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 10) {
      setSnackbarMessage("Le code saisi n'est pas valide. Veuillez réessayer.");
      setSnackbarType("error");
      setOpenSnackbar(true);
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      setSnackbarMessage("Vous devez être connecté pour participer.");
      setSnackbarType("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:4001/participer',
        { code_ticket: code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSnackbarMessage(response.data.message);
        setSnackbarType("success");
        setOpenSnackbar(true);

        // Récupère le gain depuis la réponse du backend et l'affiche dans le popup
        const gain = response.data.gain;
        setLotGagne(gain);

        // Met à jour l'image en fonction du gain
        setImageId(getImageForPrize(gain));

        setOpenPopup(true);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setSnackbarMessage(error.response?.data.message || "Une erreur est survenue. Veuillez réessayer.");
      } else {
        setSnackbarMessage("Une erreur s'est produite lors de la participation.");
      }

      setSnackbarType("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "white", position: "relative" }}>
      {/* Animation Lottie */}
      <Lottie
        animationData={sleeveAnimation}
        loop={true}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      <Container sx={{ paddingBottom: 8, paddingTop: 8, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 4 }}>
          {/* Text Section */}
          <Box
            data-aos="zoom-out"
            data-aos-duration="400"
            data-aos-once="true"
            sx={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: { xs: "center", sm: "left" }, order: { xs: 2, sm: 1 } }}
          >
            <Typography
              variant="h3"
              sx={{
                marginTop: -40,
                fontWeight: "bold",
                backgroundColor: "white",
                color: "#DDA15E",
                display: "inline-block",
                padding: "8px 16px",
                border: "2px solid #DDA15E",
                borderRadius: "20px",
              }}
            >
              Bienvenue au jeu concours The Tip Top
            </Typography>

            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Découvrez quel lot vous avez gagné en entrant votre code de concours ! Ne manquez pas cette chance de profiter de nos offres exclusives et de nos thés raffinés.
            </Typography>

            {/* Code input section */}
            <Box sx={{ marginTop: 4, display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                variant="outlined"
                label="Entrez votre code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                sx={{
                  width: "100%",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: 1,
                }}
                fullWidth
              />
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(to right, #DDA15E, #DDA15E)",
                  "&:hover": { transform: "scale(1.05)" },
                  borderRadius: "20px",
                  boxShadow: 1,
                }}
                onClick={handleSubmitCode}
              >
                Vérifiez votre code
              </Button>
            </Box>
          </Box>

          {/* Image Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              minHeight: { xs: "300px", sm: "450px" },
              order: { xs: 1, sm: 2 },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -100,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#DDA15E",
                border: "2px solid #DDA15E"
              }}
            >
              Lot à gagner!
            </Box>
            <Button
              sx={{
                position: "absolute",
                top: 500,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#DDA15E",
                border: "2px solid #DDA15E",
                "&:hover": {
                  backgroundColor: "#DDA15E",
                  color: "white",
                },
              }}
              onClick={handleGoToLots}
              >
              Détails des lots
            </Button>


            <Box
              sx={{
                width: { xs: "300px", sm: "450px" },
                height: { xs: "300px", sm: "450px" },
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                data-aos="zoom-in"
                data-aos-duration="300"
                data-aos-once="true"
                src={imageId}
                alt="biryani img"
                className="spin"
                style={{
                  width: "100%",
                  transform: "scale(1.25)",
                }}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 2,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                borderRadius: "50px",
                padding: "8px",
              }}
            >
              {ImageList.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    width: "80px",
                    height: "80px",
                    display: "inline-block",
                    borderRadius: "50%",
                    overflow: "hidden",
                    cursor: "pointer",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                  onClick={() => setImageId(item.img)}
                >
                  <img
                    data-aos="zoom-in"
                    data-aos-duration="400"
                    data-aos-once="true"
                    src={item.img}
                    alt="biryani img"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
      {/* Animation de tea d'artifice à gauche et droite */}
      <Box sx={{ position: "absolute", left: 90, bottom: -20, width: "20%", height: "50%" }}>
        <Lottie animationData={teaAnimation} loop={true} />
      </Box>

      {/* Dialog pour afficher le lot gagné */}
      <Dialog
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)", // Ajout d'ombre portée
            backgroundColor: "#f5f5f5", // Couleur de fond plus douce
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: "#DDA15E", // Couleur dorée
            fontSize: "24px",
            textAlign: "center",
            borderBottom: "2px solid #DDA15E", // Bordure sous le titre
            paddingBottom: "16px",
          }}
        >
          Félicitations !
        </DialogTitle>

        <DialogContent
          sx={{
            textAlign: "center",
            paddingTop: "16px",
            paddingBottom: "16px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#333", // Texte en couleur sombre
              fontWeight: "500",
              marginBottom: "16px",
            }}
          >
            Vous avez gagné :
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "#DDA15E", // Couleur dorée pour le texte du lot
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            <strong>{lotGagne}</strong>
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
              minHeight: "200px",
              width: "100%",
              padding: "0 20px",
            }}
          >
            <img
              src={getImageForPrize(lotGagne)} // Utilisation de la fonction pour obtenir l'image du lot
              alt="lot gagné"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                objectFit: "contain",
                borderRadius: "12px", // Bord arrondi pour l'image
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Ombre autour de l'image
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          <Button
            onClick={() => setOpenPopup(false)}
            color="primary"
            sx={{
              backgroundColor: "#DDA15E",
              color: "white",
              fontWeight: "bold",
              borderRadius: "20px",
              padding: "8px 20px",
              "&:hover": {
                backgroundColor: "#c77a3e", // Couleur légèrement plus foncée au survol
              },
            }}
          >
            Fermer
          </Button>
        </DialogActions>
      </Dialog>


      {/* Snackbar pour feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        ContentProps={{
          sx: {
            backgroundColor: snackbarType === "success" ? "#4caf50" : "#f44336",
            color: "white",
          },
        }}
        action={
          snackbarType === "success" ? (
            <CheckCircle sx={{ color: "white", fontSize: 40 }} />
          ) : (
            <ErrorOutline sx={{ color: "white", fontSize: 40 }} />
          )
        }
      />
      {/* Footer */}
      <Box sx={{
        position: "absolute",
        bottom: 20,
        left: 0,
        width: "100%",
        padding: "0 16px",
        display: "flex",
        justifyContent: "flex-start",
        fontSize: "14px",
        color: "white",
      }}>
        <Typography variant="body2" sx={{ display: "inline", marginLeft: 16 }}>
          <a href="/" style={{ color: "#DDA15E", textDecoration: "none", marginRight: 16, fontWeight: "bold" }}>ACCEUIL</a>
          <a href="/login" style={{ color: "#DDA15E", textDecoration: "none", marginRight: 16, fontWeight: "bold" }}>CONNEXION</a>
          <a href="#" style={{ color: "#DDA15E", textDecoration: "none", marginRight: 16, fontWeight: "bold" }}>CGU</a>
          <a href="#" style={{ color: "#DDA15E", textDecoration: "none", marginRight: 16, fontWeight: "bold" }}>CGV</a>
          <a href="#" style={{ color: "#DDA15E", textDecoration: "none", marginRight: 16, fontWeight: "bold" }}>@TheTipTop</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default ParticipationPage;
