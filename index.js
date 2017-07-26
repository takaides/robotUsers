const express = require('express');
const mustacheExpress = require('mustache-express');
const data = require('./data.js');
const app = express();
const fs = require('fs');
const users = data.users;

// tell express to use mustache
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// tell express how to serve static files
app.use(express.static('public'));

// configure the / path
app.get('/', function(req, res) {
  res.render('home', {
    users: data.users
  });
});

// configure the /robotName path
app.get('/users/:robotName', function (req, res) {
  let username = req.params.robotName;
  let robot_item = null;

  for (let i = 0; i < data.users.length; i++) {
    let item = data.users[i];
    if (item.username === username) {
      robot_item = item;
    }
  }

  // Return a 404 if the robot does not exist in our array.
  if (robot_item === null) {
    req.status(404).send("Uh, uh, uh. You didn't say the magic word!");
    return;
  }

  res.render('bender', robot_item);
});

// configure the /public path
app.get('/public', function(req, res) {
  fs.readdir('./public', function(err, files) {
    res.render('public', {
      contents: files
    });
  });
});

// make express listen on port 3000
app.listen(3000);
