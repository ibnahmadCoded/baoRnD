import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import icon_facebook from "../img/icon-facebook.svg"
import icon_twitter from "../img/icon-twitter.svg"
import icon_pinterest from "../img/icon-pinterest.svg"
import icon_instagram from "../img/icon-instagram.svg"
import icon_youtube from "../img/icon-youtube.svg"

const Footer = () => {
    const { user } = useSelector((state) => state.auth)
  return (
    <footer className="bg-custom-150">
        <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-10">
            {/* Logo and social links */}
            <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start">
                {/* logo */}
                <div className='sm:mt-10'>
                    <Link to='/' color='#386641' className="ml-3 text-white text-2xl font-extrabold">baoRnD</Link>
                </div>

                {user ? <div className="my-8 md:my-10">
                {/* Button if user is logged in */}
                    <a
                        href="http://localhosT:3000/givefeedback"
                        class="p-3 px-6 pt-2 text-white bg-custom-100 baseline hover:bg-black rounded-lg">Submit Feedback
                    </a>
                </div> : ""}

                
                {/* Social links */}
                <div className="flex justif-center space-x-4">
                    {/* Link 1 */}
                    <a href="http://localhost:3000/landing">
                        <img src={icon_facebook} alt="" class="h-8"/>
                    </a>

                    {/* Link 2 */}
                    <a href="http://localhost:3000/landing">
                        <img src={icon_youtube} alt="" class="h-8"/>
                    </a>

                    {/* Link 3 */}
                    <a href="http://localhost:3000/landing">
                        <img src={icon_twitter} alt="" class="h-8"/>
                    </a>

                    {/* Link 4 */}
                    <a href="http://localhost:3000/landing">
                        <img src={icon_pinterest} alt="" class="h-8"/>
                    </a>

                    {/* Link 5 */}
                    <a href="http://localhost:3000/landing">
                        <img src={icon_instagram} alt="" class="h-8"/>
                    </a>
                </div>
            </div>

            {/* List */}
            <div className="flex justify-around space-x-32">
                <div className="flex flex-col space-y-3 text-white">
                    <a href="http://localhost:3000/landing" className="hover:text-custom-100">Home</a>
                    <a href="http://localhost:3000/landing" className="hover:text-custom-100">Pricing</a>
                    <a href="http://localhost:3000/landing" className="hover:text-custom-100">Products</a>
                    <a href="http://localhost:3000/landing" className="hover:text-custom-100">About Us</a>
                </div>

                <div className="flex flex-col space-y-3 text-white">
                    <a href="http://localhost:3000/landing" className="hover:text-custom-100">Careers</a>
                    <a href="http://localhost:3000/landing" className="hover:text-custom-100">Community</a>
                    <a href="http://localhost:3000/landing" className="hover:text-custom-100">Team</a>
                    <a href="http://localhost:3000/landing" className="hover:text-custom-100">Terms and Privacy Policy</a>
                </div>

                <div className="flex flex-col space-y-3 text-white">
                    <a href="http://localhost:3000/landing" className="hover:text-custom-100">Services</a>
                    <a href="http://localhost:3000/landing" className="hover:text-custom-100">FAQ</a>
                    <a href="http://localhost:3000/landing" className="hover:text-custom-100">Contact Us</a>
                </div>
            </div>

            {/* Input */}
            <div className="flex flex-col justify-between">
                <form>
                    <div className="flex h-10">
                        <input type="text" className="flex-1 px-4 rounded-l focus:outline-none" placeholder='Enter your email' />
                        <button className="px-6 py- ml-0 text-white rounded-r bg-custom-100 hover:bg-black focus:outline-none">
                            Subscribe
                        </button>
                    </div>
                </form>
                <div className="hidden text-white md:block">
                    Copyright &copy; 2022, All Rights Reserved
                </div>
            </div> 
        </div>
    </footer>
  )
}

export default Footer