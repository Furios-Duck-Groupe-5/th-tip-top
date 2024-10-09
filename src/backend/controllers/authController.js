const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 

const register = async (req, res) => {
  const { firstName, lastName, dateOfBirth, phoneNumber, gender, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "L'email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      gender,
      email,
      password: hashedPassword, 
    });

    await user.save();

    
    res.status(201).json({
      message: "Utilisateur créé avec succès.",
      redirectTo: "/login",  
    });
  } catch (error) {
    console.error("Erreur d'inscription:", error);
    res.status(500).json({ message: "Erreur du serveur." });
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;
  
    console.log("Tentative de connexion avec l'email :", email); 
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        console.log("Utilisateur non trouvé:", email);
        return res.status(404).json({ message: "Créer un compte chez nous." });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log("Mot de passe incorrect pour l'utilisateur:", email);
        return res.status(400).json({ message: "Mot de passe incorrect." });
      }
  
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      console.log("Connexion réussie pour l'utilisateur:", email); 
  
      res.status(200).json({
        message: "Connexion réussie.",
        token, 
        user: {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Erreur de connexion:", error);
      res.status(500).json({ message: "Erreur du serveur." });
    }
  };
  

module.exports = { register, login };
