const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'default.jpg',
    },
    booksRead: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
    }],
    //create booksCurrentlyReading
    //add reading goals to this?
    //where does diary go?
    createdOn: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);