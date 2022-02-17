import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function Signup() {
  const router = useRouter();
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
          router.push('/team');
        }
      }
    } catch (err) {
      // TODO: Handle error
      console.error(err);
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
      <button type='submit' className='col-span-2' disabled={!formFilled}>
        Go Team!
      </button>
    </form>
  );
}
