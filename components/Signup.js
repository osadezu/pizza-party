import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function Signup() {
  const router = useRouter();
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
      {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        console.log('Response from /api/login', response);
        const data = await response.json();
        if (response.ok) {
          console.log('Logged in, redirecting.', data);
          router.push('/team/edit?newTeam=true');
        }
      }
    } catch (error) {
      // TODO: Handle error
      console.error(error);
    }
  }

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
      console.log(res);
      if (res.status === 200) {
        console.log(res.data);
        handleLogin({
          email: formFields.email,
          auth_token: res.data.auth_token,
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
      console.log(res);
      if (res.status === 201) {
        getToken();
      }
    } catch (error) {
      // TODO: Handle error
      console.error(error.response.data);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='grid grid-cols-2 gap-4 place-items-end'>
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
      <button type='submit' className='col-span-2' disabled={!passwordMatch}>
        Go Team!
      </button>
    </form>
  );
}
