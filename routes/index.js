var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var titulos = 'este es mi titulo';

  res.render('index', {titulo:titulos} );

});

module.exports = router;
