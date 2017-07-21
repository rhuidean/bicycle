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
    },

    bikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike'
    }]
    
},{timestamps: true});

UserSchema.pre('save', function(next){
	this.password =bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
	next();
});

UserSchema.methods.authenticate = function(password){
	return bcrypt.compareSync(password, this.password);
}

mongoose.model('User', UserSchema);
