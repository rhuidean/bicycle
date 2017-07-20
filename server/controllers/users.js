var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
	session: function(req,res){
		if(req.session.user_id){
			return res.json({
				status: true,
				user_id: req.session.user_id
			})
		}
		return res.json({status:false});
	},

	index: function(req, res){
		User.find({}, function(err, users){
			if(err){
				return res.json(err);
			}
			return res.json(users);
		})
	},

	create: function(req, res){
		User.create(req.body, function(err, user){
			if(err){
				return res.json(err);
			}
			return res.json(user);
		})
	},

	authenticate: function(req,res){
		// look up the email
		User.find({email:req.body.email},function(err,user){
			if(err){
				return res.json(err);
			}
			//check for null, and authenticate the password 
			if(user && user.authenticate(req.body.password)){
				req.session.user_id = user._id;
				return res.json(user);
			}
			//bad credentials
			return res.json({
				errors: {
					login: {
						message: 'Invalid credentials'
					}
				}
			})
		})
	},

	logout: function(req,res){
		if(req.session.user_id){
			delete req.session.user_id
		}
		return res.json({status: true})
	},

	show: function(req, res){
		User.findById(req.params.id).exec(function(err, user){
			if(err){
				return res.json(err);
			}
			return res.json(user);
		})
	},

}