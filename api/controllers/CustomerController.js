/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	'new': function(req, res) {
		res.view();
	},

	index: function(req, res, next){
		Customer.find(function listCustomer (err, customer){
			if(err) return nexxt(err);
			res.view({
				customer:customer
			});
		});
	},

	create: function(req, res, next) {
		Customer.create(req.params.all(), function customerCreated(err, customer) {
			if(err) return next(err);

			res.redirect('/customer/');
		});
	},

	show: function(req, res, next){
		//Customer.findOne(req.param('id'), function foundCustomer(err, customer){
		Customer.findOne(req.param('id')).populateAll().exec(function(err,customer){
			if(err) return next(err);
			if(!customer) return next();
			res.view({
				customer: customer
			});
		});
	},

	edit: function(req, res, next){
		Customer.findOne(req.param('id'), function(err, customer){
			if(err) return next(err);

			res.view({
				customer: customer
			});
		});
	},

	update: function(req, res, next){
		Customer.update(req.param('id'), req.params.all(), function customerUpdate(err){
			if(err){
				return res.redirect('/customer/edit/'+req.param('id'));
			}
			res.redirect('/customer/show/'+req.param('id'));
		});
	},

	destroy: function(req, res, next){
	    Customer.destroy(req.param('id')).exec(function(){
			res.redirect('/customer/');
		});		
	}

};

