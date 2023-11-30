import express from "express";
import { getServerMessage, createServerMessage, updateServerMessage, deleteServerMessage} from '../Controllers/ServerMsgController.js';
import { isAdmin } from '../Middlewares/isAdmin.js';

const router = express.Router()

router.get('/:id', getServerMessage);
router.post('/', isAdmin, createServerMessage);
router.put('/:id', isAdmin, updateServerMessage);
router.delete('/:id', isAdmin, deleteServerMessage);

export default router; 