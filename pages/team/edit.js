import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

import useUser from '../../lib/useUser';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function TeamEdit() {
  const router = useRouter();
  const { user, mutateUser } = useUser({ redirectTo: '/?login' });

  const [makingNewTeam, setMakingNewTeam] = useState(true);

  const defaultFormFields = {
    name: '',
    blurb: '',
    hero_image: '',
    custom_prompt: '',
    collab_prompt: '',
    link: '',
  };
  const [formFields, setFormFields] = useState(defaultFormFields);

  // // Make invite link
  // const [inviteLink, setInviteLink] = useState('');
  // useEffect(() => {
  //   let isMounted = true;
  //   // Keep from running server-side
  //   if (!makingNewTeam && typeof window !== 'undefined') {
  //     // Make invite link
  //     if (isMounted)
  //       setInviteLink(
  //         `${window.location.origin}/?signUp&invite=${formFields.id}`
  //       );
  //   }
  //   return () => {
  //     isMounted = false;
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formFields]);

  useEffect(() => {
    let isMounted = true;

    if (!user || !user?.isLoggedIn) {
      return; // Wait for session info
    }

    if (user.isAdmin) {
      if (isMounted) setMakingNewTeam(false);
      // Get user's team details
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
            if (isMounted) setFormFields({ ...response.data });
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }
    return () => {
      isMounted = false;
    };
  }, [user]);

  function handleChange(e) {
    let newFormFields;
    if (e.target.id === 'hero_image') {
      newFormFields = { ...formFields, hero_image: e.target.files[0] };
    } else {
      newFormFields = { ...formFields, [e.target.id]: e.target.value };
    }
    // console.log(newFormFields);
    setFormFields(newFormFields);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (user.isDemo) {
      // Demo: redirect without saving
      router.push('/team');
      return null;
    }

    const data = new FormData(e.target);

    try {
      const res = await axios({
        method: makingNewTeam ? 'post' : 'put',
        url: makingNewTeam ? 'teams/' : `teams/${user.team}`,
        data: data,
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Token ${user?.auth_token}`,
        },
      });
      // console.log(res);
      if (res.status === 201) {
        // Created
        // Manually update user session while backend returns
        mutateUser({ ...user, isAdmin: true, team: res.data.id });
        router.push('/member/edit?newMember');
      } else if (res.status === 200) {
        // Updated
        router.push('/team');
      }
    } catch (err) {
      // TODO: Handle error
      console.error(err.response.data);
    }
  }

  // Indicate that url was copied to clipboard
  const [copied, setCopied] = useState(false);
  function handleCopyLink() {
    // Keep from running server-side
    if (!makingNewTeam && typeof window !== 'undefined') {
      // TODO: THIS INVITE LINK IMPLEMENTATION IS NOT SECURE!
      // Link must contain a randomized key and the validity must be verified in the backend.
      // bake link generation inton Django model and add "safety" string.
      if (!user.isDemo) {
        navigator.clipboard
          .writeText(
            `${window.location.origin}/?signUp&invite=${
              formFields.id
            }&teamName=${encodeURIComponent(formFields.name)}`
          )
          .then(() => setCopied(true));
      } else {
        // Copy for demo
        navigator.clipboard
          .writeText(
            `This would typically give you an invite link, but this is just a demo!`
          )
          .then(() => setCopied(true));
      }
    }
  }

  if (!user) {
    return <p>Loading user session...</p>;
  }

  // TODO: Improve the signup logic to avoid double redirect
  if (user?.isLoggedIn && user.hasInvite) {
    router.push('/member/edit?newMember');
  }

  return (
    <>
      <Head>
        <title>PizzaParty - Edit Team</title>
      </Head>
      <div className='main-wrapper details'>
        <h3 className='to-top'>Enter your team details!</h3>

        <form
          encType='multipart/form-data'
          onSubmit={handleSubmit}
          className='details-form'>
          <label htmlFor='name'>team name:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formFields.name}
            onChange={handleChange}
            maxLength='100'
            required
          />
          <label htmlFor='blurb'>blurb:</label>
          <input
            type='text'
            id='blurb'
            name='blurb'
            value={formFields.blurb}
            onChange={handleChange}
            maxLength='280'
          />
          <label htmlFor='custom_prompt'>custom question:</label>
          <input
            type='text'
            id='custom_prompt'
            name='custom_prompt'
            placeholder="for each member's profile"
            value={formFields.custom_prompt}
            onChange={handleChange}
            maxLength='150'
          />
          <label htmlFor='collab_prompt'>collaborative prompt:</label>
          <input
            type='text'
            id='collab_prompt'
            name='collab_prompt'
            placeholder="for your team's rumpus"
            value={formFields.collab_prompt}
            onChange={handleChange}
            maxLength='150'
          />
          {/* <label htmlFor='hero_image'>image:</label>
            <input
              type='file'
              id='hero_image'
              name='hero_image'
              accept='image/png, image/jpeg'
              onChange={handleChange}
            /> */}
          {/* TODO: required_fields Add set of checkboxes to make member fields required */}
          {/* {!makingNewTeam && (
              <>
                <label htmlFor='link'>invite link:</label>
                <input
                  type='text'
                  id='link'
                  name='link'
                  value={inviteLink}
                  // onChange={handleChange}
                  // maxLength='150'
                  readOnly
                />
              </>
            )} */}

          {!makingNewTeam && (
            // Normal button
            <button
              type='button'
              className={user.isDemo ? 'squirmy demo-disable' : 'squirmy'}
              onClick={handleCopyLink}>
              {!user.isDemo
                ? // Normal behavior
                  copied
                  ? 'Copied!'
                  : 'Copy Invite Link'
                : // Demo button
                copied
                ? 'This is just a demo team!'
                : 'Copy Invite Link'}
            </button>
          )}
          <button
            type='submit'
            className={user.isDemo ? 'squirmy demo-disable' : 'squirmy'}>
            {makingNewTeam ? 'Go Team!' : 'Save'}
          </button>
        </form>
      </div>
    </>
  );
}
