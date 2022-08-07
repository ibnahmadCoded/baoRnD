import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="border-solid border-b flex items-center justify-between mb-9 px-0 py-5 bg-custom-50 border-color: rgba(230, 230, 230, 1)" >
        <div className="ml-5">
            <Link to='/' color='#386641' className="ml-3 text-custom-100 text-2xl font-extrabold">baoRnD</Link>
        </div>
        <ul className="flex items-center justify-between ml-5 mr-1">
            <li className="ml-5 flex items-center mr-1">
                <Link to='/login' className="flex items-center mr-1 hover:text-custom-150">
                    <FaSignInAlt color='#386641' className="mr-1"/> Login
                </Link>
            </li>
            <li className="ml-5 flex items-center mr-1">
                <Link to='/register' className="flex items-center mr-1 hover:text-custom-150">
                    <FaUser color='#386641' className="mr-1"/> Register
                </Link>
            </li>
        </ul>
    </header>
  )
}

export default Header