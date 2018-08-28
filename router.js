import passport from 'passport';
import passportService from './services/passport';

// importing our routes files
import authRoutes from './api/routes/auth';
import questionsRoutes from './api/routes/questions';

const requireAuth = passport.authenticate('jwt', { session: false });

const router = (app) => {
  app.use('/api/v1/auth', authRoutes);
  /**
   * passing requireAuth middleware
   * to protect route from unauthorized users
  */
  app.use('/api/v1/questions', requireAuth, questionsRoutes);
};

export default router;
