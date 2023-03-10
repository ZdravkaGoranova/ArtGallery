const mongoose = require('mongoose');


const userShema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Username is required!'],
       // minLength: 4, 
    },

    password: {
        type: String,
        required: [true, 'Password is required!'],
       // minLength: 3,
    },
    address: {
        type: String,
        //minLength: 10, 

        required: [true, 'address is required!'],

    },

    myPublications: [{
        type: mongoose.Types.ObjectId,
        ref: 'Publication',
    }],
 
});

//userShema.virtual('confirmPassword').set;

const User = mongoose.model('User', userShema);

module.exports = User;



  // }, {
    //     virtuals: {
    //         confirmPassword: {
    //             set(value) {
    //                 if (this.password !== value) {
    //                     throw new mongoose.Error('Password missmatch!');
    //                 }
    //             }
    //         }
    //     }

//});

//userShema.virtual('confirmPassword').set;