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
  // const [inviteLink, setInviteLink] = useState('');

  // // Make invite link
  // // TODO: build this on Django model and add "safety" string.
  // useEffect(() => {
  //   let isMounted = true;
  // // Keep from running server-side
  // if (!makingNewTeam && typeof window !== 'undefined') {
  //   // Make invite link
  //   if (isMounted)
  //     setInviteLink(
  //       `${window.location.origin}/?signUp&invite=${formFields.id}`
  //     );
  // }
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
            url: `teams/${user.isAdmin}`,
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
    const data = new FormData(e.target);

    try {
      const res = await axios({
        method: makingNewTeam ? 'post' : 'put',
        url: makingNewTeam ? 'teams/' : `teams/${user.isAdmin}`,
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
        mutateUser({ ...user, isAdmin: res.data.id });
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
      // Make invite link
      // This works in iOS on an https connection
      navigator.clipboard
        .writeText(`${window.location.origin}/?signUp&invite=${formFields.id}`)
        .then(() => setCopied(true));
    }
  }

  if (!user) {
    return <p>Loading user session...</p>;
  }

  return (
    <>
      <Head>
        <title>PizzaParty - Edit Team</title>
      </Head>
      <h3>Enter your team details!</h3>
      <div className='flex flex-col justify-center items-center gap-4'>
        <form
          encType='multipart/form-data'
          onSubmit={handleSubmit}
          className='grid grid-cols-2 gap-4 place-items-end'>
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
            value={formFields.custom_prompt}
            onChange={handleChange}
            maxLength='150'
            required
          />
          <label htmlFor='collab_prompt'>collab prompt:</label>
          <input
            type='text'
            id='collab_prompt'
            name='collab_prompt'
            value={formFields.collab_prompt}
            onChange={handleChange}
            maxLength='150'
            required
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
            <button type='button' onClick={handleCopyLink}>
              {copied ? 'Copied!' : 'Copy Invite Link'}
            </button>
          )}
          <button type='submit'>{makingNewTeam ? 'Go Team!' : 'Save'}</button>
        </form>
      </div>
    </>
  );
}
