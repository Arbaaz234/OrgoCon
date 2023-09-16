import express from "express";
import { getUser, getUserFriends, addRemoveFriend } from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';
import bodyParser from "body-parser";
import * as path from 'path';
import multer from "multer";
const router = express.Router();
// const userRoute = express();
// userRoute.use(bodyParser.json());
// userRoute.use(bodyParser.urlencoded({ extended: true }));
// userRoute.set('view engine', 'ejs');
// userRoute.set('views', '../views');

// userRoute.use(express.static('../public/assets'));
// const storage=multer.diskStorage({
//     destination:function(req, file,cb){
//         cb(null,path.join(_dirname,'../public/assets'));
//     },
//     filename:function(req,file,cb){
//         const name=Date.now()+'-'+file.originalname;
//         cb(null,name);
//     }
// });
// const upload=multer({storage:storage});
// userRoute.get('/register')


router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
export default router;