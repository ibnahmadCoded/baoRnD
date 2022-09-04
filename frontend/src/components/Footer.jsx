import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useState } from "react"
import icon_facebook from "../img/icon-facebook.svg"
import icon_twitter from "../img/icon-twitter.svg"
import icon_instagram from "../img/icon-instagram.svg"
import icon_youtube from "../img/icon-youtube.svg"
import axios from 'axios'
import { toast } from 'react-toastify'

const Footer = () => {
    const { user } = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        email: ''
    })

    const { email } = formData

    const onSubmit = async (e) => {
        e.preventDefault()

        const newsletterData = {email: email}

        const response = await axios.post(`/api/newslettersignups`, newsletterData)

        if(response){
            toast.success("Your email has been added to the newsletter. Thank you!")
        }
        
        setFormData({
            email: ''
        })
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <footer className="bg-custom-50">
            <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-10">
                {/* Logo and social links */}
                <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start">
                    {/* logo */}
                    <div className='sm:mt-10'>
                        <Link to='/' color='#386641' className="ml-3 text-custom-100 text-2xl font-extrabold">baoRnD</Link>
                    </div>

                    {user ? <div className="my-8 md:my-10">
                    {/* Button if user is logged in */}
                        <a
                            href="/givefeedback"
                            class="p-3 px-6 pt-2 text-white bg-custom-100 baseline hover:bg-custom-150 hover:text-black rounded-lg">Submit Feedback
                        </a>
                    </div> : ""}

                    
                    {/* Social links */}
                    <div className="flex justif-center space-x-4" target="_blank" rel="noopener noreferrer">
                        {/* Link 1 */}
                        <a href="https://www.linkedin.com/in/bao-rnd-ba62a724b/">
                        <svg width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248c-.015-.709-.52-1.248-1.342-1.248c-.822 0-1.359.54-1.359 1.248c0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586c.173-.431.568-.878 1.232-.878c.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252c-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>
                        </a>

                        {/* Link 2 */}
                        <a href="/landing" target="_blank" rel="noopener noreferrer">
                            <img src={icon_facebook} alt="" class="h-8"/>
                        </a>

                        {/* Link 2 */}
                        <a href="https://www.youtube.com/channel/UCus3rYeZt9DW7PVCS7fxBGA" target="_blank" rel="noopener noreferrer">
                            <img src={icon_youtube} alt="" class="h-8"/>
                        </a>

                        {/* Link 3 */}
                        <a href="https://twitter.com/baoRnD" target="_blank" rel="noopener noreferrer">
                            <img src={icon_twitter} alt="" class="h-8"/>
                        </a>

                        {/* Link 5 */}
                        <a href="https://www.instagram.com/baornd/" target="_blank" rel="noopener noreferrer">
                            <img src={icon_instagram} alt="" class="h-8"/>
                        </a>
                    </div>
                </div>

                {/* List */}
                <div className="flex justify-around space-x-32">
                    <div className="flex flex-col space-y-3 text-white">
                        <a href="/" className="hover:text-custom-150 text-black">Home</a>
                        <a href="/pricing" className="hover:text-custom-150 text-black">Pricing</a>
                        <a href="/products" className="hover:text-custom-150 text-black">Products</a>
                        <a href="/about" className="hover:text-custom-150 text-black">About Us</a>
                    </div>

                    <div className="flex flex-col space-y-3 text-white">
                        <a href="/careers" className="hover:text-custom-150 text-black">Careers</a>
                        <a href="/support" className="hover:text-custom-150 text-black">Community</a>
                        <a href="/team" className="hover:text-custom-150 text-black">Team</a>
                        <a href="/privacy" className="hover:text-custom-150 text-black">Terms and Privacy Policy</a>
                    </div>

                    <div className="flex flex-col space-y-3 text-white">
                        <a href="/services" className="hover:text-custom-150 text-black">Services</a>
                        <a href="/faq" className="hover:text-custom-150 text-black">FAQ</a>
                        <a href="/contact" className="hover:text-custom-150 text-black">Contact Us</a>
                    </div>
                </div>

                {/* Input */}
                <div className="flex flex-col justify-between">
                    <form onSubmit={onSubmit}>
                        <div className="flex h-10">
                            <input type="email" id="email" value={email} name="email" className="flex-1 px-4 rounded-l border-2 border-custom-100 focus:outline-none" 
                                placeholder='Enter your email' onChange={onChange} required
                            />
                            <button className="px-6 py- ml-0 text-white rounded-r bg-custom-100 hover:bg-custom-150 hover:text-black focus:outline-none">
                                Subscribe
                            </button>
                        </div>
                    </form>
                    <div className="hidden text-black md:block">
                        Copyright &copy; 2022, All Rights Reserved
                    </div>
                </div> 
            </div>
        </footer>
    )
}

export default Footer