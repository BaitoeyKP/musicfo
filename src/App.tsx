import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import Discography from './pages/Discography';
import Track from './pages/Track';

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='/favorite' element={<Favorite />} />
      <Route path='/discography' element={<Discography />} />
      <Route path='/track' element={<Track />} />
    </Routes>
  );
}

export default App;
