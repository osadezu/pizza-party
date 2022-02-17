import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

import useUser from '../../lib/useUser';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function TeamEdit() {
  const router = useRouter();
  const { user, mutateUser } = useUser();
  const { newTeam } = router.query;
  const [isNewTeam, setIsNewTeam] = useState(newTeam === 'true');

  const defaultFormFields = {
    name: '',
    blurb: '',
    hero_image: '',
    custom_prompt: '',
    collab_prompt: '',
  };
  const [formFields, setFormFields] = useState(defaultFormFields);

  useEffect(() => {
    if (user?.isAdmin) {
      setIsNewTeam(false);
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
            setFormFields({ ...response.data });
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }
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
        method: isNewTeam ? 'post' : 'put',
        url: isNewTeam ? 'teams/' : `teams/${user.isAdmin}`,
        data: data,
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Token ${user?.auth_token}`,
        },
      });
      // console.log(res);
      if (res.status === 201) {
        // Created
        router.push('/member?newMember=true');
      } else if (res.status === 200) {
        // Updated
        router.push('/team');
      }
    } catch (err) {
      // TODO: Handle error
      console.error(err.response.data);
    }
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
          />
          <label htmlFor='collab_prompt'>collab prompt:</label>
          <input
            type='text'
            id='collab_prompt'
            name='collab_prompt'
            value={formFields.collab_prompt}
            onChange={handleChange}
            maxLength='150'
          />
          <label htmlFor='hero_image'>image:</label>
          <input
            type='file'
            id='hero_image'
            name='hero_image'
            accept='image/png, image/jpeg'
            onChange={handleChange}
          />
          {/* TODO: required_fields Add set of checkboxes to make member fields required */}
          {/* TODO: link Add field for custom link option */}
          <button type='submit' className='col-span-2'>
            {isNewTeam ? 'Go Team!' : 'Save'}
          </button>
        </form>
      </div>
    </>
  );
}
