import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

import useUser from '../../lib/useUser';
import MemberCard from '../../components/MemberCard';
import MemberModal from '../../components/MemberModal';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function Team() {
  const router = useRouter();
  const { user } = useUser({ redirectTo: '/?login' });
  const [team, setTeam] = useState();
  const [members, setMembers] = useState();
  const [showMember, setShowMember] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!user || !user?.team) {
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
          /* Extract members from Team info and shuffle the array to display in different order 
          borrowed from this SO: https://stackoverflow.com/a/46545530/1074802 */
          const newMembers = response.data.members
            .map((member) => ({ member, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ member }) => member);
          delete response.data.members;
          const newTeam = response.data;
          if (isMounted) {
            setMembers(newMembers);
            setTeam(newTeam);
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.team]);

  // Catch non-member user
  if (user && user.isMember == false) {
    if (user.hasInvite) {
      // With invite, create member
      router.replace('/member/edit?newMember');
    } else if (!user.isAdmin) {
      // No invite, admin of new team
      router.replace('/team/edit?newTeam');
    }
  }

  if (!team || !members) {
    // Wait while loading team data
    return null;
  }

  return (
    <>
      <Head>
        <title>PizzaParty - Your Team</title>
      </Head>
      <div className='main-wrapper team'>
        <div className='team-side to-top'>
          <h2>{team.name}</h2>
          <h3>{team.blurb}</h3>
          <div className='collab'>
            <h4>{team.collab_prompt}</h4>
            {members.map((member, i) => (
              <div className='collab-entry sketchy' key={i}>
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
                setShowMember={setShowMember}
              />
            );
          })}
        </div>
      </div>
      <div
        id='member-backdrop'
        className={showMember ? '' : 'hidden'}
        onClick={() => setShowMember(false)}></div>
      <div className='member-modal-wrapper'>
        {showMember && (
          <MemberModal
            member={showMember}
            custPrompt={team.custom_prompt}
            setShowMember={setShowMember}
          />
        )}
      </div>
    </>
  );
}
