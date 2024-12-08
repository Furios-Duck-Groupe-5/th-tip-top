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
import { useAuth } from "../ConnexionInscription/AuthContext";
import { Helmet } from "react-helmet";

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
        return BiryaniImg1; // Image par défaut au cas où aucun gain ne correspond (sert à rien xD)
    }
  };
  const { roleId } = useAuth(); // Récupérer roleId depuis le contexte


  const handleSubmitCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (window.gtag) {
      window.gtag('event', 'participation_code_verification', {
        event_category: 'Jeu concours',
        event_label: 'Vérification du code',
        value: 1,
      });
    }
    // Logique principale après validation du roleId

    if (!roleId || ![1, 2, 3].includes(roleId)) {
      setSnackbarMessage("Vous devez être connecté pour participer.");
      setSnackbarType("error");
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000); 
      return;
    }

    if (roleId === 2) {
      setSnackbarMessage("Vous êtes administrateur. Vous n'avez pas le droit de participer.");
      setSnackbarType("error");
      setOpenSnackbar(true);

      // Redirection vers la page d'accueil après un délai de 2 secondes
      setTimeout(() => {
        navigate("/"); 
      }, 2000); 
      return;
    }

    if (roleId === 3) {
      setSnackbarMessage("Vous êtes employé. Vous n'avez pas le droit de participer.");
      setSnackbarType("error");
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/"); 
      }, 2000);
      return;
    }



    // Vérification de la validité du code
    if (code.length !== 10) {
      setSnackbarMessage("Le code saisi n'est pas valide. Veuillez réessayer.");
      setSnackbarType("error");
      setOpenSnackbar(true);
      return;
    }

    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "https://backend.dsp5-archi-o23-15m-g5.fr/participer",
        { code_ticket: code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        if (window.gtag) {
          window.gtag('event', 'valid_code_submission', {
            event_category: 'Jeu concours',
            event_label: 'Code valide',
            value: 1,
          });
        }
        setSnackbarMessage(response.data.message);
        setSnackbarType("success");
        setOpenSnackbar(true);

        const gain = response.data.gain;
        setLotGagne(gain);
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


  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageId((prevImageId) => {
        const currentIndex = ImageList.findIndex((item) => item.img === prevImageId);
        const nextIndex = (currentIndex + 1) % ImageList.length;
        return ImageList[nextIndex].img;
      });
    }, 3000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Helmet>
        <title>Jeu Concours The Tip Top | Participez et Gagnez des Lots</title>
        <meta name="description" content="Participez au jeu concours The Tip Top et gagnez des lots incroyables, dont un an de thé gratuit d'une valeur de 360€. Entrez votre code et découvrez votre lot ,thetiptop , the tip top, jeu concour , concour , jeu concour thetiptop , jeu thetiptop jeu the tip top, concour thetiptop" />
        <meta name="keywords" content="jeu concours, thé, lots, code concours, 360€ de thé gratuit, thé détox, infuseur à thé" />
        <meta property="og:title" content="Jeu Concours The Tip Top | Participez et Gagnez des Lots" />
        <meta property="og:description" content="Participez au jeu concours The Tip Top et gagnez des lots incroyables, dont un an de thé gratuit d'une valeur de 360€. Entrez votre code et découvrez votre lot !" />
        <meta property="og:image" content={BiryaniImg1} />
        <meta property="og:url" content="https://dsp5-archi-o23-15m-g5.fr" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jeu Concours The Tip Top | Participez et Gagnez des Lots" />
        <meta name="twitter:description" content="Participez au jeu concours The Tip Top et gagnez des lots incroyables, dont un an de thé gratuit d'une valeur de 360€. Entrez votre code et découvrez votre lot !" />
        <meta name="twitter:image" content={BiryaniImg1} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Thé Tip Top",
              "url": "https://dsp5-archi-o23-15m-g5.fr/",
              "logo": "https://dsp5-archi-o23-15m-g5.fr/src/assets/The_TIPTOP2-removebg-preview2.png",
              "description": "Participez au concours Thé Tip Top et découvrez des thés uniques.",
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61568576166989",
                "https://www.instagram.com/thetiptop__/"
              ]
            }
          `}
        </script>

      </Helmet>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "white",
          position: "relative",
          backgroundColor: "#e0dad3",
          marginTop: -2,
          overflow: "hidden", 
          "@media (max-width: 600px)": { 
            height: "100vh",
          },
          "@media (min-width: 601px) and (max-width: 960px)": { 
            height: "100vh",
          },
        }}
      >
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
                variant="h5"
                sx={{
                 // marginTop: -25,
                  fontWeight: "bold",
                  backgroundColor: "white",
                  color: "#DDA15E",
                  display: "inline-block",
                  padding: "8px 16px",
                  border: "2px solid #DDA15E",
                  borderRadius: "20px",
                  marginTop: { xs: "-65vh", sm: "-10vh", md: "-25vh" }, 

                }}
              >
                Bienvenue au jeu concours The Tip Top !
              </Typography>

              <Typography variant="body2" sx={{ marginTop: 2, color: '#000000', fontWeight: 'bold' }}>
                Découvrez quel lot vous avez gagné en entrant votre code de concours ! Ne manquez pas cette chance de profiter de nos offres exclusives et de nos thés raffinés.
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 2, fontWeight: 'bold', color: '#DDA15E' }}>
                100% Gagnant, profitez de cette chance !
              </Typography>

              {/* Nouveau texte pour "Venez" et 360 Gain de un an */}
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#000000' }}>
                En participant à ce jeu concours, vous entrez automatiquement dans notre grand tirage au sort pour gagner un an de thé gratuit, d'une valeur de 360€ !
              </Typography>



              {/* Nouvelle section pour la 10ème boutique */}
              <Box sx={{
                backgroundColor: "#fff",
                padding: "10px 20px",
                borderRadius: "12px",
                marginTop: 4,
                textAlign: "center",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
              }}>
                <Typography variant="h6" sx={{ color: "#DDA15E", fontWeight: 'bold' }}>
                  🎉 Nous célébrons la 10ème boutique ! 🎉
                </Typography>
              </Box>

              {/* Code input section */}
              <Box sx={{ marginTop: 4, display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  variant="outlined"
                  label="Entrez votre code"
                  value={code}
                  aria-label="Champ d'entrée pour le code concours"
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

              <Button
                sx={{
                  position: "absolute",
                  top: { xs: "-1vh", sm: "-10vh", md: "-12vh" }, 
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  padding: { xs: "6px 12px", sm: "8px 16px", md: "10px 20px" }, 
                  borderRadius: "20px",
                  fontSize: { xs: "14px", sm: "16px", md: "18px" }, 
                  fontWeight: "bold",
                  color: "#DDA15E",
                  border: "2px solid #DDA15E",
                  "&:hover": {
                    backgroundColor: "#DDA15E",
                    color: "white",
                  },
                  "@media (max-width: 600px)": {
                    top: "750vh",
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
                <Box
                  component="img"
                  data-aos="zoom-in"
                  data-aos-duration="300"
                  data-aos-once="true"
                  src={imageId}
                  alt="biryani img"
                  sx={{
                    width: "100%", 
                    maxWidth: "800px", 
                    height: "auto", 
                    margin: "0 auto", 
                    display: "block", 
                    borderRadius: "10px", 

                    // Média query pour les grands écrans (> 1200px)
                    "@media (min-width: 1200px)": {
                      maxWidth: "900px", // Un peu plus grand sur les grands écrans
                    },
                    "@media (max-width: 600px)": {
                      top: "350px",
                      position:'absolute',
                      height:'75%',
                      width:'75%'
                    },

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
                    margin: "10px",
                    "@media (max-width: 1024px)": {
                      margin: "8px auto", 
                      display: "block",
                    },
                    "@media (max-width: 600px)": {
                     
                      marginBottom:"2700px",
                      display: "block",
                      width: "60px", 
                      height: "60px",
                    },
                  }}
                  onClick={() => setImageId(item.img)}
                >    
                    <Box
  component="img"
  loading="lazy"
  data-aos="zoom-in"
  data-aos-duration="400"
  src={item.img}
  alt="Image Biryani"
  sx={{
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
        <Box sx={{ position: "absolute", left: {xs:-900,md:90}, bottom:{xs:20,md:-20,sm:-20} , width: "20%", height: "50%" }}>
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
           //     display: "flex",
                justifyContent: "center",
                marginTop: "16px",
                minHeight: "200px",
                width: "100%",
                padding: "0 20px",
              }}
            >
              <img
                src={getImageForPrize(lotGagne)} // Utilisation de la fonction pour obtenir l'image du lot
                alt={`Image représentant ${lotGagne} gagné dans le jeu concours`} 
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  objectFit: "contain",
                  borderRadius: "12px", 
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
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
       
      </Box>
    </>
  );
};

export default ParticipationPage;
