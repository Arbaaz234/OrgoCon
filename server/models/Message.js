import mongoose from "mongoose";
// import { Message } from '@mui/icons-material';

const msgSchema = new mongoose.Schema({

    message: {
        text: {
            type: String,
            required: true,
        },
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

}, { timestamps: true })

const Message = mongoose.model('Message', msgSchema);
mongoose.set('debug', true);
export default Message;