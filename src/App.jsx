import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage'
import NoPage from './pages/NoPage'
import LoggedIn from './pages/Redirect.jsx'
import SongRecommendation from './pages/TopSongsAndArtists.jsx';
import TopSongsAndArtists from './pages/TopSongsAndArtists.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/redirect" element={<LoggedIn/>} />
        <Route path="/songRecommendation" element={<TopSongsAndArtists/>} />
        <Route  path='*' element={<NoPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
