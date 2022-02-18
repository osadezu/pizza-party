import { withSessionRoute } from '../../lib/withSession';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

// Stateless session with encrypted cookies:
// https://github.com/vvo/iron-session

export default withSessionRoute(async (req, res) => {
  // TODO: cleanup session data to save only the minimal information
  // The rest of necessary User props can be passed in response without saving in session

  if (req.session.user?.email && req.session.user?.auth_token) {
    // This endpoint returns the session.user object and sets isLoggedIn: true

    // TODO: Simplify this logic by making django endpoints
    // which cross - populate users, members and teams!!!

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
        const member = membersResponse.data.find(
          (member) => member.user === req.session.user.email
        );
        if (member) {
          req.session.user = {
            ...req.session.user,
            isMember: member.id,
            team: member.team,
            avatar: member.avatar,
          };
        } else {
          req.session.user = { ...req.session.user, isMember: false };
        }
      }
    } catch (error) {
      console.error(error);
    }

    const userTeam = req.session.user.hasInvite ?? req.session.user.isMember;

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
        // Check if user is admin
        const team = teamsResponse.data.find(
          (team) => team.admin === req.session.user.email
        );
        if (team) {
          req.session.user = {
            ...req.session.user,
            isAdmin: team.id,
            teamName: team.name,
          };
        } else if (userTeam) {
          // User is not admin
          req.session.user = { ...req.session.user, isAdmin: false };

          // get non-admin member's team
          const team = teamsResponse.data.find((team) => team.id === userTeam);
          if (team) {
            req.session.user = { ...req.session.user, teamName: team.name };
          }
        }
      }
    } catch (error) {
      console.error(error);
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
