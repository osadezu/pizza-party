import { withSessionRoute } from '../../lib/withSession';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

// Stateless session with encrypted cookies:
// https://github.com/vvo/iron-session

export default withSessionRoute(async (req, res) => {
  // This endpoint provides global user session details and sets isLoggedIn: true
  if (req.session.user?.email && req.session.user?.auth_token) {
    let user = req.session.user;

    try {
      const resUser = await axios({
        method: 'get',
        url: 'users/me/',
        headers: {
          Authorization: `Token ${user.auth_token}`,
        },
      });
      // console.log(resUser.data);
      if (resUser.status === 200) {
        // Get team and admin details
        if (resUser.data.admin_teams.length) {
          // User is admin
          const admin_team = resUser.data.admin_teams[0];
          user = {
            ...user,
            isAdmin: true,
            team: admin_team.id,
            teamName: admin_team.name,
          };
        } else if (resUser.data.team) {
          // User has team but is not admin
          user = {
            ...user,
            isAdmin: false,
            teamName: resUser.data.team.name,
          };
        }

        // Get member details
        if (resUser.data.member) {
          const member = resUser.data.member;
          user = {
            ...user,
            isMember: member.id,
            team: member.team,
            avatar: member.avatar,
          };
        } else {
          user = { ...user, isMember: false };
        }
      }
    } catch (error) {
      console.error(error);
    }

    // Save data in session
    req.session.user = user;
    console.log('User session:', req.session);

    // Return session info to useUser
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
      email: '',
      auth_token: '',
    });
  }
});
