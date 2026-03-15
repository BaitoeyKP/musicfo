import axios from 'axios';

const auth = process.env.REACT_APP_AUTH;

export function Authorization(): Promise<string> {
  let data = {
    grant_type: 'client_credentials',
  };
  let config = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
    data: data,
  };
  return axios.request(config).then(function (response) {
    localStorage.setItem('token', response.data.access_token);
    return response.data.access_token;
  });
}
