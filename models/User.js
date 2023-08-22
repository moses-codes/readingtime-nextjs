const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    booksReading: [{
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
        google_id: {
            type: String,
        },
        progress: {
            type: Number,
            default: 0,
        },
        // goal: {
        //     type: Number,
        //     default: 0,
        // },
        // replace "goal" with dateOfCompletion
        pageCount: {
            type: Number,
            default: 0,
        },
        lastUpdated: {
            type: Date,
            default: null,
        },
        goalAchievedAt: {
            type: Date,
            default: null,
        },
        dateOfCompletion: {
            type: Date,
            default: null
        }
    }],
    booksCompleted: [{
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

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User