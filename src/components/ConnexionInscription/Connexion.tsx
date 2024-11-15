import { FC, useState } from "react";
import { TextField, Button, Typography, Container, Box, Alert } from "@mui/material";
import api from "../../backend/api";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import React from "react";
import { AxiosError } from "axios";

const LoginPage: FC = () => {
    const { login } = useAuth(); // Get the login function from AuthContext
    const [email, setEmail] = useState<string>("");
    const [mot_de_passe, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic form validation
        if (!email || !mot_de_passe) {
            setErrorMessage("Veuillez remplir tous les champs.");
            return;
        }

        setErrorMessage("");

        try {
            // Using the custom api instance here
            const response = await api.post("/login", { email, mot_de_passe });

            if (response.status === 200) {
                console.log("Connexion réussie:", response.data);

                const { token, roleId } = response.data; 
                
                // Save the token to localStorage
                localStorage.setItem("authToken", token); 
                
                // Call the login function from AuthContext
                login(roleId);
                
                // Redirect the user to the home page or dashboard
                navigate('/'); 
            }
        } catch (error: unknown) {
            // Type-casting 'error' as AxiosError
            if (error instanceof AxiosError) {
                // Now we can safely access error.response and other properties
                setErrorMessage(error.response?.data.message || 'Erreur lors de la connexion.');
            } else {
                setErrorMessage('Une erreur inconnue s\'est produite.');
            }
        }
    };

    return (
        <Box 
            sx={{ 
                bgcolor: "#f5f5f5", 
                height: "100vh", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                mt: -10
            }}
        >
            <Container
                component="main"
                maxWidth="xs"
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: -25 }}
            >
                <Box 
                    sx={{ 
                        bgcolor: 'white', 
                        padding: 4, 
                        borderRadius: 2, 
                        boxShadow: 3, 
                        width: '100%',
                        mt: -5
                    }}
                >
                    <Typography component="h1" variant="h5" align="center" gutterBottom>
                        Connexion
                    </Typography>
                    {errorMessage && <Alert severity="error" sx={{ marginBottom: 2 }}>{errorMessage}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ 
                                bgcolor: 'white',   
                                input: { color: 'black' },
                                marginBottom: 2
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Mot de passe"
                            type="password"
                            value={mot_de_passe}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ 
                                bgcolor: 'white',
                                input: { color: 'black' },
                                marginBottom: 2
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ 
                                bgcolor: '#DDA15E', 
                                '&:hover': { bgcolor: '#d19c5c' }, 
                                marginBottom: 2
                            }}
                        >
                            Se connecter
                        </Button>
                    </form>
                    <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                        Vous n'avez pas de compte? <a href="/signup" style={{ color: 'orange' }}>Créer un compte</a>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default LoginPage;
