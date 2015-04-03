var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
var Hashids = require("hashids"),
    hashids = new Hashids("this is my salt");

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname, '/public'))

app.get('/', function(req,res){
  res.render('index');
});

// .then


app.post('/results', function(req, res){
  // res.send();

    db.link.create({ url: req.body.url }).then(function(data){
        var hashUrl = hashids.encode(data.id);
      data.hash = hashUrl;
      data.save().done(function(err, data2){
        res.render('./results', { url: hashUrl });
      });
    });
})

app.get('/:id', function(req, res) {
  var dir = parseInt(hashids.decode(req.params.id));
  db.link.find(dir).then(function(data){
    res.redirect(data.url);
    console.log(dir);
  })
});

app.listen(process.env.PORT || 3000, function(){
  console.log('server started on node 3000')
});
















