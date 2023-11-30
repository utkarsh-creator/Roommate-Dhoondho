import express from "express";
import { getServerMessage, createServerMessage, updateServerMessage, deleteServerMessage} from '../Controllers/ServerMsgController.js';
import { isAdmin } from '../Middlewares/isAdmin.js';

const router = express.Router()

router.get('/:urlParameter', getServerMessage);
router.post('/', isAdmin, createServerMessage);
router.put('/:urlParameter', isAdmin, updateServerMessage);
router.delete('/:urlParameter', isAdmin, deleteServerMessage);

export default router; 