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
