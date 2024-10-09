const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connecté à MongoDB"))
  .catch(err => {
    console.error("Erreur de connexion:", err);
    process.exit(1); 
  });

app.get("/", (req, res) => {
  res.send("API fonctionne !");
});


const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Une erreur est survenue sur le serveur" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
