import express from "express";
import { createRoommate, deleteRoommate, getRoommate, getAllRoommate, updateRoommate } from "../Controllers/RoommateController.js";
import { rateLimiter_10min_10req, rateLimiter_10min_100req } from "../Middlewares/rateLimiter.js";
import { isAdmin } from '../Middlewares/isAdmin.js';
import { dontExecuteAtProduction } from '../Middlewares/dontExecuteAtProduction.js';
const router = express.Router()

router.get('/all', rateLimiter_10min_100req, getAllRoommate);
router.post('/:userid', rateLimiter_10min_10req, createRoommate);
router.post('/my/:userid', rateLimiter_10min_100req, getRoommate);
router.put('/:id', isAdmin, dontExecuteAtProduction, rateLimiter_10min_10req, updateRoommate);
router.delete("/:id", rateLimiter_10min_100req, deleteRoommate);

export default router;