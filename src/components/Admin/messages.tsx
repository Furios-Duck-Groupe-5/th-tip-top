import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, CircularProgress, Alert, IconButton } from '@mui/material';
import { FaCheckCircle, FaCircle } from 'react-icons/fa'; // Icônes pour "lu" et "non lu"

interface Message {
  id: number;
  content: string;
  sender: string;
  timestamp: string;
  read: boolean;  // Nouveau champ pour marquer si le message est lu ou non
}

const MessagesReceived: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);  // On désactive le chargement pour voir directement les messages par défaut
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simuler la récupération des messages par défaut avec état de lecture
    const defaultMessages = [
      {
        id: 1,
        sender: 'John Doe',
        content: 'Félicitations! Vous avez gagné le grand tirage.',
        timestamp: new Date().toISOString(),
        read: false,  // Message non lu
      },
      {
        id: 2,
        sender: 'Admin',
        content: 'Votre participation a bien été enregistrée.',
        timestamp: new Date().toISOString(),
        read: true,  // Message lu
      },
      {
        id: 3,
        sender: 'Alice',
        content: 'N\'oubliez pas de vérifier vos tickets pour la prochaine loterie.',
        timestamp: new Date().toISOString(),
        read: false,  // Message non lu
      },
    ];

    setMessages(defaultMessages);
    setLoading(false);
  }, []);

  const handleMarkAsRead = (id: number) => {
    // Marquer un message comme lu
    setMessages(prevMessages =>
      prevMessages.map(message =>
        message.id === id ? { ...message, read: true } : message
      )
    );
  };

  return (
    <Box
      sx={{
        p: 4,
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#DDA15E' }}>
        Messages Reçus
      </Typography>

      {loading && <CircularProgress sx={{ display: 'block', margin: 'auto' }} />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && messages.length === 0 && (
        <Typography variant="h6" align="center" sx={{ color: 'gray' }}>
          Aucun message reçu pour le moment.
        </Typography>
      )}

      {!loading && !error && messages.length > 0 && (
        <Paper sx={{ maxWidth: '600px', margin: '0 auto', p: 3 }}>
          <List>
            {messages.map((message) => (
              <ListItem key={message.id} sx={{ bgcolor: message.read ? 'transparent' : '#f0f0f0' }}>
                {/* Icône d'indicateur de lecture */}
                <IconButton onClick={() => handleMarkAsRead(message.id)} sx={{ marginRight: 2 }}>
                  {message.read ? (
                    <FaCheckCircle color="green" />
                  ) : (
                    <FaCircle color="gray" />
                  )}
                </IconButton>

                <ListItemText
                  primary={<Typography variant="body1" sx={{ fontWeight: 'bold' }}>{message.sender}</Typography>}
                  secondary={
                    <>
                      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                        {new Date(message.timestamp).toLocaleString()}
                      </Typography>
                      <Typography variant="body1">{message.content}</Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default MessagesReceived;
