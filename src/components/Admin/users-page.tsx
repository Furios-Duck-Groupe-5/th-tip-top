import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TextField,
  Button,
  IconButton,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
import { FaTrash, FaEdit } from 'react-icons/fa';

const UserListPage = () => {
  // Exemple de données d'utilisateurs ç supprimer quand on commence à les lié avec le backend
  const initialUsers = [
    { id: 1, firstName: 'Mohamed', lastName: 'Abbad', role: 'Admin', email: 'mohamed.abbad@example.com', gender: 'Male', dob: '1990-01-01' },
    { id: 2, firstName: 'Azz', lastName: 'Safi', role: 'Admin', email: 'Azz.safi@example.com', gender: 'Female', dob: '1992-02-02' },
    { id: 3, firstName: 'Anas', lastName: 'Atmani', role: 'Client', email: 'anas.atm@example.com', gender: 'Female', dob: '1989-03-03' },
    { id: 4, firstName: 'Zaki', lastName: 'Teff', role: 'EMployee', email: 'zak.tef@example.com', gender: 'Male', dob: '1995-04-04' },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('lastName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false); // État pour le modal
  const [currentUser, setCurrentUser] = useState(null); // État pour l'utilisateur à modifier

  // Gestion du tri
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Fonction pour supprimer un utilisateur
  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Ouvrir le modal pour modifier l'utilisateur
  const handleEditUser = (user) => {
    setCurrentUser(user);
    setOpen(true);
  };

  // Gérer la fermeture du modal
  const handleClose = () => {
    setOpen(false);
    setCurrentUser(null);
  };

  // Fonction pour gérer les changements dans le formulaire de modification
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fonction pour soumettre le formulaire de modification
  const handleSubmit = () => {
    if(currentUser)
    setUsers(users.map(user => (user.id === currentUser.id ? currentUser : user)));
    handleClose();
  };

  // Filtrer les utilisateurs par terme de recherche
  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction pour gérer le changement de page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Fonction pour gérer le changement de lignes par page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Tri des utilisateurs
  const sortedUsers = filteredUsers.sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    if (aValue < bValue) {
      return order === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#DDA15E' }}>
        Liste des Utilisateurs
      </Typography>

      <TextField
        fullWidth
        label="Rechercher un utilisateur"
        variant="outlined"
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'lastName'}
                  direction={orderBy === 'lastName' ? order : 'asc'}
                  onClick={() => handleRequestSort('lastName')}
                >
                  Nom
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'firstName'}
                  direction={orderBy === 'firstName' ? order : 'asc'}
                  onClick={() => handleRequestSort('firstName')}
                >
                  Prénom
                </TableSortLabel>
              </TableCell>
              <TableCell>Rôle</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Sexe</TableCell>
              <TableCell>Date de Naissance</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.dob}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditUser(user)}>
                    <FaEdit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteUser(user.id)}>
                    <FaTrash />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal de modification de l'utilisateur */}
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
              width: { xs: '90%', sm: '400px' }, // Responsive width
              maxHeight: '80vh', // Limite la hauteur
              overflowY: 'auto', // Activer le défilement vertical
              position: 'absolute', // Positionnement absolu
              top: '50%', // Centrage vertical
              left: '50%', // Centrage horizontal
              transform: 'translate(-50%, -50%)', // Centrer
            }}
          >
            <Typography variant="h6" gutterBottom>
              Modifier l'utilisateur
            </Typography>
            <TextField
              label="Prénom"
              variant="outlined"
              fullWidth
              name="firstName"
              value={currentUser ? currentUser.firstName : ''}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Nom"
              variant="outlined"
              fullWidth
              name="lastName"
              value={currentUser ? currentUser.lastName : ''}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Rôle"
              variant="outlined"
              fullWidth
              name="role"
              value={currentUser ? currentUser.role : ''}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              type="email"
              value={currentUser ? currentUser.email : ''}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Sexe"
              variant="outlined"
              fullWidth
              name="gender"
              value={currentUser ? currentUser.gender : ''}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Date de Naissance"
              variant="outlined"
              fullWidth
              type="date"
              name="dob"
              value={currentUser ? currentUser.dob : ''}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button variant="contained" onClick={handleSubmit} fullWidth>
              Enregistrer
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default UserListPage;
