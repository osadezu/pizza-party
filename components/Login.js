import { useState, useEffect } from 'react';
import axios from 'axios';

import useUser from '../lib/useUser';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function Login({ doDemo }) {
  const { mutateUser } = useUser({
    redirectTo: '/team',
    redirectIfFound: true,
  });

  const defaultFormFields = {
    email: '',
    password: '',
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [formFilled, setFormFilled] = useState(false);

  // This implementation of the Demo login is not secure!
  // TODO: improve demo login to function without hardcoded credentials
  useEffect(() => {
    if (doDemo) {
      setFormFields({ email: 'oscar@team.com', password: '1234poiu' });
      setFormFilled(true);
    }
  }, [doDemo]);

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
      console.error(err);
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
      <button type='submit' className='squirmy' disabled={!formFilled}>
        Go Team!
      </button>
    </form>
  );
}
