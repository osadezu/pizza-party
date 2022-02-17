import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

import useUser from '../../lib/useUser';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function MemberEdit() {
  const router = useRouter();
  const { user, mutateUser } = useUser();
  const [isNewMember, setIsNewMember] = useState(!user?.isMember);

  const defaultFormFields = {
    team: '',
    first_name: '',
    last_name: '',
    goes_by: '',
    pronouns: '',
    // avatar: null,
    link: '',
    location: '',
    // loc_lat: null,
    // loc_long: null,
    interests: '',
    pets: '',
    custom_answer: '',
    collab_answer: '',
    // reactions_count: null,
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    // Get team details
    if (user) {
      (async () => {
        try {
          const response = await axios({
            method: 'get',
            url: `teams/${user?.isAdmin ?? user?.hasInvite}`,
            headers: {
              Authorization: `Token ${user?.auth_token}`,
            },
          });
          console.log(response.data);
          if (response.status === 200) {
            setTeamData({ ...response.data });
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [user]);

  function handleChange(e) {
    let newFormFields;
    if (e.target.id === 'avatar') {
      newFormFields = { ...formFields, avatar: e.target.files[0] };
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
        method: isNewMember ? 'post' : 'put',
        url: isNewMember ? 'members/' : `members/${user.isAdmin}`,
        data: data,
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Token ${user?.auth_token}`,
        },
      });
      console.log(res);
      if (200 <= res.status && res.status <= 299) {
        router.push('/member');
      }
    } catch (err) {
      // TODO: Handle error
      console.error(err.response.data);
    }
  }

  if (!user?.isAdmin && !user?.hasInvite) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>PizzaParty - Edit Team Member</title>
      </Head>
      <h3>What&#39;s your slice?</h3>
      <div className='flex flex-col justify-center items-center gap-4'>
        <form
          encType='multipart/form-data'
          onSubmit={handleSubmit}
          className='grid grid-cols-2 gap-4 place-items-end'>
          <input
            type='hidden'
            id='team'
            name='team'
            value={user?.isAdmin ?? user?.hasInvite}
            onChange={handleChange}
          />
          <label htmlFor='first_name'>name:</label>
          <input
            type='text'
            id='first_name'
            name='first_name'
            value={formFields.first_name}
            onChange={handleChange}
            maxLength='25'
            required
          />
          <label htmlFor='last_name'>last name:</label>
          <input
            type='text'
            id='last_name'
            name='last_name'
            value={formFields.last_name}
            onChange={handleChange}
            maxLength='25'
          />
          <label htmlFor='goes_by'>a.k.a.:</label>
          <input
            type='text'
            id='goes_by'
            name='goes_by'
            value={formFields.goes_by}
            onChange={handleChange}
            maxLength='25'
          />
          <label htmlFor='pronouns'>pronouns:</label>
          <input
            type='text'
            id='pronouns'
            name='pronouns'
            value={formFields.pronouns}
            onChange={handleChange}
            maxLength='25'
          />
          <label htmlFor='link'>website:</label>
          <input
            type='text'
            id='link'
            name='link'
            value={formFields.link}
            onChange={handleChange}
            maxLength='100'
          />
          {/* TODO: Select from a list */}
          <label htmlFor='location'>location:</label>
          <input
            type='text'
            id='location'
            name='location'
            value={formFields.location}
            onChange={handleChange}
            maxLength='100'
          />
          <label htmlFor='interests'>interests &amp; jams:</label>
          <input
            type='text'
            id='interests'
            name='interests'
            value={formFields.interests}
            onChange={handleChange}
            maxLength='280'
          />
          <label htmlFor='pets'>pets / imaginary friends:</label>
          <input
            type='text'
            id='pets'
            name='pets'
            value={formFields.pets}
            onChange={handleChange}
            maxLength='100'
          />
          {teamData?.custom_question?.length && (
            <>
              <label htmlFor='custom_answer'>{teamData.custom_question}:</label>
              <input
                type='text'
                id='custom_answer'
                name='custom_answer'
                value={formFields.custom_answer}
                onChange={handleChange}
                maxLength='280'
              />
            </>
          )}

          <label htmlFor='collab_answer'>
            {teamData?.custom_prompt ?? 'your thoughts for the team:'}
          </label>
          <input
            type='text'
            id='collab_answer'
            name='collab_answer'
            value={formFields.collab_answer}
            onChange={handleChange}
            maxLength='280'
          />
          <label htmlFor='avatar'>profile image:</label>
          <input
            type='file'
            id='avatar'
            name='avatar'
            accept='image/png, image/jpeg'
            onChange={handleChange}
          />
          <button type='submit' className='col-span-2'>
            {isNewMember ? 'Make me!' : 'Save'}
          </button>
        </form>
      </div>
    </>
  );
}
