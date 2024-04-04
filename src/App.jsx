import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogInPage.jsx'
import NoPage from './pages/NoPage'
import LoggedIn from './pages/Redirect.jsx'
import SongRecommendation from './pages/SongRecommendation.jsx';
import TopSongsAndArtists from './pages/TopSongsAndArtists.jsx';
import HomePage from './pages/HomePage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LogIn/>} />
        <Route path="/logIn" element={<LogIn/>} />
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/redirect" element={<LoggedIn/>} />
        <Route path="/topSongsAndArtists" element={<TopSongsAndArtists/>} />
        <Route path="/songRecommendation" element={<SongRecommendation/>}/>
        <Route  path='*' element={<NoPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
