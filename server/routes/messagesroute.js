import { addMessage, getAllMessage } from "../controllers/messagesController.js";
import { Router } from "express";
const router = Router();

router.post("/addmsg", addMessage);
router.post("/getmsgs", getAllMessage);

export default router;