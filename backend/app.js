let express = require("express"),
    path = require("path"),
    app = express(),
    router = require('./router'),
    port = 3000,
    bodyParser = require('body-parser');

require('./db');


// Serving static files from dict directory
app.use('/static', express.static(path.join(path.dirname(__dirname), 'dist')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use('/api', router);

// Entry point for index.html
app.get('/*', function(req, res) {
  res.sendFile(path.resolve(path.dirname(__dirname), 'frontend', 'index.html'));
});

module.exports = app.listen(port, function(){
    console.log('Serving...');
});
