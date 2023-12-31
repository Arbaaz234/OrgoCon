import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        max: 5,
    },
    picturePath: {
        type: String,
        default: "",
    },
    friends: {
        type: Array,
        default: [],
    },
    isRecipient: Boolean,
    requires: String,
    condition: String,
    bloodgroup: String,
    Age: Number,
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,

}, { timestamps: true });

const User = mongoose.model("User", userschema);
mongoose.set('debug', true);
export default User;