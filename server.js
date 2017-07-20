let express = require('express');
let bp = require('body-parser');
let session = require('express-session');

let app = express();
app.use(session({
	secret: 'mysecret',
	resave: false,
	saveUninitialized: true
}))

app.use(bp.json());
// postman field will be blank

require('./server/config/mongoose');
require('./server/config/routes')(app);

app.listen(8000, function(){
	console.log('listening on port 8000...');
})