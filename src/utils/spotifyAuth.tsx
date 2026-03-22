import axios from 'axios';

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

export function Authorization(): Promise<string> {
  const data = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: client_id || '',
    client_secret: client_secret || '',
  });

  return axios
    .post('https://accounts.spotify.com/api/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(function (response) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem(
        'token_expires_at',
        String(Date.now() + response.data.expires_in * 1000 - 60000)
      );
      return response.data.access_token;
    });
}

export async function getValidToken(): Promise<string> {
  const token = localStorage.getItem('token');
  const expiresAt = localStorage.getItem('token_expires_at');

  if (token && expiresAt && Date.now() < Number(expiresAt)) {
    return token;
  }

  return Authorization();
}
