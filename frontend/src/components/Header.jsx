import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/landing')
    }

    return (
        <header className="border-solid border-b flex items-center justify-between mb-9 px-0 py-5 bg-custom-50 border-color: rgba(230, 230, 230, 1)" >
            
            <div className="ml-5">
                <Link to='/' color='#386641' className="ml-3 text-custom-100 text-2xl font-extrabold">baoRnD</Link>
            </div>
            <ul className="flex items-center justify-between ml-5 mr-1">
                {user ? (<>
                    <li className="ml-5 items-center mr-1">
                        <button className="flex items-center mr-1 hover:text-custom-150" onClick={onLogout}>
                            <FaSignInAlt color='#E36414' className="mr-1"/> Logout
                        </button>
                    </li>
                </>) : (<>
                    <li className="ml-5 items-center mr-1">
                    <Link to='/login' className="flex items-center mr-1 hover:text-custom-150">
                        <FaSignOutAlt color='#386641' className="mr-1"/> Login
                    </Link>
                    </li>
                    <li className="ml-5 items-center mr-1">
                        <Link to='/register' className="flex items-center mr-1 hover:text-custom-150">
                            <FaUser color='#386641' className="mr-1"/> Register
                        </Link>
                    </li>
                </>)}
                
            </ul>

            

            {/* Mobile Menu 
            <div className="navigation md:hidden">
                {user ? (<div id="menu" className="absolute flex-col items-center self-end hidden py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md">
                            
                    <button className=" hover:text-custom-150" onClick={onLogout}>
                        Logout
                    </button>
                            
                </div>) : (<div id="menu" className="absolute flex-col items-center self-end py-8 mt-10 hidden space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md">
                            
                    <a href="/login" className=" hover:text-custom-150">Login</a>
                            
                    <a href="/register" className=" hover:text-custom-150">Register</a>
                </div>)}
            </div>
            */}
        </header>
    )
}

export default Header