import Rooms from "../models/rooms.js";



export const createRoom = async (req, res, next) => {
  const newRoom = new Rooms(req.body);

  try {
    const savedRoom = await newRoom.save();
    
    res.status(200).send("Room has been created.");
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Rooms.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send("Room has been updated.");
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res) => {
  try {
    // retieve all posts we have in the data base
    const rooms = await Rooms.find();

    res.status(200).json(rooms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRoom = async (req, res) => {
  const { id } = req.params;
  const url = id;
  try {
    const room = await Rooms.findOne({ url });
    res.status(200).json(room);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
