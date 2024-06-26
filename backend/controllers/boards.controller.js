const Board = require("../models/board.model");
const User = require("../models/user.model"); // Zaimportuj model User, jeśli potrzebujemy weryfikować właściciela
const { addPrivilege, removePrivilegesByBoardId, getUserBoardsByPrivileges } = require('./privileges.controller'); // Import funkcji z privileges.controller
const { getObjectsByBoardId, updateObjectsByBoardId, deleteObjectsByBoardId } = require('./objects.controller.js');
const fabric = require('fabric').fabric;

const getBoards = async (req, res) => {
  try {
    const boards = await Board.find().populate("owner");
    const boardsWithDataUrl = await Promise.all(
      boards.map(async (board) => {
        const dataUrl = await generateDataUrl(board);
        return { ...board.toObject(), dataUrl };
      })
    );

    res.status(200).json(boardsWithDataUrl);
  } catch (error) {
    console.log(error);
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
    const dataUrl = await generateDataUrl(board)
    board.dataUrl = dataUrl;
    board.save();
    res.status(200).json(board);
  } catch (error) {
    console.log(error);
    if(error.name === "CastError") {
        return res.status(400).json({ message: "Invalid board ID" });
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
    newBoard.dataUrl = await generateDataUrl(newBoard);
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
    await deleteObjectsByBoardId(id);
    
    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    // console.log(error);
    if(error.name === "CastError") {
        return res.status(400).json({ message: "Invlaid board ID" });
    }
    res.status(500).json({ message: String(error) });
  }
};

const getBoardObjects = async (req, res) => {
  try {
    const { id: boardID, userID } = req.query;

    if (!boardID) {
      return res.status(400).json({ message: "Board ID must be provided" });
    }
    if (!userID) {
      return res.status(400).json({ message: "User ID must be provided" });
    }

    const boards = await getUserBoardsByPrivileges(userID);
    if (!boards.some(board => board._id.toString() === boardID)) {
      addPrivilege(boardID, userID);
    }

    const board = await Board.findById(boardID).populate('owner');
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const objects = await getObjectsByBoardId(boardID);
    // if (objects.length === 0) {
    //   return res.status(404).json({ message: 'No objects found for this board' });
    // }

    const response = {
      board,
      objects,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: String(error) });
  }
}

const deleteOwnerBoards = async (userID) => {
  try {
    const boards = await Board.find({ owner: userID });
    if (boards.length === 0) {
      return;
    }
    for (const board of boards) {
      await removePrivilegesByBoardId(board._id);
      await deleteObjectsByBoardId(board._id);
      await Board.findByIdAndDelete(board._id);
    }
  } catch (error) {
    throw error;
  }
};

const generateDataUrl = async (board) => {
  const fabricCanvas = new fabric.StaticCanvas(null, { width: 400, height: 250 });
  try {
    const objects = await getObjectsByBoardId(board._id);

    for (const object of objects) {
      const fabricObject = new fabric[object.type](object);
      fabricCanvas.add(fabricObject);
    }

    fabricCanvas.renderAll();
    const dataUrl = fabricCanvas.toDataURL();

    return dataUrl;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  getBoardObjects,
  generateDataUrl,
  deleteOwnerBoards
};
