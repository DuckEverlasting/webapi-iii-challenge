const express = require('express');

const router = express.Router();

const postDb = require('./postDb.js')

router.get('/', (req, res) => {
  postDb.get()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: "something has gone wrong" }))
});

router.get('/:id', validatePostId, (req, res) => {
  const id = req.params.id;
  postDb.getById(id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: "something has gone wrong" }))
});

router.delete('/:id', validatePostId, (req, res) => {
  const id = req.params.id;
  postDb.remove(id)
    .then(data => res.status(204).json({ message: "post deleted" }))
    .catch(err => res.status(500).json({ message: "something has gone wrong" }))
});

router.put('/:id', validatePostId, (req, res) => {
  const id = req.params.id;
  postDb.update(id)
    .then(data => res.status(200).json({ message: "post updated" }))
    .catch(err => res.status(500).json({ message: "something has gone wrong" }))
});

// custom middleware

function validatePostId(req, res, next) {
  const id = req.params.id;
  postDb.getById(id)
    .then(data => data ? req.post = data : res.status(400).json({ message: "invalid post id" }))
    .catch()
  next();
};

module.exports = router;