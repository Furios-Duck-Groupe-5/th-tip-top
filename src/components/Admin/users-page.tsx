import React, { useState, useEffect } from 'react';
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FaTrash, FaEdit } from 'react-icons/fa';

// Définir l'interface pour un utilisateur
// Définir l'interface pour un utilisateur
interface User {
  id_user: number;
  prenom: string;
  nom: string;
  role_id: number;
  email: string;
  sexe: 'H' | 'F';
  date_de_naissance: string; // Date de naissance sous forme de chaîne
}


// Définir les types pour le composant
const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof User>('nom');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Fonction pour récupérer les utilisateurs depuis l'API
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://pre-prod.dsp5-archi-o23-15m-g5.fr/api/users");
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs.');
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
    

  };
  const getRoleLabel = (role: number): string => {
    switch (role) {
      case 1:
        return 'Client';
      case 2:
        return 'Administrateur';
      case 3:
        return 'Employé';
      default:
        return 'Inconnu'; // Valeur par défaut si le rôle n'est pas reconnu
    }
  };
  // Appel de fetchUsers lors du montage du composant
  useEffect(() => {
    fetchUsers();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  

  // Gestion du tri
  const handleRequestSort = (property: keyof User) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleDeleteUser = async (id_user: number) => {
    try {
      const response = await fetch(`https://pre-prod.dsp5-archi-o23-15m-g5.fr/api/users/${id_user}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        alert('Vous ne pouvez supprimer cet utilisateur, il est déjà inscrit au jeu concours');
        throw new Error('Erreur lors de la suppression de l\'utilisateur.');
      }
      setUsers(users.filter(user => user.id_user !== id_user));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    }
  };


  // Ouvrir le modal pour modifier l'utilisateur
  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setOpen(true);
  };

  // Gérer la fermeture du modal
  const handleClose = () => {
    setOpen(false);
    setCurrentUser(null);
  };

  // Fonction pour gérer les changements dans le formulaire de modification
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (currentUser) {
      setCurrentUser(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleInputChangeSexe = (e: SelectChangeEvent<"H" | "F">) => {
    const { name, value } = e.target;
    if (currentUser) {
      setCurrentUser(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Fonction pour soumettre le formulaire de modification
  const handleSubmit = async () => {
    if (currentUser) {
      try {
        const response = await fetch(`https://pre-prod.dsp5-archi-o23-15m-g5.fr/api/users/${currentUser.id_user}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentUser),
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la mise à jour de l\'utilisateur.');
        }
        setUsers(users.map(user => (user.id_user === currentUser.id_user ? currentUser : user)));
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      }
    }
    handleClose();
  };

  // Filtrer les utilisateurs par terme de recherche
  const filteredUsers = users.filter(user =>
    `${user.prenom} ${user.nom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction pour gérer le changement de page
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Fonction pour gérer le changement de lignes par page
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                  active={orderBy === 'nom'}
                  direction={orderBy === 'nom' ? order : 'asc'}
                  onClick={() => handleRequestSort('nom')}
                >
                  Nom
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'prenom'}
                  direction={orderBy === 'prenom' ? order : 'asc'}
                  onClick={() => handleRequestSort('prenom')}
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
              <TableRow key={user.id_user}>
                <TableCell>{user.nom}</TableCell>
                <TableCell>{user.prenom}</TableCell>
                <TableCell>{getRoleLabel(user.role_id)}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.sexe === 'H' ? 'Masculin' : 'Féminin'}</TableCell>
                <TableCell>{formatDate(user.date_de_naissance)}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditUser(user)}>
                    <FaEdit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteUser(user.id_user)}>
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
              width: { xs: '90%', sm: '400px' }, // Largeur responsive
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
              name="prenom"
              value={currentUser ? currentUser.prenom : ''}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Nom"
              variant="outlined"
              fullWidth
              name="nom"
              value={currentUser ? currentUser.nom : ''}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Rôle"
              variant="outlined"
              fullWidth
              name="role_id"
              value={currentUser ? currentUser.role_id : ''}
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
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Sexe</InputLabel>
              <Select
                label="Sexe"
                name="sexe"  
                value={currentUser ? currentUser.sexe : ''}
                onChange={handleInputChangeSexe}
              >
                <MenuItem value="H">Homme</MenuItem>
                <MenuItem value="F">Femme</MenuItem>
                <MenuItem value="A">Autre</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Date de Naissance"
              variant="outlined"
              fullWidth
              type="date"
              name="date_de_naissance"  
              value={currentUser ? currentUser.date_de_naissance : ''}
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
