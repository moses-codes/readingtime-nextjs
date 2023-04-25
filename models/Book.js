const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true, unique: true },
    isbn: { type: String, required: true },
    page_count: { type: Number, required: true },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;