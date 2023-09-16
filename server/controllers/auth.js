import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);


        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000),
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
        // console.log(req.body);

    }
}

//Logging 

export const login = async (req, res) => {
    try {
        const { email, password } = await req.body;
        // console.log(req.params);
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            delete user.password;
            return res.status(200).json({ msg: "Login successful with ", token, user });
        }
        else return res.status(400).json({ msg: "Wrong Password" });

    } catch (err) {
        res.status(500).json({ error: err.message });
        // console.log(req.body);
    }
}