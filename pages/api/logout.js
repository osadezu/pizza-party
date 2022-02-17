import { withSessionRoute } from '../../lib/withSession';

// Stateless session with encrypted cookies:
// https://github.com/vvo/iron-session

export default withSessionRoute(async (req, res) => {
  // This endpoint deletes the session cookie, logging the user out
  console.log('Logging out.');
  req.session.destroy();
  res.json({
    isLoggedIn: false,
    email: null,
    auth_token: null,
  });
});
