
import './App.css';
// import Navbar from './shared/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Register';
import Register from './components/auth/Login';
import Navbar from './components/shared/Navbar';
import Home from './components/Home'
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CreateCompany from './components/admin/CreateCompany';
import UpdateCompany from './components/admin/UpdateCompany';
import JobByCompany from './components/admin/JobByCompany';
function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
     <Route path='/' element={<Home />}/>
     <Route path='/register' element={<Login />}/>
     <Route path='/login' element={<Register />}/>
     <Route path='/jobs' element={<Jobs />}/>
     <Route path='/browse' element={<Browse />}/>
     <Route path='/profile' element={<Profile />}/>
     <Route path='/description/:id' element={<JobDescription />}/>
     <Route path='/admin/companies' element={<Companies />}/>
     <Route path='/admin/companies/create' element={<CreateCompany />}/>
     <Route path='/admin/companies/:id' element={<UpdateCompany />}/>
     <Route path="/admin/company/jobs/:id" element={<JobByCompany /> } />
    </Routes>

  </BrowserRouter>
  );
}

export default App;
