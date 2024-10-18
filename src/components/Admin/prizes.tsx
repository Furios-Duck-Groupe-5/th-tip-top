// PrizeModal.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Backdrop,
  Fade,
  IconButton
} from '@mui/material';
import { FaTrash, FaEdit } from 'react-icons/fa';

const PrizeModal = ({ open, handleClose, prizes, setPrizes, newPrize, setNewPrize, editIndex, setEditIndex }) => {
  const handleAddPrize = () => {
    if (newPrize.name && newPrize.image) {
      if (editIndex !== null) {
        const updatedPrizes = [...prizes];
        updatedPrizes[editIndex] = newPrize;
        setPrizes(updatedPrizes);
      } else {
        setPrizes([...prizes, newPrize]);
      }
      // Ne pas fermer le modal après l'ajout/modification
      setNewPrize({ name: '', image: null }); // Réinitialiser les champs sans fermer le modal
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  const handleEditPrize = (index) => {
    setNewPrize(prizes[index]);
    setEditIndex(index);
  };

  const handleDeletePrize = (index) => {
    const updatedPrizes = prizes.filter((_, i) => i !== index);
    setPrizes(updatedPrizes);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: { xs: '90%', sm: '800px' },
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: '#DDA15E', fontWeight: 'bold' }}>
            Gestion des Lots
          </Typography>
          <input
            type="text"
            placeholder="Nom du Lot"
            value={newPrize.name}
            onChange={(e) => setNewPrize({ ...newPrize, name: e.target.value })}
            style={{ width: '100%', marginBottom: '16px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="file"
            onChange={(e) => setNewPrize({ ...newPrize, image: e.target.files[0] })}
            accept="image/*"
            style={{ marginBottom: '16px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPrize}
            sx={{ backgroundColor: '#DDA15E', '&:hover': { backgroundColor: '#d49a5c' }, mb: 2 }}
          >
            {editIndex !== null ? 'Modifier le Lot' : 'Ajouter un Lot'}
          </Button>

          {/* Table des Lots */}
          <TableContainer sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom du Lot</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prizes.map((prize, index) => (
                  <TableRow key={index}>
                    <TableCell>{prize.name}</TableCell>
                    <TableCell>
                      {prize.image && (
                        <img src={URL.createObjectURL(prize.image)} alt={prize.name} style={{ width: '50px', height: '50px', borderRadius: '4px' }} />
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditPrize(index)}
                      >
                        <FaEdit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeletePrize(index)}
                      >
                        <FaTrash />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PrizeModal;
