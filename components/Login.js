import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import useUser from '../lib/useUser';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function Signup() {
  const router = useRouter();
  const { user, mutateUser } = useUser({
    redirectTo: '/team',
    redirectIfFound: true,
  });

  const defaultFormFields = {
    email: '',
    password: '',
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [formFilled, setFormFilled] = useState(false);

  function handleChange(e) {
    const newFormFields = { ...formFields, [e.target.id]: e.target.value };
    setFormFields(newFormFields);
    setFormFilled(newFormFields.email.length && newFormFields.password.length);
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
    } catch (err) {
      // TODO: Handle error
      console.error(err);
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
        handleLogin({
          email: formFields.email,
          auth_token: res.data.auth_token,
        });
      }
    } catch (err) {
      // TODO: Handle error
      console.error(err.response.data);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    getToken();
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
      <button type='submit' className='col-span-2' disabled={!formFilled}>
        Go Team!
      </button>
    </form>
  );
}
