const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    google_id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    authors: [{ type: String, unique: false }],
    pageCount: { type: Number, required: true },
    cover: { type: String }
});

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

module.exports = Book;