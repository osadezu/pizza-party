import { withSessionRoute } from '../../lib/withSession';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

// Stateless session with encrypted cookies:
// https://github.com/vvo/iron-session

export default withSessionRoute(async (req, res) => {
  if (req.session.user) {
    // This endpoint returns the session.user object and sets isLoggedIn: true
    // Check if user owns a team
    try {
      const teamsResponse = await axios({
        method: 'get',
        url: 'teams/',
        headers: {
          Authorization: `Token ${req.session.user.auth_token}`,
        },
      });
      // console.log(teamsResponse.data);
      if (teamsResponse.status === 200) {
        const teams = teamsResponse.data.filter(
          (team) => team.admin === req.session.user.email
        );
        if (teams.length) {
          req.session.user = { ...req.session.user, isAdmin: teams[0].id };
        } else {
          req.session.user = { ...req.session.user, isAdmin: false };
        }
      }
    } catch (error) {
      console.error(error);
    }

    // Check if user is member
    try {
      const membersResponse = await axios({
        method: 'get',
        url: 'members/',
        headers: {
          Authorization: `Token ${req.session.user.auth_token}`,
        },
      });
      // console.log(membersResponse.data);
      if (membersResponse.status === 200) {
        const members = membersResponse.data.filter(
          (member) => member.user === req.session.user.email
        );
        if (members.length) {
          req.session.user = { ...req.session.user, isMember: members[0].id };
        } else {
          req.session.user = { ...req.session.user, isMember: false };
        }
      }
    } catch (error) {
      console.error(error.response.data);
    }

    // Save data in session
    await req.session.save();
    console.log('Saved session:', req.session);

    // Return session info to useUser
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
      email: null,
      auth_token: null,
    });
  }
});
