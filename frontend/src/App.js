import logo from './logo.svg';
import './App.css';
// import Navbar from './shared/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Register';
import Register from './components/auth/Login';
import Navbar from './shared/Navbar';
import Home from './components/Home'
function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
     <Route path='/' element={<Home />}/>
     <Route path='/register' element={<Login />}/>
     <Route path='/login' element={<Register />}/>
    </Routes>

  </BrowserRouter>
  );
}

export default App;
