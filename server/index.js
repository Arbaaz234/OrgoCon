import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from './routes/auth.js';
import userRoutes from "./routes/users.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/post.js";
import postRoutes from "./routes/post.js";
import User from './models/User.js';
import Post from './models/Post.js';
import Recipient from './models/Recipient.js'
import { users, posts } from './data/index.js';
import { Socket } from 'socket.io';
import { createServer } from 'http';
import messagesroute from "./routes/messagesroute.js";
// import { server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

//routes=files

app.post("/auth/register", upload.single("picture"), register)
// app.post("/auth/registerR", upload.single("picture"), registerR)

app.post("/post", verifyToken, upload.single("picture"), createPost)
//routes without fikes

app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use("/posts", postRoutes);

app.use("/chats", messagesroute);

//Mongoose setup
let server;
const port = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    server = app.listen(port, () => console.log(`Server Port: ${port}`));
    const io = Socket(server, {
        cors: {
            origin: "http://localhost:3001",
            credentials: true,
            methods: ["GET", "POST"]
        },
    });
    global.onlineUsers = new Map();
    io.on("connection", (socket) => {
        console.log(socket);
        global.chatSocket = socket;
        socket.on("add-user", (userId) => {
            onlineUsers.set(userId, socket.id);
        })
        socket.on("send-msg", (msg) => {
            const sendUserSocket = onlineUsers.get(msg.toString());
            if (sendUserSocket) {
                socket.to(sendUserSocket).emit("message-recieve", data.msg);
            }
        })


    })
    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((error) => console.log(`did not connect to ${port} with ${error.message}`));

