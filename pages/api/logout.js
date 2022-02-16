import { withSessionRoute } from '../../lib/withSession';

// Stateless session with encrypted cookies:
// https://github.com/vvo/iron-session

export default withSessionRoute(async (req, res) => {
  req.session.destroy();
  res.json({ isLoggedIn: false, login: '', avatarUrl: '' });
});
