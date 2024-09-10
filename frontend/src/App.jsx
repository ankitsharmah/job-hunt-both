
import './App.css';
// import Navbar from './shared/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Register';
import Register from './components/auth/Login';
import Navbar from './components/shared/Navbar';
import Home from './components/Home'
import Jobs from './components/Jobs';
function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
     <Route path='/' element={<Home />}/>
     <Route path='/register' element={<Login />}/>
     <Route path='/login' element={<Register />}/>
     <Route path='/jobs' element={<Jobs />}/>
    </Routes>

  </BrowserRouter>
  );
}

export default App;
