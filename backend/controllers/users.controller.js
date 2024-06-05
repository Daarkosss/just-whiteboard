const User = require("../models/user.model");
const Board = require("../models/board.model"); // Zaimportuj model Board, jeśli chcesz obsługiwać automatyczne usuwanie

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: String(error) });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    if(error.name === "CastError") {
        return res.status(400).json({ message: "Invlaid User ID" });
    }
    res.status(500).json({ message: String(error) });
  }
};

// This is need in scenario when we want to create a new user
const getUserBySSOID = async (req, res) => {
    try {
      const { ssoId } = req.query;
      const user = await User.findOne({ ssoID: ssoId }); // Użyj findOne zamiast findById i szukaj po ssoID
  
      if (!user) {
        return res.status(404).json({ message: "User not found with provided SSO ID" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: String(error) });
    }
};

// TODO: Tworzenie nowego użytkownika przy logowaniu. 
// Ale to po ogarnięciu usuwaniu boardów i privileges przy usuwaniu użytkownika
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: String(error) });
  }
};


const updateUser = async (req, res) => {
  try {
    const { id } = req.query;

    const user = await User.findByIdAndUpdate(id, req.body);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    if(error.name === "CastError") {
        return res.status(400).json({ message: "Invlaid User ID" });
    }
    res.status(500).json({ message: String(error) });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //TODO: Usuń wszystkie tablice przypisane do użytkownika
    

    res.status(200).json({ message: "User and associated boards deleted successfully" });
  } catch (error) {
    console.log(error);
    if(error.name === "CastError") {
        return res.status(400).json({ message: "Invlaid User ID" });
    }
    res.status(500).json({ message: String(error) });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserBySSOID,
};
