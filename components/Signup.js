import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import useUser from '../lib/useUser';
import user from '../pages/api/user';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function Signup({ hasInvite }) {
  const { mutateUser } = useUser({
    redirectTo: '/team/edit?newTeam',
    redirectIfFound: true,
  });

  const defaultFormFields = {
    email: '',
    password: '',
    re_password: '',
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [passwordMatch, setPasswordMatch] = useState(false);

  function handleChange(e) {
    const newFormFields = { ...formFields, [e.target.id]: e.target.value };
    setFormFields(newFormFields);

    if (e.target.id === 'password' || e.target.id === 're_password') {
      setPasswordMatch(newFormFields.password === newFormFields.re_password);
    }
  }

  async function handleLogin(body) {
    try {
      mutateUser(
        await (
          await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
        ).json()
      );
    } catch (error) {
      // TODO: Handle error
      console.error(error);
    }
  }

  // TODO: Should this call be moved to api/login?
  async function getToken() {
    try {
      const res = await axios({
        method: 'post',
        url: 'token/login/',
        data: {
          email: formFields.email,
          password: formFields.password,
        },
      });
      // console.log(res);
      if (res.status === 200) {
        // TODO: THIS INVITE LINK IMPLEMENTATION IS NOT SECURE!
        // Link must contain a randomized key and the validity must be verified in the backend.
        handleLogin({
          email: formFields.email,
          auth_token: res.data.auth_token,
          // If has invite is undefined, property will be ignored by handleLogin's stringify
          hasInvite: hasInvite,
        });
      }
    } catch (error) {
      // TODO: Handle error
      console.error(error.response.data);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios({
        method: 'post',
        url: 'users/',
        data: {
          email: formFields.email,
          password: formFields.password,
          re_password: formFields.re_password,
        },
      });
      // console.log(res);
      if (res.status === 201) {
        getToken();
      }
    } catch (error) {
      // TODO: Handle error
      console.error(error.response.data);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='login-form'>
      <label htmlFor='email'>email:</label>
      <input
        type='email'
        id='email'
        value={formFields.email}
        onChange={handleChange}
        required
      />
      <label htmlFor='password'>password:</label>
      <input
        type='password'
        id='password'
        value={formFields.password}
        onChange={handleChange}
        minLength='8'
        required
      />
      <label htmlFor='re_password'>confirm password:</label>
      <input
        type='password'
        id='re_password'
        value={formFields.re_password}
        onChange={handleChange}
        minLength='8'
        required
      />
      <button type='submit' disabled={!passwordMatch}>
        Go Team!
      </button>
    </form>
  );
}
