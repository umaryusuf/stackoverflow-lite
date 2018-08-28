const passport = require('passport');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });

// importing our routes files
const authRoutes = require('./api/routes/auth');
const questionsRoutes = require('./api/routes/questions');

module.exports = (app) => {
  app.use('/api/v1/auth', authRoutes);
  /**
   * passing requireAuth middleware
   * to protect route from unauthorized users
  */
  app.use('/api/v1/questions', requireAuth, questionsRoutes);
};
