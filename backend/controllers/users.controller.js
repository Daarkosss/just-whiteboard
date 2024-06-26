const User = require("../models/user.model");
const Board = require("../models/board.model");
const {getUserBoardsByPrivileges } = require('./privileges.controller'); 
const {deleteOwnerBoards} = require('./boards.controller.js');
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
    console.log("wchodzę tu");

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

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: String(error) });
  }
};

const findOrCreateUser = async (userData) => {
  try {
    const { sub: ssoID, name, email, picture } = userData;

    let user = await User.findOne({ ssoID });

    if (!user) {
      user = new User({
        ssoID,
        name,
        email,
        picture,
        mouseLeft: 0,
        mouseTop: 0
      });
      await user.save();
    }
    
    return user;
  } catch (error) {
    throw error;
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

    await deleteOwnerBoards(id);

    res.status(200).json({ message: "User and associated boards deleted successfully" });
  } catch (error) {
    console.log(error);
    if(error.name === "CastError") {
        return res.status(400).json({ message: "Invlaid User ID" });
    }
    res.status(500).json({ message: String(error) });
  }
};

const getUsersBoards = async (req, res) => {
  try {
    const { userID } = req.query; // Pobieranie userID z query

    if (!userID) {
      return res.status(400).json({ message: "User ID must be provided" });
    }

    // Znajdowanie tablic, do których użytkownik ma dostęp poprzez uprawnienia
    const boards = await getUserBoardsByPrivileges(userID);

    // if (boards.length === 0) {
    //   return res.status(404).json({ message: "No boards found for this user" });
    // }

    res.status(200).json(boards);
  } catch (error) {
    console.log(error);
    if(error.name === "CastError") {
        return res.status(400).json({ message: "Invalid User ID" });
    }
    res.status(500).json({ message: String(error) });
  }
};

const loginUser = async (req, res) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(' ')[1];
  // console.log("JWT token: ")
  // console.log(accessToken);
  // console.log("...JWT token")

  try {
    // Logika związana z weryfikacją tokena
    const userData = req.user;
    // console.log(userData);
    if (!userData) {
      throw new Error('User data not found');
    }
    const user = await findOrCreateUser(userData);
    
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: String(error) });
  }
};

const joinBoard = async (boardId, userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const board = await Board.findById(boardId);
    if (!board) {
      throw new Error('Board not found');
    }
    
    user.actualBoard = boardId;
    await user.save();

  } catch (error) {
    throw error;
  }
}

const leaveBoard = async (boardId, userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const board = await Board.findById(boardId);
    if (!board) {
      throw new Error('Board not found');
    }
    
    user.actualBoard = null;
    await user.save();

  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserBySSOID,
  findOrCreateUser,
  getUsersBoards,
  loginUser,
  joinBoard,
  leaveBoard
};
