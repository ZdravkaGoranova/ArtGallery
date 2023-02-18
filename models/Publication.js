const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        // minLength: [2, 'Title should be at least two characters!'],
        required: true,

    },
    technique: {
        type: String,
        required: true,
        // minLength: [5, 'Title should be at least two characters!'],

    },
    picture: {
        type: String,
        required: true,
        // minLength: [5, 'Title should be at least two characters!'],

    },
    certificate: {
        type: String,
        enum: {
            values: ['Yes', 'No'],
            message: 'Invalid certificate',
        },
        required: true,


    },

    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

    usersShared: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

    //или
    // buyers: {
    //     type: [mongoose.Types.ObjectId],
    //     default: [],
    //     ref: 'User'
    // },

});


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;