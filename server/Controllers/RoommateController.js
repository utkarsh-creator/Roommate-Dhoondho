import needRoommateModel from "../Models/needRoommate.js";

// Create new Roommate
export const createRoommate = async (req, res) => {
  const id = req.params.userid;
  const { userId } = req.body;
  const newRoommate = new needRoommateModel(req.body);

  try {
    if (id === userId) {
      await newRoommate.save();
      res.status(200).json("Roommate created!");
    } else {
      res.status(403).json("Action forbidden");
    }
  }
  catch (error) {
    res.status(500).json(error);
  } 
};

// Get Roommate

export const getRoommate = async (req, res) => {
  const id = req.params.userid;
  const { userId } = req.body;

  try {
    if (id === userId) {
      const Roommate = await needRoommateModel.find({userId: id});
      res.status(200).json(Roommate);
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all Roommates

export const getAllRoommate = async (req, res) => {

  try {
    const Roommates = await needRoommateModel.find();
    res.status(200).json(Roommates);
  } catch (error) {
    res.status(403).json("Action forbidden 403");
  }
};

// Update a Roommate
export const updateRoommate = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const Roommate = await needRoommateModel.findById(id);
    if (Roommate.userId === userId) {
      await Roommate.updateOne({ $set: req.body });
      res.status(200).json("Roommate Updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a Roommate
export const deleteRoommate = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const Roommate = await needRoommateModel.findById(id);
    if (Roommate.userId === userId) {
      await Roommate.deleteOne();
      res.status(200).json("Roommate deleted successfully");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};