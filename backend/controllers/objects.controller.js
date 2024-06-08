const ObjectModel = require('../models/object.model');

// Create Object
const createObject = async (req, res) => {
  try {
    const newObject = new ObjectModel(req.body);
    await newObject.save();
    res.status(201).json(newObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get All Objects
const getAllObjects = async (req, res) => {
  try {
    const objects = await ObjectModel.find();
    res.status(200).json(objects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get Object by ID
const getObjectById = async (req, res) => {
  try {
    const object = await ObjectModel.findById(req.query.id);
    if (!object) {
      return res.status(404).json({ message: 'Object not found' });
    }
    res.status(200).json(object);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update Object
const updateObject = async (req, res) => {
  try {
    const object = await ObjectModel.findByIdAndUpdate(req.query.id, req.body);
    if (!object) {
      return res.status(404).json({ message: 'Object not found' });
    }
    res.status(200).json(object);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Object
const deleteObject = async (req, res) => {
  try {
    const object = await ObjectModel.findByIdAndDelete(req.query.id);
    if (!object) {
      return res.status(404).json({ message: 'Object not found' });
    }
    res.status(200).json({ message: 'Object deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all Objects by Board ID
const getObjectsByBoardId = async (boardId) => {
  try {
    const objects = await ObjectModel.find({ boardId });
    return objects;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Update Objects by Board ID
const updateObjectsByBoardId = async (boardId, objects) => {
  try {
    await ObjectModel.deleteMany({ boardId });
    const newObjects = objects.map(object => ({ ...object, boardId }));
    console.log(newObjects.length);
    await ObjectModel.insertMany(newObjects);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteObjectsByBoardId = async (boardId) => {
    try {
      const objects = await ObjectModel.deleteMany({ boardId });
      return objects;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

module.exports = {
  createObject,
  getAllObjects,
  getObjectById,
  updateObject,
  deleteObject,
  getObjectsByBoardId,
  deleteObjectsByBoardId,
  updateObjectsByBoardId
};
