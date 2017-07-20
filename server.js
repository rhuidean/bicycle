let express = require('express');
let bp = require('body-parser');
let session = require('express-session');

let app = express();
app.use(session({
	secret: 'mysecret',
	resave: false,
	saveUninitialized: true
}))

app.listen(8000, function(){
	console.log('listening on port 8000...');
})