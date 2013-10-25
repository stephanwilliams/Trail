exports = module.exports = function(app){
	app.get('/',require('./views/index').init);
}
