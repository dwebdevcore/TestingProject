const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const { User, follows, followers } = require('./models/user.js');

app.use(bodyParser.urlencoded({ extended: false }));

router.post('/api/users', async (req, res) => {
  if(!req.body.name) res.status(400).send('no param name');
  if(!req.body.username) res.status(400).send('no param username');

  let user = null;

  try {
    user = new User(req.body.name, req.body.username);
  }
  catch(err) {
    res.status(400).send(err.message);
    return;
  }

  user.save();

  res.json(user);
});

router.post('/api/users/:user_id/follow/:id', async (req, res) => {
  let user = User.findById(req.params.user_id);
  if(!user) {
    res.status(400).send('user not found');
    return;
  }

  user.follow(req.params.id);
  res.json({ status: true });
});

router.post('/api/users/:user_id/unfollow/:id', async (req, res) => {
  let user = User.findById(req.params.user_id);
  if(!user) {
    res.status(400).send('user not found');
    return;
  }

  user.unfollow(req.params.id);

  res.json({ status: true });
});

router.get('/api/users/:id/followers', async (req, res) => {
  let user = User.findById(req.params.id);
  if(!user) {
    res.status(400).send('user not found');
    return;
  }

  res.json({
    list: user.myFollowers()
  });
});

app.use(router);

app.use(function(req, res, next) {
  res.status(422).send('cannot be performed');
});

app.use(function(err, req, res, next) {
  res.status(500).send('server error');
});

app.listen(8080);

