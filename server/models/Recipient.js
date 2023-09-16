import mongoose from "mongoose";

const recipientSchema = mongoose.Schema(
    {
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
    bloodgroup:String,
    requires:String,
    condition:String,
    Age:Number,
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,

}, { timestamps: true });


const Recipient = mongoose.model("recipients", recipientSchema);
mongoose.set('debug', true);
export default Recipient;