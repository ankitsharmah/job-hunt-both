
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
import EditJob from './components/admin/EditJob';
import CreateJob from './components/admin/CreateJob';
import ApplicationsByJob from './components/admin/ApplicationsByJob';
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
     <Route path="/admin/company/:name/jobs/:id" element={<JobByCompany /> } />
     <Route path="/admin/company/:name/updatejob/:id" element={<EditJob /> } />
     <Route path="/admin/company/:name/post-job/:id" element={<CreateJob /> } />
     <Route path="/admin/company/:name/job/:jobname/:id" element={<ApplicationsByJob /> } />
    </Routes>

  </BrowserRouter>
  );
}

export default App;
