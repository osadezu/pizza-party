import { withSessionRoute } from '../../lib/withSession';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

// Stateless session with encrypted cookies:
// https://github.com/vvo/iron-session

export default withSessionRoute(async (req, res) => {
  // This endpoint destroys the auth_token and removes the cookie session info

  if (req.session.user?.auth_token) {
    try {
      const res = await axios({
        method: 'post',
        url: 'token/logout/',
        headers: {
          Authorization: `Token ${req.session.user.auth_token}`,
        },
      });
      if (res.status === 204) {
        console.log('Token destroyed.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  req.session.destroy();
  res.json({
    isLoggedIn: false,
    email: '',
    auth_token: '',
  });
});
