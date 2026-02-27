import { Route, Routes } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import Discography from './pages/Discography';
import Track from './pages/Track';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/discography/:artist/:id_artist' element={<Discography />} />
        <Route path='/track/:artist/:id_artist/:id_album' element={<Track />} />
      </Routes>
      <SpeedInsights />
    </>
  );
}

export default App;
