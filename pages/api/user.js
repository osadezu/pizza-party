import { withSessionRoute } from '../../lib/withSession';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

// Stateless session with encrypted cookies:
// https://github.com/vvo/iron-session

export default withSessionRoute(async (req, res) => {
  // This endpoint returns the session.user object and sets isLoggedIn: true
  if (req.session.user?.email && req.session.user?.auth_token) {
    let user = req.session.user;

    // TODO: Simplify this logic by making django endpoints
    // which cross - populate users, members and teams!!!
    // Check if user is member
    try {
      const resMembers = await axios({
        method: 'get',
        url: 'members/',
        headers: {
          Authorization: `Token ${user.auth_token}`,
        },
      });
      // console.log(resMembers.data);
      if (resMembers.status === 200) {
        const member = resMembers.data.find(
          (member) => member.user === user.email
        );
        if (member) {
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

    const userTeam = user.team || user.hasInvite || false;

    // Check if user owns a team
    try {
      const resTeams = await axios({
        method: 'get',
        url: 'teams/',
        headers: {
          Authorization: `Token ${user.auth_token}`,
        },
      });
      // console.log(resTeams.data);
      if (resTeams.status === 200) {
        // Check if user is admin
        const team = resTeams.data.find((team) => team.admin === user.email);
        if (team) {
          user = {
            ...user,
            isAdmin: team.id,
            teamName: team.name,
          };
        } else if (userTeam) {
          // User is not admin
          user = { ...user, isAdmin: false };

          // get non-admin member's team
          const team = resTeams.data.find((team) => team.id === userTeam);
          if (team) {
            user = { ...user, teamName: team.name };
          }
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
