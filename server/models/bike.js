let mongoose = require('mongoose');

let BikeSchema = new mongoose.Schema({
	title: {
		type: String,
        required: [true, 'Title cannot be blank.']
	},
	description: {
        type: String,
        required: [true, 'Description cannot be blank.'],
        maxlength: [200,'Description cannot exceed 200 characters.']        
    },

	location: {
        type: String,
		required: [true, "Password cannot be blank."]
    },

    price: [{
        type: Number,
        ref: [1,'Price must be at least $1.00']
    }]
    
},{timestamps: true});

mongoose.model('Bike', BikeSchema);
