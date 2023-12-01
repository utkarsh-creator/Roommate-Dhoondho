import express from "express";
import { isAdmin } from '../Middlewares/isAdmin.js';
import { dontExecuteAtProduction } from '../Middlewares/dontExecuteAtProduction.js';
import { nameFormat } from "../Middlewares/Format/nameFormat.js";
import { deleteUser, followUser, getAllUser, getUser, getPersonalUser, UnFollowUser, updateUser, updateUserByAdmin, likeRoom, likeRoommate } from "../Controllers/UserController.js";

const router = express.Router();

router.get('/all', dontExecuteAtProduction, getAllUser)
router.get('/:id', getUser)
router.get('/personal/:id', getPersonalUser)
router.put('/:id', nameFormat, updateUser)
router.put('/admin/:id', nameFormat, dontExecuteAtProduction, isAdmin, updateUserByAdmin)
router.delete('/:id', dontExecuteAtProduction, deleteUser)
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', UnFollowUser)
router.put('/:id/likesroom', likeRoom)
router.put('/:id/likesroommate', likeRoommate)
export default router;