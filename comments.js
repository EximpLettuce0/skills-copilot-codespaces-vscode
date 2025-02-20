// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments', function(req, res) {
  fs.readFile(path.join(__dirname, 'comments.json'), function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    }
  });
});

app.post('/comments', function(req, res) {
  fs.readFile(path.join(__dirname, 'comments.json'), function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 4), function(err) {
        if (err) {
          console.log(err);
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(comments, null, 4));
        }
      });
    }
  });
});

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});