import { withSessionRoute } from '../../lib/withSession';

// Stateless session with encrypted cookies:
// https://github.com/vvo/iron-session

export default withSessionRoute(async (req, res) => {
  // This endpoint saves the req body in a session cookie
  console.log(req.session);
  req.session.user = { ...req.body };
  await req.session.save();
  res.status(200).json({ message: 'Logged in.' });
});
