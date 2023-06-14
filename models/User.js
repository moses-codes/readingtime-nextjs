const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    clerkId: {
        type: String,
        required: true,
    },
    booksReading: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
    }], booksCompleted: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
    }],
    //create booksCurrentlyReading
    //add reading goals to this?

    createdOn: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);