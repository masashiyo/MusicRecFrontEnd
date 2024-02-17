import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage'
import NoPage from './pages/NoPage'
import LoggedIn from './pages/Redirect.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/redirect" element={<LoggedIn/>} />
        <Route  path='*' element={<NoPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
