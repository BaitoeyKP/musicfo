import { Link, useParams } from 'react-router-dom';
import NavbarArtist from '../components/NavbarArtist';
import { useEffect, useState } from 'react';
import { fetchTackType } from '../Type';
import axios from 'axios';
import { Authorization, getValidToken } from '../utils/spotifyAuth';

function Track() {
  const { id_artist, id_album, artist } = useParams();
  const [tracks, setTracks] = useState<fetchTackType>();

  const THIRTY_MINUTES = 30 * 60 * 1000;

  function fetchTracks(token: string, retryCount = 0) {
    const cacheKey = `track_${id_album}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const { data, savedAt } = JSON.parse(cached);
      if (Date.now() - savedAt < THIRTY_MINUTES) {
        setTracks(data);
        return;
      }
      sessionStorage.removeItem(cacheKey);
    }

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.spotify.com/v1/albums/${id_album}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .request(config)
      .then(function (response: { data: fetchTackType }) {
        setTracks(response.data);
        sessionStorage.setItem(cacheKey, JSON.stringify({ data: response.data, savedAt: Date.now() }));
      })
      .catch(function (_error) {
        if (retryCount >= 2) {
          console.error('Failed after 3 attempts');
          return;
        }
        Authorization().then(function (newToken) {
          fetchTracks(newToken, retryCount + 1);
        });
      });
  }

  useEffect(() => {
    getValidToken().then((token) => fetchTracks(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!tracks) return <div>loading</div>;

  return (
    <div className="bg-base-100 h-screen w-screen flex flex-col">
      <div>
        <NavbarArtist artistName={artist!}></NavbarArtist>
        <div className="pt-9 flex px-12 hd:px-24 justify-between items-center">
          <Link
            to={`/discography/${artist}/${id_artist}`}
            className="text-4xl text-neutral flex items-center 1/12 hd:w-1/4 h-full"
          >
            <span>{'<'}</span>
            <span className="hidden hd:block">&nbsp;All Discography</span>
          </Link>
          <h1 className="text-6xl font-bold text-center overflow-hidden hd:w-1/2 pb-2 cursor-context-menu leading-tight">
            {tracks.name}
          </h1>
          <div className="w-1/12 hd:w-1/4"></div>
        </div>
      </div>
      <div className="flex flex-wrap py-9 px-12 hd:px-24 justify-center gap-x-12 w-full gap-y-10 cursor-context-menu flex-1 overflow-hidden">
        <div className="flex flex-col max-w-[35%] min-w-[300px] w-fit flex-grow max-h-full">
          <div className="max-h-[90%] flex items-center justify-center">
            <img src={tracks.images[0].url} alt="" className="rounded-lg  h-full" loading="lazy" />
          </div>
          <h2 className="font-bold text-4xl text-center pt-4">{tracks.release_date}</h2>
        </div>
        <div className="hd:min-w-[35%] hd:max-w-[50%] hd:overflow-y-auto h-full w-full hd:w-fit">
          <h2 className="text-5xl font-bold pb-5 text-center hd:text-start">TRACK</h2>
          <div className="flex justify-center hd:justify-start">
            <div className="text-4xl font-medium break-words max-w-full">
              {tracks.tracks.items.map((x: { name: string }, i) => (
                <p key={i} className="pb-3">
                  <span className="font-semibold w-14 inline-block text-center">{i + 1}.</span>
                  <span>{x.name}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Track;
