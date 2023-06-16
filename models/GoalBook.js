const mongoose = require('mongoose');

const goalBookSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    goal: {
        type: Number,
        default: 0,
    }
});

const GoalBook = mongoose.models.goalBook || mongoose.model('goalBook', goalBookSchema);

module.exports = GoalBook;