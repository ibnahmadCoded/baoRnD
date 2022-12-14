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
import Resources from './pages/Resources';
import Notification from "./pages/Notification";
import Messaging from './pages/Messaging';
import MyProfile from "./pages/MyProfile"
import MyProjects from "./pages/MyProjects"
import Project from './pages/Project';
import Update from './pages/Update';
import ReferUser from './pages/ReferUser';
import Profile from './pages/Profile';
import Pricing from './pages/Pricing';
import Subscribe from './pages/Subscribe';
import Products from './pages/Products';
import About from './pages/About';
import Careers from './pages/Careers';
import Team from './pages/Team';
import Privacy from './pages/Privacy';
import Services from './pages/Services';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import WYSIWYGEditor from './pages/WYSIWYGEditor2';


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
            <Route path='/refer' element={<ReferUser />}/>
            <Route path='/support' element={<Support />}/>
            <Route path='/resources' element={<Resources />}/>
            <Route path='/notifications' element={<Notification />}/>
            <Route path='/messaging' element={<Messaging />}/>
            <Route path='/myprofile' element={<MyProfile />}/>
            <Route path='/myprojects' element={<MyProjects />}/>
            <Route path='/project/:id' element={<Project />}/>
            <Route path='/update/:id' element={<Update />}/>
            <Route path='/profile/:id' element={<Profile />}/>
            <Route path='/pricing' element={<Pricing />}/>
            <Route path='/products' element={<Products />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/careers' element={<Careers />}/>
            <Route path='/team' element={<Team />}/>
            <Route path='/privacy' element={<Privacy />}/>
            <Route path='/services' element={<Services />}/>
            <Route path='/contact' element={<Contact />}/>
            <Route path='/faq' element={<FAQ />}/>
            <Route path='/editor/:id/' element={<WYSIWYGEditor />}/> {/** currentl< not in use in the app */}
            <Route path='/subscribe/:price' element={<Subscribe />}/>
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
