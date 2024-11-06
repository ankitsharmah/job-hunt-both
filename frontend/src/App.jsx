import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Register';
import Register from './components/auth/Login';
import Navbar from './components/shared/Navbar';
import Home from './components/Home';
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
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Register />} />
        <Route path='/register' element={<Login />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/browse' element={<Browse />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/description/:id' element={<JobDescription />} />
        
        {/* Admin routes with ProtectedRoute */}
        <Route path='/admin/companies' element={
          <ProtectedRoute>
            <Companies />
          </ProtectedRoute>
        } />
        <Route path='/admin/companies/create' element={
          <ProtectedRoute>
            <CreateCompany />
          </ProtectedRoute>
        } />
        <Route path='/admin/companies/:id' element={
          <ProtectedRoute>
            <UpdateCompany />
          </ProtectedRoute>
        } />
        <Route path="/admin/company/:name/jobs/:id" element={
          <ProtectedRoute>
            <JobByCompany />
          </ProtectedRoute>
        } />
        <Route path="/admin/company/:name/updatejob/:id" element={
          <ProtectedRoute>
            <EditJob />
          </ProtectedRoute>
        } />
        <Route path="/admin/company/:name/post-job/:id" element={
          <ProtectedRoute>
            <CreateJob />
          </ProtectedRoute>
        } />
        <Route path="/admin/company/:name/job/:jobname/:id" element={
          <ProtectedRoute>
            <ApplicationsByJob />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
