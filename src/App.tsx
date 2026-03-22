import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/Home'));
const Favorite = React.lazy(() => import('./pages/Favorite'));
const Discography = React.lazy(() => import('./pages/Discography'));
const Track = React.lazy(() => import('./pages/Track'));

function App() {
  return (
    <Suspense fallback={<div className="bg-base-100 h-screen w-screen" />}>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/discography/:artist/:id_artist' element={<Discography />} />
        <Route path='/track/:artist/:id_artist/:id_album' element={<Track />} />
      </Routes>
    </Suspense>
  );
}

export default App;
