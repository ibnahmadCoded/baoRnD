import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Registerreferral from './pages/Registerreferral';
import Verifyaccount from './pages/Verifyaccount';
import Footer from './components/Footer';
import Waitlist from './pages/Waitlist';
import Feedback from './pages/Feedback';
import CreateProject from './pages/CreateProject';
import Support from "./pages/Support";
import Notification from "./pages/Notification";
import Messaging from './pages/Messaging';
import MyProfile from "./pages/MyProfile"
import MyProjects from "./pages/MyProjects"
import Project from './pages/Project';
import Update from './pages/Update';

function App() {
  return (
    <>
      <Router className="md:container md:mx-auto">
        <div className='flex-1'>
          <Header />
          <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/registerwithreferral' element={<Registerreferral />}/>
            <Route path='/verification' element={<Verifyaccount />}/>
            <Route path='/landing' element={<Landing />}/>
            <Route path='/earlyaccess' element={<Waitlist />}/>
            <Route path='/givefeedback' element={<Feedback />}/>
            <Route path='/createproject' element={<CreateProject />}/>
            <Route path='/support' element={<Support />}/>
            <Route path='/notifications' element={<Notification />}/>
            <Route path='/messaging' element={<Messaging />}/>
            <Route path='/myprofile' element={<MyProfile />}/>
            <Route path='/myprojects' element={<MyProjects />}/>
            <Route path='/project/:id' element={<Project />}/>
            <Route path='/update/:id' element={<Update />}/>
            <Route path='/' element={<Dashboard />}/>
          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
