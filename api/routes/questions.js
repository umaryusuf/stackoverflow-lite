const express = require('express');

const router = express.Router();

/**
 * questions routes
 */
// GET - gets all questions
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'all questions here',
  });
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
