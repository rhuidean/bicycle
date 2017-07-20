let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
	name: {
		type: String,
        required: [true, "Name field cannot be blank."]
	},
	email: {
        type: String,
        required: [true, "Email cannot be blank."],
        unique: [true,"Email is already registered"],
        validate: {
            validator: function(email){
                let re=/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                return (email==null||email.trim().length <1)||re.test(email)
            },
            message: 'Provided mail is invalid.'
        }        
    },

	password: {
        type: String,
        minlength: [4,"password cannot be less than 4 characters"],
        maxlength: [12,"password cannot be mor than 12 characters"],
		required: [true, "Password cannot be blank."]
    }
    
},{timestamps: true});



mongoose.model('User', UserSchema);
