import {useState, useEffect } from 'react'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        email: '',
        password: '',
        confirmpassword: ''
    })

    const { name, type, email, password, confirmpassword } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
    } 

    return (
        <>
        <section className="font-bold text-3xl mb-0 py-0 px-5 content-center">
            <h1 className='text-3xl text-center'>
                 Register
            </h1>
            <p className="text-custom-120 text-2xl text-center">Please create an account</p>
        </section>

        <section className="my-0 mx-auto w-9/12">
            <div class=" sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                    <form onSubmit={onSubmit}>
                        <div class="mb-4">
                            <input type="text" id="name" name="name"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                                placeholder="Enter your full name" value={name} onChange={onChange} required 
                            />
                        </div>
                        <div class="mb-4">
                            <input type="email" id="email" name="email" 
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                                placeholder="Your email goes here!" value={email} onChange={onChange} required 
                            />
                        </div>
                        
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Please select account type</label>

                            <div class="flex items-center mb-4">
                                <input id="type-option-1" type="radio" name="type" value={type} onChange={onChange}
                                    class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" checked 
                                />
                                <label for="type-option-1" class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Company
                                </label>
                            
                                <input id="type-option-2" type="radio" name="type" value={type} onChange={onChange}
                                    class="ml-8 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" 
                                />
                                <label for="type-option-2" class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Individual
                                </label>
                            </div>
                        
                        <div class="mb-4">
                            <input type="password" id="password" name="password"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                                placeholder="Please enter your password." value={password} onChange={onChange} required 
                            />
                        </div>
                        <div class="mb-4">
                            <input type="password" id="confirmpassword" name="confirmpassword" 
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                                placeholder="Please repeat your password." value={confirmpassword} onChange={onChange} required 
                            />
                        </div>
                        {/* sample comment  */}
                        <div class="flex items-start mb-4">
                            <div class="flex items-center h-5">
                            <input id="terms" type="checkbox" value="" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                            </div>
                            <label for="terms" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-custom-100 hover:underline dark:text-blue-500">terms and conditions</a></label>
                        </div>
                        
                        <div>
                            <button type="submit" class="text-white bg-custom-100 hover:bg-custom-150 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default Register