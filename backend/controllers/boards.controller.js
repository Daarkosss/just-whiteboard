const Board = require("../models/board.model");
const User = require("../models/user.model"); // Zaimportuj model User, jeśli potrzebujemy weryfikować właściciela
const { addPrivilege, removePrivilegesByBoardId, getUserBoardsByPrivileges } = require('./privileges.controller'); // Import funkcji z privileges.controller


const getBoards = async (req, res) => {
  try {
    const boards = await Board.find().populate("owner");
    res.status(200).json(boards);
  } catch (error) {
    console.log(error);
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

    if (boards.length === 0) {
      return res.status(404).json({ message: "No boards found for this user" });
    }

    res.status(200).json(boards);
  } catch (error) {
    console.log(error);
    if(error.name === "CastError") {
        return res.status(400).json({ message: "Invalid User ID" });
    }
    res.status(500).json({ message: String(error) });
  }
};

const getBoard = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "Board ID must be provided" });
    }
    const board = await Board.findById(id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.status(200).json(board);
  } catch (error) {
    console.log(error);
    if(error.name === "CastError") {
        return res.status(400).json({ message: "Invlaid board ID" });
    }
    res.status(500).json({ message: String(error) });
  }
};

const createBoard = async (req, res) => {
  try {
    const { userID } = req.query;
    if (!userID) {
      return res.status(400).json({ message: "User ID must be provided" });
    }
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newBoard = new Board({
      owner: user._id,
      name: req.body.name,
    });
    await newBoard.save();
    
    await addPrivilege(newBoard._id, newBoard.owner);

    res.status(201).json(newBoard);
  } catch (error) {
    if(error.name === "CastError") {
        return res.status(400).json({ message: "Invlaid User ID" });
    }
    console.log(error);
    res.status(500).json({ message: String(error) });
  }
};

const updateBoard = async (req, res) => {
  try {
    const { id, userID } = req.query;
    if (!id) {
      return res.status(400).json({ message: "Board ID must be provided" });
    }
    if (!userID) {
      return res.status(400).json({ message: "User ID must be provided" });
    }

    const board = await Board.findById(id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    if (board.owner.toString() !== userID) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this board" });
    }

    board.name = req.body.name;
    await board.save();
    res.status(200).json(board);
  } catch (error) {
    // console.log(error);
    if(error.name === "CastError") {
        return res.status(400).json({ message: "Invlaid board ID" });
    }

    res.status(500).json({ message: String(error) });
  }
};

const deleteBoard = async (req, res) => {
  try {
    const { id, userID } = req.query;
    if (!id) {
      return res.status(400).json({ message: "Board ID must be provided" });
    }
    if (!userID) {
      return res.status(400).json({ message: "User ID must be provided" });
    }

    
    const board = await Board.findById(id);

    if (board.owner.toString() !== userID) {
      return res
      .status(403)
      .json({ message: "Unauthorized to delete this board" });
    }

    const deletedBoard = await Board.findByIdAndDelete(id);
    
    if (!deletedBoard) {
      return res.status(404).json({ message: "Board not found" });
    }

    await removePrivilegesByBoardId(id);
    
    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    // console.log(error);
    if(error.name === "CastError") {
        return res.status(400).json({ message: "Invlaid board ID" });
    }
    res.status(500).json({ message: String(error) });
  }
};

module.exports = {
  getBoards,
  getUsersBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
};
