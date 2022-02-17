import { withSessionRoute } from '../../lib/withSession';

// Stateless session with encrypted cookies:
// https://github.com/vvo/iron-session

export default withSessionRoute(async (req, res) => {
  // This endpoint saves the login req body (user email, auth token) in a session cookie

  // TODO: Move actual api auth_token request here?

  const user = { ...req.body, isLoggedIn: true };
  req.session.user = user;
  await req.session.save();
  console.log('Saved session:', req.session);

  res.json(user);
});
