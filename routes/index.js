var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var site_title = ["{{Websockets Game}}", "titulo 2", "titulo 3"];
    res.render('index', {titulo:site_title} );
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
});

module.exports = router;
