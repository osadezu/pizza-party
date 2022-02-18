import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';

import useUser from '../../lib/useUser';
import MemberCard from '../../components/MemberCard';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function Team() {
  const { user } = useUser({ redirectTo: '/?login' });
  const [team, setTeam] = useState({});
  const [members, setMembers] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (!user || !user?.isLoggedIn) {
      return; // Wait for session info
    }

    // Get team details
    (async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `teams/${user.team}`,
          headers: {
            Authorization: `Token ${user.auth_token}`,
          },
        });
        // console.log(response.data);
        if (response.status === 200) {
          if (isMounted) setTeam(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    // Get all members
    // TODO: create Django endpoint for team with populated members to fetch everything in one call
    (async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `members/`,
          headers: {
            Authorization: `Token ${user.auth_token}`,
          },
        });
        // console.log(response.data);
        if (response.status === 200) {
          if (isMounted)
            setMembers(
              response.data.filter((member) => member.team === team.id)
            );
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <>
      <Head>
        <title>PizzaParty - Your Team</title>
      </Head>
      <div className='main-wrapper'>
        <div className='team-side'>
          <h2>{team.name}</h2>
          <h3>{team.blurb}</h3>
          <h4>{team.collab_prompt}</h4>
          <div className='collab'>
            {members.map((member, i) => (
              <div className='collab-entry messy' key={i}>
                {member.collab_answer}
              </div>
            ))}
          </div>
        </div>
        <div className='member-side'>
          {members.map((member, i) => {
            return (
              <MemberCard
                key={i}
                member={member}
                custPrompt={team.custom_prompt}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
