import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Tabs, TabsHeader, Tab } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { favoriteType, fetchAlbumType, fetchArtistType } from '../Type';
import axios from 'axios';
import ArtistCard from '../components/ArtistCard';
import AlbumCard from '../components/AlbumCard';
import { Authorization, getValidToken } from '../utils/spotifyAuth';

function Favorite() {
  const [activeTab, setActiveTab] = useState('all');
  const [Cookies] = useCookies<string>([]);
  const [all, setAll] = useState<favoriteType[]>([]);
  const [artists, setArtists] = useState<favoriteType[]>([]);
  const [albums, setAlbums] = useState<favoriteType[]>([]);

  const data = [
    {
      label: 'ALL',
      value: 'all',
    },
    {
      label: 'ARTIST',
      value: 'artist',
    },
    {
      label: 'DISCROGRAPHY',
      value: 'discrography',
    },
  ];

  const THIRTY_MINUTES = 30 * 60 * 1000;

  function getCachedFavorite(key: string): favoriteType | null {
    const cached = sessionStorage.getItem(key);
    if (!cached) return null;
    const { data, savedAt } = JSON.parse(cached);
    if (Date.now() - savedAt < THIRTY_MINUTES) return data;
    sessionStorage.removeItem(key);
    return null;
  }

  async function fetchFavorites(token: string, retryCount = 0) {
    const cookies = document.cookie.split(';');
    const artistItems: favoriteType[] = [];
    const albumItems: favoriteType[] = [];

    const promises = cookies.map(async (cookie) => {
      const [name] = cookie.split('=').map((item) => item.trim());
      if (Cookies[name]?.data === false) return;

      if (Cookies[name]?.type === 'artist') {
        const cached = getCachedFavorite(`fav_artist_${name}`);
        if (cached) {
          artistItems.push(cached);
          return;
        }

        const response = await axios.get<fetchArtistType>(
          `https://api.spotify.com/v1/artists/${name}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const tempArtist: favoriteType = {
          artist: response.data.name,
          genre: response.data.genres,
          id: response.data.id,
          images: response.data.images[0].url,
          type: 'artist',
          release_date: '',
          album: '',
          id_artist: '',
        };
        sessionStorage.setItem(
          `fav_artist_${name}`,
          JSON.stringify({ data: tempArtist, savedAt: Date.now() })
        );
        artistItems.push(tempArtist);
      } else if (Cookies[name]?.type === 'album') {
        const cached = getCachedFavorite(`fav_album_${name}`);
        if (cached) {
          albumItems.push(cached);
          return;
        }

        const response = await axios.get<fetchAlbumType>(
          `https://api.spotify.com/v1/albums/${name}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const tempAlbum: favoriteType = {
          album: response.data.name,
          genre: [],
          id: response.data.id,
          images: response.data.images[0].url,
          type: 'album',
          release_date: response.data.release_date,
          artist: response.data.artists[0].name,
          id_artist: response.data.artists[0].id,
        };
        sessionStorage.setItem(
          `fav_album_${name}`,
          JSON.stringify({ data: tempAlbum, savedAt: Date.now() })
        );
        albumItems.push(tempAlbum);
      }
    });

    try {
      await Promise.all(promises);
      setArtists(artistItems);
      setAlbums(albumItems);
      setAll([...artistItems, ...albumItems]);
    } catch {
      if (retryCount >= 2) {
        console.error('Failed after 3 attempts');
        return;
      }
      const newToken = await Authorization();
      fetchFavorites(newToken, retryCount + 1);
    }
  }

  useEffect(() => {
    getValidToken().then((token) => fetchFavorites(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-base-100 h-screen w-screen">
      <Navbar></Navbar>
      <div className="pt-9 flex px-12 hd:px-24">
        <Link to="/" className="text-4xl text-neutral flex items-center w-1/3">
          <span>{'<'}</span>
          <span className="hidden hd:block">&nbsp;Home</span>
        </Link>
        <h1 className="text-6xl font-bold text-center overflow-hidden min-w-[33.33%] whitespace-nowrap cursor-context-menu">
          FAVORITE
        </h1>
        <div className="w-1/3"></div>
      </div>
      <div className="w-full flex justify-center">
        <Tabs value={activeTab}>
          <TabsHeader
            className="text-4xl w-1/2 gap-x-5 pt-4 cursor-pointer"
            placeholder={undefined}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={`w-fit ${activeTab === value ? 'text-info border-b-2 border-info' : 'text-neutral opacity-50 hover:border-b-2 hover:border-info'}`}
                placeholder={undefined}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
      </div>
      <div className="px-24 py-9 grid m:grid-cols-2 l:grid-cols-3 hd:grid-cols-4 4k:grid-cols-5 place-items-center gap-y-9 gap-x-12 overflow-hidden">
        {activeTab === 'all'
          ? all.map((x, i) => {
              if (x.type === 'artist')
                return (
                  <ArtistCard
                    key={x.id}
                    name={x.artist}
                    genre={x.genre}
                    id={x.id}
                    images={x.images}
                  ></ArtistCard>
                );
              else
                return (
                  <AlbumCard
                    key={x.id}
                    name={x.album}
                    id={x.id}
                    images={x.images}
                    release_date={x.release_date}
                    id_artist={x.id_artist}
                    artist={x.artist}
                  ></AlbumCard>
                );
            })
          : activeTab === 'artist'
            ? artists.map((x) => (
                <ArtistCard
                  key={x.id}
                  name={x.artist}
                  genre={x.genre}
                  id={x.id}
                  images={x.images}
                ></ArtistCard>
              ))
            : albums.map((x) => (
                <AlbumCard
                  key={x.id}
                  name={x.album}
                  id={x.id}
                  images={x.images}
                  release_date={x.release_date}
                  id_artist={x.id_artist}
                  artist={x.artist}
                ></AlbumCard>
              ))}
      </div>
    </div>
  );
}

export default Favorite;
