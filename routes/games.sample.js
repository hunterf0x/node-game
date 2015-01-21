var express = require('express');
var router = express.Router();
var redis = require('redis');
var qrCode = require('qrcode-npm');
var db =  redis.createClient();
var host = 'IP HOST';


var site_title = '{{Websockets Game}}';


/* GET home page. */
router.get('/', function(req, res) {

    res.render('index', {titulo:site_title} );
});

router.get('/new', function (req, res) {

    var qr = qrCode.qrcode(4, 'M');

    var data = { HOST: 'http://'+host, PORT: '3000',
        gameid: Math.random().toString(36).substring(12)
    }

    qr.addData(data.HOST+":"+data.PORT+"/games/"+data.gameid+"/start");
    qr.make();

    var imag = new String(qr.createImgTag(4));

    // Create the game in DB
    db.sadd('games', data['gameid']);
    res.render('games/new', {data :data, titulo:site_title, marca:imag});
});

router.get('/:gameid/start', function(req, res) {
    data = { gameid: req.params.gameid }
    res.render('games/start', {data:data,titulo:site_title});
});

router.post('/:gameid/join', function (req, res) {
    db.sismember('games', req.params.gameid, function(err, data) {

        // Game Not found
        if (!data) return res.send(404);

        // Strip special characters
        nick = req.body.nick.replace(/\W/g, '')

        db.sismember(req.params.gameid, nick, function(err, data) {
            // Add the new member to the game
            db.sadd(req.params.gameid, nick);
            params = { HOST: 'http://'+host, PORT: '3000',
                gameid: req.params.gameid,
                nick: nick,
                ts: Date.now()
            }
            res.render('games/join', {data:params});
        });
    });
});

module.exports = router;
