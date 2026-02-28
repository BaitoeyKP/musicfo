import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import ArtistCard from '../components/ArtistCard';
import { artistType, fetchArtistType } from '../Type';
import { useCookies } from 'react-cookie';

const artislist = [
  '2AfmfGFbe0A0WsTYm0SDTx', //I-DLE
  '3aBwCcP4CB8M6S7YV8QkOg', //4EVE
  '6YVMFz59CuY7ngCxTxjpxE', //aespa
  '5RmQ8k4l3HZ8JoPb4mNsML', //Agust D
  '2p48L95TwEaYkSdn6R7LOr', //BamBam
  '2ORibfYGMt8fuIimSDCTq1', //bamm
  '41MozSoPIsD1dJM0CLPjZF', //BLACKPINK
  '3Nrfpe0tUJi4K4DXYWgMUX', //BTS
  '3HqSLMAZ3g3d5poNaI7GOU', //IU
  '0b1sIQumIAsNbqAoIClSpy', //j-hope
  '1oSPZhvZMIrWW5I41kPkkY', //Jimin
  '5vV3bFXnN6D6N3Nj4xRvaV', //JIN
  '6HaGTQPmzraVmaVxvz6EUc', //Jung Kook
  '1uNFoZAHBGtllmzznpCI3s', //Justin Bieber
  '4SpbR6yFEvexJuaBpgAU5p', //LE SSERAFIM
  '1eVPKI2R4NlX6P5FIuMXis', //MILLI
  '6HvZYsbFfjnjFrWF950C9d', //NewJeans
  '6HlUN1Md7UT62mNJHOYRsK', //PiXXie
  '4tNPboeMQnpoUX7IEbPLdF', //PROXIE
  '2auC28zjQyVTsiZKNgPRGs', //RM
  '0ebNdVaOfp6N0oZ1guIxM8', //SUGA
  '7n2Ycct7Beij7Dj7meI4X0', //TWICE
  '0ghlgldX5Dd6720Q3qFyQB', //txt
  '3JsHnjpbhX4SnySpvpa9DK', //V
];

function Home() {
  const [artists, setArtists] = useState<artistType[]>([]);
  const [cookies, setCookie] = useCookies<string>([]);

  const auth = process.env.REACT_APP_AUTH;
  function Authorization(): Promise<string> {
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

  function fetchArtists(token: string) {
    const requests = artislist.map(function (id) {
      return axios
        .request({
          method: 'get',
          maxBodyLength: Infinity,
          url: `https://api.spotify.com/v1/artists/${id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response: { data: fetchArtistType }) {
          return {
            name: response.data.name,
            genre: response.data.genres,
            id: response.data.id,
            images: response.data.images[0].url,
          } as artistType;
        });
    });

    Promise.all(requests)
      .then(function (results) {
        results.forEach(function (tempArtist) {
          if (cookies[tempArtist.id] === undefined)
            setCookie(tempArtist.id, { data: false, type: 'artist' });
        });
        setArtists(results);
      })
      .catch(function (error) {
        Authorization().then(function (newToken) {
          fetchArtists(newToken);
        });
      });
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchArtists(token);
    } else {
      Authorization().then(function (newToken) {
        fetchArtists(newToken);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!artists) return <div>loading...</div>;

  return (
    <div className="bg-base-100 h-screen w-screen">
      <Navbar></Navbar>
      <h1 className="text-center pt-9 text-6xl font-bold cursor-context-menu">ARTIST</h1>
      <div className="px-24 py-9 grid m:grid-cols-2 l:grid-cols-3 hd:grid-cols-4 4k:grid-cols-5 place-items-center gap-y-9 gap-x-12 overflow-hidden">
        {artists.map((x) => {
          return (
            <ArtistCard key={x.id} id={x.id} name={x.name} images={x.images} genre={x.genre}></ArtistCard>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
