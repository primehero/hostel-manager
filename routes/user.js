var routes = require("express").Router();
var User = require("../models/user");
var middleware = require("../krypton/middleware");


// INDEX route
routes.get('/', middleware.isAdmin, function(req, res) {
  User.find({}, (err, foundUsers) => {
    if (err)
      res.json({ error : err });
    res.json({ users : foundUsers });
  });
});

// CREATE route
routes.post('/', middleware.isAdmin, function(req, res) {
  var newUser = new User({ username : req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err)
      res.json({ error : err });
    res.json({ msg : "Created new User: " + user.username });
  });
});

// DELETE route
routes.delete('/:id', middleware.isAdmin, function(req, res) {
  User.findByIdAndRemove(req.params.id, err => {
    if (err)
      res.json({ error : err });
    res.json({ msg : "Removed User!" });
  });
});


module.exports = routes;
