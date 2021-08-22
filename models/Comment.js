import mongoose from 'mongoose';

const Comment = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Comment', Comment);
