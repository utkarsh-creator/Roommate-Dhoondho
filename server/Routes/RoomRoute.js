import express from "express";
import { createRoom, deleteRoom, getRoom, getAllRoom, updateRoom } from "../Controllers/RoomController.js";
const router = express.Router()

router.get('/all', getAllRoom);
router.post('/:userid', createRoom);
router.get('/:userid', getRoom);
router.put('/:id', updateRoom);
router.delete("/:id", deleteRoom);

export default router;