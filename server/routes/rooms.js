import express from "express";
import { getRooms, getRoom,createRoom, updateRoom } from "../controllers/rooms.js";
const router = express.Router();

router.get("/", getRooms); // gets all rooms
router.post("/create", createRoom); // create room
router.put("/update/:id", updateRoom); // update room

router.post("/:id", getRoom); // gets a specific room

export default router;
