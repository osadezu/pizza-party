import { withSessionRoute } from '../../lib/withSession';

// Stateless session with encrypted cookies:
// https://github.com/vvo/iron-session

export default withSessionRoute(async (req, res) => {
  // This endpoint saves the login req body (user email, auth token) in a session cookie

  // TODO: Move actual api auth_token request here?
  const { email, auth_token, hasInvite } = await req.body;

  try {
    const user = {
      email: email,
      auth_token: auth_token,
      isLoggedIn: true,
      hasInvite: hasInvite,
    };

    req.session.user = user;

    await req.session.save();
    console.log('Saved login session:', req.session);

    // Send response with logged in user
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
