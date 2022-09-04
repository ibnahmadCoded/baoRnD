import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import axios from "axios"

const Subscribe = () => {
    const navigate = useNavigate()
    const params = useParams()

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!user){
            navigate("/login")
        }
  
      }, [user, navigate])
    
    const onSubmit = async (e) => {
        e.preventDefault()

        if(params.price === 0){
            toast.error("You cannot pay $0")
        } else {
                try {
                    
                    const paymentData = {
                        price: parseInt(params.price),  
                    }
        
                    const response = await axios.post("/api/subscribe", paymentData)
        
                    if(response.data){
                        toast.error("Payment declined! Sorry, we are not accepting new subscriptions at the moment.")
                    }
        
                } catch (error) {
                    console.log("Error", error)
                }
        }
    }

    return (
        <>
        <style>@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);</style>
        <section>
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">

                <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Make Paymet subsciption of ${params.price}</h2>
                </div>
                
                {/** 
                <div class="mx-auto max-w-screen-md text-center mt-8 mb-8 lg:mb-12">
                    <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-custom-50 rounded-lg border border-gray-100 shadow xl:p-8">
                        <h3 class="mb-4 text-2xl font-semibold">Payment Form</h3>
                    </div>

                </div>
                */}

                <div class="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700" style={{maxWidth:`600px`}}>
                    <div class="w-full pt-1 pb-5">
                        <div class="bg-custom-150 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                            <i class="mdi mdi-credit-card-outline text-3xl"></i>
                        </div>
                        <div class="mb-10">
                            <h1 class="text-center font-bold text-xl uppercase">Secure payment info</h1>
                        </div>
                        <form onSubmit={onSubmit}>
                        <div class="mb-3 flex -mx-2">
                            <div class="px-2">
                                <label for="type1" class="flex items-center cursor-pointer">
                                    <input type="radio" class="form-radio h-5 w-5 text-custom-150" name="type" id="type1" checked />
                                    <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" alt="" class="h-8 ml-3" />
                                </label>
                            </div>
                            <div class="px-2">
                                <label for="type2" class="flex items-center cursor-pointer" >
                                    <input type="radio" class="form-radio h-5 w-5 text-custom-150" name="type" id="type2" />
                                    <img src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png" alt="" class="h-8 ml-3" />
                                </label>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="font-bold text-sm mb-2 ml-1">Name on card</label>
                            <div>
                                <input class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John Smith" type="text" required/>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="font-bold text-sm mb-2 ml-1">Card number</label>
                            <div>
                                <input class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="0000 0000 0000 0000" type="text" required/>
                            </div>
                        </div>
                        <div class="mb-3 -mx-2 flex items-end">
                            <div class="px-2 w-1/2">
                                <label class="font-bold text-sm mb-2 ml-1">Expiration date</label>
                                <div>
                                    <select class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer" required>
                                        <option value=""></option>
                                        <option value="01">01 - January</option>
                                        <option value="02">02 - February</option>
                                        <option value="03">03 - March</option>
                                        <option value="04">04 - April</option>
                                        <option value="05">05 - May</option>
                                        <option value="06">06 - June</option>
                                        <option value="07">07 - July</option>
                                        <option value="08">08 - August</option>
                                        <option value="09">09 - September</option>
                                        <option value="10">10 - October</option>
                                        <option value="11">11 - November</option>
                                        <option value="12">12 - December</option>
                                    </select>
                                </div>
                            </div>
                            <div class="px-2 w-1/2">
                                <select class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer" required>
                                    <option value=""></option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-10">
                            <label class="font-bold text-sm mb-2 ml-1">Security code</label>
                            <div>
                                <input class="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="000" type="text" required/>
                            </div>
                        </div>
                        <div>
                            <button type="submit" class="block w-full max-w-xs mx-auto bg-custom-150 hover:bg-custom-100 text-black hover:text-white rounded-lg px-3 py-3 font-semibold"><i class="mdi mdi-lock-outline mr-1"></i> PAY NOW</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Subscribe