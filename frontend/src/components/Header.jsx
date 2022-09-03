import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useState } from "react"

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const pages = [
        {
          link: "/",
          name: "Home",
        },
        {
          link: "/",
          name: "Discover Projects",
        },
        {
          link: "/myprojects",
          name: "My Projects",
        },
        {
          link: "/myprofile",
          name: "My Profile",
        },
        {
          link: "/messaging",
          name: "Messages",
        },
        {
          link: "/notifications",
          name: "Notifications",
        },
        {
          link: "/resources",
          name: "Resource Center",
        },
        {
          link: "/support",
          name: "Support",
        },
      ]

    

    const [dropdown, setDropdown] = useState(false);

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
                    <li className="ml-5 items-center mr-1 md:hidden">
                        <button
                            aria-expanded={dropdown ? "true" : "false"}
                            onClick={() => setDropdown((prev) => !prev)}
                        >
                            <svg class="h-6 w-6" viewBox="0 0 24 24"><path fill="#386641" d="M19 17H5c-1.103 0-2 .897-2 2s.897 2 2 2h14c1.103 0 2-.897 2-2s-.897-2-2-2zm0-7H5c-1.103 0-2 .897-2 2s.897 2 2 2h14c1.103 0 2-.897 2-2s-.897-2-2-2zm0-7H5c-1.103 0-2 .897-2 2s.897 2 2 2h14c1.103 0 2-.897 2-2s-.897-2-2-2z"/></svg>
                        </button>
                        <ul className={`dropdown ${dropdown ? "show" : ""} space-y-3 font-semibold`}>
                            {pages.map((page) => (
                                
                                <li class="hover:bg-custom-50" key={page.name}>
                                    <a href={page.link}>{page.name}</a>
                                </li>
                            
                            ))}
                        </ul>
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