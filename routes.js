exports = module.exports = function(app){
	app.get('/',require('./views/index').init);

	app.get('/rooms/', require('./views/rooms/index').init);

	app.get('/join/', require('./views/join/index').init);
}
