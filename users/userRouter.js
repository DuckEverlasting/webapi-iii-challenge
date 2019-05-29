const express = require('express');

const router = express.Router();

const userDb = require('./userDb.js')
const postDb = require('../posts/postDb.js')

router.use(express.json())

router.post('/', validateUser, (req, res) => {
  const user = req.body
  userDb.insert(user)
    .then(data => res.status(201).json(user))
    .catch(err => res.status(500).json({ message: "something has gone wrong" }))
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const id = req.params.id
  const post = {
    "user_id": id,
    "text": req.body.text
  }
  postDb.insert(post)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json({ message: "something has gone wrong" }))
});

router.get('/', (req, res) => {
  userDb.get()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: "something has gone wrong" }))
});

router.get('/:id', validateUserId, (req, res) => {
  const id = req.params.id
  userDb.getById(id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: "something has gone wrong" }))
});

router.get('/:id/posts', validateUserId, (req, res) => {
  userDb.getUserPosts(userId)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: "something has gone wrong" }))
});

router.delete('/:id', validateUserId, (req, res) => {
  const id = req.params.id
  userDb.remove(id)
    .then(data => res.status(204).json({ message: "user deleted" }))
    .catch(err => res.status(500).json({ message: "something has gone wrong" }))
});

router.put('/:id', validateUserId, (req, res) => {
  const id = req.params.id
  const changes = req.body
  userDb.update(id, changes)
    .then(data => res.status(200).json({ message: "user updated" }))
    .catch(err => res.status(500).json({ message: "something has gone wrong" }))
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id
  userDb.getById(id)
    .then(data => data ? req.user = data : res.status(400).json({ message: "invalid user id" }))
    .catch()
  next();
};

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" })
  }
  if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" })
  }
  next();
};

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" })
  }
  if (!req.body.text) {
    res.status(400).json({ message: "missing required text data" })
  }
  next();
};

module.exports = router;
