import { FC, useState } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Box } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import logo from "../assets/The_TIPTOP2-removebg-preview2.png";
import { navItems } from "../constants";
import { Link } from "react-router-dom";
import { useAuth } from './ConnexionInscription/AuthContext';
import React from "react";

const Navbar: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { isLoggedIn, logout, roleId } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle error as necessary
    }
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
                marginTop: 7
              }}
            />
          </Link>
        </Box>
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', marginLeft: 2 }}>
          {navItems.map((item, index) => {
            if ((item.label === "Admin" && roleId !== 1) || (item.label === "Gestion de gain" && roleId !== 2)) {
              return null; // Ne pas afficher les éléments si l'utilisateur n'a pas le bon rôle
            }
            return (
              <Button
                key={index}
                component={Link}
                to={item.href}
                sx={{
                  color: 'black',
                  marginX: 1,
                  '&:hover': {
                    backgroundColor: '#71C067',
                    color: 'white'
                  }
                }}
              >
                {item.label}
              </Button>
            );
          })}

          {isLoggedIn ? (
            <>
              {roleId === 2 && (
                <Button
                  component={Link}
                  to="/admin"
                  variant="outlined"
                  sx={{
                    color: 'black',
                    border: 'none',
                    marginX: 1,
                    borderColor: '#71C067',
                    '&:hover': {
                      backgroundColor: '#71C067',
                      color: 'white',
                    }
                  }}
                >
                  Admin
                </Button>
              )}
              {roleId === 3 && (
                <Button
                  component={Link}
                  to="/employee"
                  variant="outlined"
                  sx={{
                    border: 'none',
                    color: 'black',
                    marginX: 1,
                    '&:hover': {
                      backgroundColor: '#71C067',
                      color: 'white',
                    },
                  }}
                >
                  Employee
                </Button>
              )}
              {roleId === 1 && (
                <Button
                  component={Link}
                  to="/gain-historique"
                  variant="outlined"
                  sx={{
                    color: 'black',
                    marginX: 1,
                    border: 'none',
                    '&:hover': {
                      backgroundColor: '#71C067',
                      color: 'white',
                    }
                  }}
                >
                  Historique de gain
                </Button>
              )}
              <Button
                component={Link}
                to="/mon-compte"
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
                Mon Compte
              </Button>
              <Button
                onClick={handleLogout}
                variant="contained"
                sx={{ backgroundColor: '#DDA15E', marginX: 1 }}
              >
                Déconnexion
              </Button>
            </>
          ) : (
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
          )}
        </Box>

        <IconButton
          edge="end"
          color="inherit"
          onClick={toggleMobileMenu}
          sx={{ display: { lg: 'none' }, color: { xs: '#DDA15E', sm: 'black' } }}
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
          PaperProps={{ sx: { backgroundColor: { xs: '#DDA15E', sm: '#71C067' }, color: 'black', width: '100%' } }}
        >
          {navItems.map((item, index) => {
            if ((item.label === "Admin" && roleId !== 1) || (item.label === "Gestion de gain" && roleId !== 2)) {
              return null; // Ne pas afficher les éléments si l'utilisateur n'a pas le bon rôle
            }
            return (
              <MenuItem
                key={index}
                onClick={toggleMobileMenu}
                component={Link}
                to={item.href}
                sx={{ color: 'white', '&:hover': { backgroundColor: '#71C067', color: 'white' } }}
              >
                {item.label}
              </MenuItem>
            );
          })}
          {isLoggedIn ? (
            <>
              <MenuItem onClick={toggleMobileMenu} component={Link} to="/mon-compte" sx={{ color: 'white' }}>
                Mon Compte
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: 'white' }}>
                Déconnexion
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={toggleMobileMenu} component={Link} to="/login" sx={{ color: 'white' }}>
                Se connecter
              </MenuItem>
              <MenuItem onClick={toggleMobileMenu} component={Link} to="/signup" sx={{ color: 'white' }}>
                Créez un compte
              </MenuItem>
            </>
          )}
        </Menu>
      )}
    </AppBar>
  );
};

export default Navbar;
