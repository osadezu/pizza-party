import { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function useAxios(config) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);

  (async () => {
    try {
      const res = await axios.request(config);
      console.log(res);
      setResponse(res);
    } catch (err) {
      setError(err);
    } finally {
      setloading(false);
    }
  })();

  return { response, error, loading };
}
