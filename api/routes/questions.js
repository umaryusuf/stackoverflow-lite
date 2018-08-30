const express = require('express');
const { client } = require('../../db');

const router = express.Router();

/**
 * questions routes
 */
// GET - gets all questions
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM questions';
  client.query(sql)
    .then((result) => {
      res.status(200).json({
        questions: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.stack,
      });
    });
});

// GET - gets single question with question id
router.get('/:questionId', (req, res) => {
  const sql = 'SELECT * FROM questions WHERE id=$1';
  client.query(sql, [req.params.questionId])
    .then((result) => {
      if (result.rowCount < 1) {
        res.status(404).json({
          error: `No question found with that id: ${req.params.questionId}`,
        });
      } else {
        res.status(200).json({
          question: result.rows[0],
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.stack,
      });
    });
});

// POST - post/create a new question
router.post('/', (req, res) => {
  const { userId, question } = req.body;
  const sql = 'INSERT INTO questions(userId, question) VALUES($1, $2) RETURNING *';
  client.query(sql, [userId, question])
    .then((result) => {
      res.status(200).json({
        question: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.stack,
      });
    });
});

// DELETE - deletes a single question with question id
router.delete('/:questionId', (req, res) => {
  const sql = 'DELETE * FROM questions WHERE id=$1';
  client.query(sql, [req.params.questionId])
    .then(() => {
      res.status(200).json({
        message: 'Question deleted succesfully',
      });
    })
    .catch((err) => {
      res.status(404).json({
        error: err,
      });
    });
  res.send({
    message: `Single question here ${req.params.questionId}`,
  });
});

/**
 * answer routes
 */
// GET - gets all answers to a question
router.get('/:questionId/answers', (req, res) => {
  const { questionId } = req.params;
  const sql = 'SELECT * FROM answers WHERE questionId=$1';
  client.query(sql, [questionId])
    .then((result) => {
      res.status(200).json({
        answers: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.stack,
      });
    });
});

// POST - post/create a new answer to a question
router.post('/:questionId/answers', (req, res) => {
  const { questionId } = req.params;
  const { userId, answer } = req.body;
  const sql = 'INSERT INTO answers(questionId, userId, answer) VALUES($1, $2, $3) RETURNING *';
  client.query(sql, [questionId, userId, answer])
    .then((result) => {
      res.status(200).json({
        answer: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.stack,
      });
    });
});

// PATCH - mark an answer as accepted to a question
router.patch('/:questionId/answers/:answerId', (req, res) => {
  const { questionId, answerId } = req.params;
  const sql = 'UPDATE answers SET prefered=1 WHERE id=$1 AND questionId=$2';
  client.query(sql, [answerId, questionId])
    .then((result) => {
      res.status(200).json({
        message: 'answer updated sucessfully',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.stack,
      });
    });
});

export default router;
