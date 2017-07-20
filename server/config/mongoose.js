let mongoose = require('mongoose');
let fs = require('fs');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/mean_belt',{useMongoClient: true});

let models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') != -1){
		console.log('loading ' + file + '...');
		require(models_path + '/' + file);
	}
});