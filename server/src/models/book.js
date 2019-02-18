const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
	title: String,
	author: String,
	illustrator: String,
	description: String,
})

const Book = module.exports = mongoose.model('Book', BookSchema);

