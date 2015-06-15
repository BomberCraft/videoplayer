var express = require('express');
var router = express.Router();
var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    walk = require('walk');

// http://stackoverflow.com/questions/11181546/how-to-enable-cross-origin-resource-sharing-cors-in-the-express-js-framework-o

// Allow Cross Origing Requests !
router.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    var walker  = walk.walk(path.join(__dirname , '..', 'data'), { followLinks: false });
    var datas = [];

    walker.on('file', function(root, stat, next) {
        var regex = /.*?data(?:[\\/](.*))?/;
        var subst = '$1';

        var url = root.replace(regex, subst) || '';
        var file = { 'url': url, 'name': stat.name, 'size': stat.size };

        datas.push(file);
        next();
    });

    walker.on('end', function() {
        res.json(datas);
    });
});

module.exports = router;
