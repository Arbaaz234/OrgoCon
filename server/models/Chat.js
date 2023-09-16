import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Chat = mongoose.model('Chat', chatSchema);
mongoose.set('debug', true);
export default Chat;