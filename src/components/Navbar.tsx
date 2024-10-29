import { FC, useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Box } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import logo from "../assets/The_TIPTOP2-removebg-preview2.png";
import { navItems } from "../constants";
import { Link } from "react-router-dom";
import React from "react";

const Navbar: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Mettre à jour l'état d'authentification en fonction du token
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Retirer le token
    setIsAuthenticated(false); // Mettre à jour l'état d'authentification
    window.location.href = "/"; // Optionnel : redirection après déconnexion
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'rgba(0, 0, 0, 0)', backdropFilter: 'blur(10px)', zIndex: 50 }}>
      <Toolbar sx={{ position: 'relative' }}>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', position: 'relative' }}>
          <Link to="/">
            <img 
              src={logo} 
              alt="Logo" 
              style={{ 
                height: 100, 
                marginRight: 16,
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                left: '75px',
                marginTop:7
              }} 
            />
          </Link>
        </Box>

        <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', marginLeft: 2 }}>
          {navItems.map((item, index) => (
            <Button 
              key={index} 
              component={Link} 
              to={item.href} 
              sx={{ 
                color: 'black', 
                marginX: 1,
                '&:hover': {
                  backgroundColor: '#71C067', // Couleur de fond au hover
                  color: 'white' // Couleur du texte au hover
                }
              }}
            >
              {item.label}
            </Button>
          ))}

          {!isAuthenticated ? (
            <>
              <Button 
                component={Link} 
                to="/login" 
                variant="outlined" 
                sx={{ 
                  color: 'black', 
                  marginX: 1, 
                  borderColor: '#71C067',
                  '&:hover': { 
                    backgroundColor: '#71C067',
                    color: 'white', 
                  }
                }}
              >
                Se connecter
              </Button>

              <Button 
                component={Link} 
                to="/signup" 
                variant="contained" 
                sx={{ backgroundColor: '#DDA15E', marginX: 1 }}
              >
                Créez un compte
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Déconnexion
            </Button>
          )}
        </Box>

        <IconButton 
          edge="end" 
          color="inherit" 
          onClick={toggleMobileMenu} 
          sx={{ 
            display: { lg: 'none' }, 
            color: { xs: '#DDA15E', sm: 'black' }, // Change la couleur de l'icône du menu en mode mobile
          }}
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Toolbar>

      {mobileMenuOpen && (
        <Menu
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={mobileMenuOpen}
          onClose={toggleMobileMenu}
          PaperProps={{
            sx: {
              backgroundColor: { xs: '#DDA15E', sm: '#71C067' }, // Couleur de fond en fonction de la taille de l'écran
              color: 'black',
              width: '100%', // Pour couvrir toute la largeur de l'écran mobile
            },
          }}
        >
          {navItems.map((item, index) => (
            <MenuItem 
              key={index} 
              onClick={toggleMobileMenu} 
              component={Link} 
              to={item.href} 
              sx={{ 
                color: 'white', 
                '&:hover': { 
                  backgroundColor: '#71C067', 
                  color: 'white' 
                } 
              }}
            >
              {item.label}
            </MenuItem>
          ))}
          {!isAuthenticated ? (
            <>
              <MenuItem onClick={toggleMobileMenu} component={Link} to="/login" sx={{ color: 'white' }}>
                Se connecter
              </MenuItem>
              <MenuItem onClick={toggleMobileMenu} component={Link} to="/signup" sx={{ color: 'white' }}>
                Créez un compte
              </MenuItem>
            </>
          ) : (
            <MenuItem onClick={handleLogout} sx={{ color: 'white' }}>
              Déconnexion
            </MenuItem>
          )}
        </Menu>
      )}
    </AppBar>
  );
};

export default Navbar;
