import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import sleeveAnimation from './bg.json';
import teaAnimation from './the.json';

import BiryaniImg1 from "/Users/user/Desktop/virtualr-main/src/components/Participation/360.png";
import BiryaniImg2 from "/Users/user/Desktop/virtualr-main/src/components/Participation/39.png";
import BiryaniImg3 from "/Users/user/Desktop/virtualr-main/src/components/Participation/69.png";
import BiryaniImg4 from "/Users/user/Desktop/virtualr-main/src/components/Participation/detox.png";
import BiryaniImg5 from "/Users/user/Desktop/virtualr-main/src/components/Participation/signature.png";
import "/Users/user/Desktop/virtualr-main/src/components/Participation/spin.css";
import { Box, Button, Typography, Container, TextField, Snackbar } from "@mui/material";
import { CheckCircle, ErrorOutline } from "@mui/icons-material";

const ImageList = [
  { id: 1, img: BiryaniImg1 },
  { id: 2, img: BiryaniImg2 },
  { id: 3, img: BiryaniImg3 },
  { id: 4, img: BiryaniImg4 },
  { id: 5, img: BiryaniImg5 },
];
// TODO LE SITE NEST PAS RESPONSIVE
interface ParticipationPage {}

const ParticipationPage: React.FC<ParticipationPage> = () => {
  const [imageId, setImageId] = useState<string>(BiryaniImg1);
  const [code, setCode] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarType, setSnackbarType] = useState<"success" | "error">("success");

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
  }, []);

  const handleSubmitCode = () => {
    if (code.length === 10) {
      setSnackbarMessage("Votre code est validé! Vous avez gagné un lot!");
      setSnackbarType("success");
    } else {
      setSnackbarMessage("Le code saisi n'est pas valide. Veuillez réessayer.");
      setSnackbarType("error");
    }
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "white", position: "relative" }}>
      
      {/* Le bg est lottie à changer ??? */}
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

      {/* Animation de feux d'artifice à gauche et droite */}
      <Box sx={{ position: "absolute", left: 90, bottom: -20, width: "20%", height: "50%" }}>
        <Lottie animationData={teaAnimation} loop={true} />
      </Box>

      {/* Snackbar for feedback */}
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
        <Typography variant="body2" sx={{ display: "inline", marginLeft:16 }}>
          <a href="/" style={{ color: "#DDA15E", textDecoration: "none", marginRight: 16,fontWeight: "bold" }}>ACCEUIL</a>
          <a href="/login" style={{ color: "#DDA15E", textDecoration: "none", marginRight: 16,fontWeight: "bold" }}>CONNEXION</a>
          <a href="#" style={{ color: "#DDA15E", textDecoration: "none", marginRight: 16,fontWeight: "bold" }}>CGU</a>
          <a href="#" style={{ color: "#DDA15E", textDecoration: "none", marginRight: 16,fontWeight: "bold" }}>CGV</a>
          <a href="#" style={{ color: "#DDA15E", textDecoration: "none", marginRight: 16 ,fontWeight: "bold"}}>@TheTipTop</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default ParticipationPage;
