import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import Dashboard from './pages/Dashboard';
import { ENDPOINTS } from './utils/endpoints';
import { io } from 'socket.io-client';
import Search from './pages/Search';
import Lobby from './pages/Lobby';
import Game from './pages/Game';

const url = ENDPOINTS.MAIN;
const socket = io(url);

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard socket={socket} />} />
        <Route path='/find-a-game' element={<Search socket={socket}/>} />
        <Route path='/lobby' element={<Lobby socket={socket}/>} />
        <Route path='/game' element={<Game socket={socket} /> } />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
