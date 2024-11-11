import React from "react";
import Slider from "react-slick";
import { Box, Typography, Avatar } from "@mui/material";
import { testimonials } from "../constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from "react-helmet";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {/* Balises Meta pour le SEO */}
      <Helmet>
        <title>Témoignages Clients - Mon Site</title>
        <meta name="description" content="Découvrez ce que nos clients pensent de nos produits et de leur expérience avec nous. Lisez leurs témoignages inspirants." />
        <meta name="keywords" content="témoignages clients, avis clients, expérience, produits, satisfaction" />
      </Helmet>
      
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            background: "linear-gradient(to right, #ac6434, #DDA15E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Ce que nos clients adorent ❤️
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: "700px", mx: "auto", mb: 6 }}
        >
          Nos clients sont au cœur de tout ce que nous faisons. Découvrez ce qu'ils pensent de nos produits et de leur expérience avec nous.
          Ces témoignages reflètent l'amour et la satisfaction qu'ils ont pour nos sélections de thé uniques.
        </Typography>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <Box key={index} p={2}>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 3,
                  p: 4,
                  borderRadius: 2,
                  textAlign: "left",
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  {testimonial.text}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Avatar
                    src={testimonial.image}
                    alt={testimonial.user}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle1">
                      {testimonial.user}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.company}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default Testimonials;
