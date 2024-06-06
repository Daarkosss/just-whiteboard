const Privilege = require("../models/privilege.model.js");
const User = require("../models/user.model.js");
const Board = require("../models/board.model.js");

const addPrivilege = async (boardId, userId) => {
  try {
    const newPrivilege = new Privilege({
      boardId,
      userId
    });
    await newPrivilege.save();
    return newPrivilege;
  } catch (error) {
    console.error("Error adding privilege: ", error);
    throw error;
  }
};

const getUserBoardsByPrivileges = async (userId) => {
  try {
    console.log(userId);
    console.log({ userId });
    const privileges = await Privilege.find({ userId }).populate('boardId');
    const boards = privileges.map(priv => priv.boardId);
    const boardsWithDataUrl = await Promise.all(
      boards.map(async (board) => {
        const dataUrl = await generateDataUrl(board);
        return { ...board.toObject(), dataUrl };
      })
    );
    console.log(boardsWithDataUrl);
    return boardsWithDataUrl;
  } catch (error) {
    // console.error("Error in getUserBoardsByPrivileges:", error);
    throw error;  // Rzucenie błędu pozwoli wywołującemu obsłużyć go odpowiednio
  }
};

// Create Privilege
const createPrivilege = async (req, res) => {

  try {
    const { boardID, userID } = req.query;

    if (!boardID || !userID) {
        return res.status(400).json({ message: "Board ID and User ID must be provided" });
    }

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const board = await Board.findById(boardID);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const newPrivilege = new Privilege({
      boardId: boardID,
      userId: userID
    });
    await newPrivilege.save();
    res.status(201).json(newPrivilege);
  } catch (error) {
    console.log(error);
    if(error.name === "CastError") {
        return res.status(400).json({ message: "One or more of the IDs are invalid" });
    }
    res.status(500).json({ message: String(error) });
  }
};

// Read all Privileges
const getAllPrivileges = async (req, res) => {
  try {
    const privileges = await Privilege.find().populate('boardId').populate('userId');
    res.status(200).json(privileges);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: String(error) });
  }
};

const deletePrivilegeForBoardAndUser = async (req, res) => {
  const { boardID, userID } = req.query; 

  try {
    const result = await Privilege.deleteMany({ boardId: boardID, userId: userID });
    if (!result) {
      return res.status(404).json({ message: "Privilege not found or already removed" });
    }
    res.status(200).json({ message: "Privilege removed successfully" });
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid boardID or userID format" });
    }
    res.status(500).json({ message: String(error) });
  }
};

const removePrivilegesByBoardId = async (boardId) => {
  try {
    const result = await Privilege.deleteMany({ boardId });
    return result;
  } catch (error) {
    console.error("Error removing privileges: ", error);
    throw error;
  }
};

const generateDataUrl = async (board) => {
  const fabricCanvas = new fabric.StaticCanvas(null, { width: 400, height: 250 });
  try {
    const objects = await getObjectsByBoardId(board._id);
    console.log(objects); // Dodane logowanie

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
  createPrivilege,
  getAllPrivileges,
  addPrivilege,
  removePrivilegesByBoardId,
  deletePrivilegeForBoardAndUser,
  getUserBoardsByPrivileges
};
