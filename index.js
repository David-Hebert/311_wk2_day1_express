const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;

const { users } = require('./state');

app.use(bodyParser.json());

/* BEGIN - create routes here */
app.get('/users', (req, res) => {

  res.json(users)
});

app.post('/users', (req, res) => {
  const newUser = {
    "_id": 6,
    "name": "Bob",
    "occupation": "Builder",
    "avatar": "placeholder.jpg"
  }
  users.push(newUser)
  res.json(users)
});

app.post('/users/', (req, res) => {
  const newUser = {
    _id: users.length + 1,
    name: req.body.name,
    occupation: req.body.occupation
  }

  users.push(newUser);
  res.json(users)
});

app.put('/users/:id/:name', (req, res) => {
  const userId = req.params.id
  const userName = req.params.name
  for (let user of users) {
    if (user._id === parseInt(userId)) {
      user.name = userName;
      res.json(user)
    }
  }
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id
  for (let user of users) {
    if (user._id === parseInt(userId)) {
      user.isActive = false;
      res.send(`deleted user # ${userId}`)
    }
  }
});

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))