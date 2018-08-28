const express = require('express');
const db = require('../../db');

const router = express.Router();

/**
 * questions routes
 */
// GET - gets all questions
router.get('/', (req, res) => {
  const query = 'SELECT * FROM questions';
  db.query(query)
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: 'all questions here',
      });
    })
    .catch(err => console.log(err));
});

// GET - gets single question with question id
router.get('/:questionId', (req, res) => {
  res.send({
    message: `Single question here ${req.params.questionId}`,
  });
});

// POST - post/create a new question
router.post('/', (req, res) => {
  res.send({ message: 'question created' });
});

// DELETE - deletes a single question with question id
router.delete('/:questionId', (req, res) => {
  res.send({
    message: `Single question here ${req.params.questionId}`,
  });
});

/**
 * answer routes
 */
// POST - post/create a new answer to a question
router.post('/:questionId/answers', (req, res) => {
  res.send({
    message: 'question created',
  });
});

// PUT - mark an answer as accepted to a question
router.post('/:questionId/answers/answerId', (req, res) => {
  res.send({
    message: 'question created',
  });
});

module.exports = router;
