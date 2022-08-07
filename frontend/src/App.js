import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing'


function App() {
  return (
    <>
      <Router className="md:container md:mx-auto">
        <div>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/landing' element={<Landing />}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
