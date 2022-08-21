import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "./Spinner"
import { toast } from 'react-toastify'
import { addInvestment, getProjectInvestments, resetinvestments } from "../features/investments/investmentSlice"
import InvestmentItem from "./InvestmentItem"
const lodash = require('lodash')

const InvestmentView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)
    const { investments, isLoadingInvestment, isErrorInvestment, isSuccessInvestment, messageInvestment } = useSelector((state) => state.investments)

    const [formInvestment, setFormInvestment] = useState({
        amount: 0
    })

    const { amount } = formInvestment

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }
  
        if(isErrorInvestment){
          console.log(messageInvestment)
        }

        if(isSuccessInvestment){
          }
  
        dispatch(getProjectInvestments(params.id))
  
        return() => {
          dispatch(resetinvestments)
        }
  
      }, [user, params.id, messageInvestment, isSuccessInvestment, isErrorInvestment, navigate, dispatch])

    
    const invs = investments.filter((inv) => (inv.project === params.id && inv.amount !== []))

    var totalInvested = 0

    if(invs){
        for (var i = 0; i < invs.length; i++) {
            totalInvested += lodash.sum(invs[i].amounts)
        }
    }

    const onSubmit = e => {
        e.preventDefault()

        if(parseInt(amount) + totalInvested > project.amount){
            toast.error(`You cannot invest more than the goal. The amount left ${project.amount - totalInvested}`)
        }
        else {
            const investmentData = { project: params.id, amount: amount  }

            dispatch(addInvestment(investmentData))

            toast.success("Your investment was successfully submitted. Thank you!")
        }

        setFormInvestment({
            amount: 0
        })
    }

    const onChange = (e) => {
        setFormInvestment((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
  
    if(isLoadingInvestment){
        return <Spinner />
    }

    var cat

    if(project.category === "Fund" && project.acceptapps){
        cat = "allowed"
    }

    var invest
    if(project.amount && totalInvested < project.amount){
        invest = "allowed"
    }

    return (
            <>   
            <section>
                <p className="md:ml-28 md:mb-5">You can find project investments or invest in projects here. We are still in beta stage. Please bear with us.</p>
                {/* Everyone can invest in a project, as long as they can view it. Including the project owner.*/}

                {cat && cat === "allowed" && invest === "allowed" ? (
                <section className="my-0 mx-auto w-9/12">
                    <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                        <p class="font-bold mb-1">General Investment Information</p>
                        <p>Message from the project owner: {project.appmsg}</p>
                        <span className="text-custom-100 font-bold">${totalInvested}</span> out of <span className="text-custom-150">${project.amount} </span> invested.
                        <p>Join the investors in this proejct. </p>
                        <form className="mt-5" onSubmit={onSubmit}>
                            <p class="font-bold mb-3">Make New Investment</p>
                            
                            <div class="mb-4">
                                <input type="text" id="amount" name="amount"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                    placeholder="Enter investment amount" value={amount} onChange={onChange} required 
                                />
                            </div>
                
                            <div>
                                <button type="submit" class="mb-5 text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 rounded-lg text-sm px-5 py-2.5 text-center">
                                    Make Payment
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
                ) 
                : (null)}

                {(project.amount && totalInvested === project.amount) ? (
                    <section className="my-0 mx-auto w-9/12">
                        <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                            <p class="font-bold mb-1">General Investment Information</p>
                            <p>Message from the project owner: {project.appmsg}</p>
                            <p class="">Sorry, you cannot invest. The investment goal for this project has been reached.</p>
                            <span className="text-custom-100 font-bold">${totalInvested}</span> out of <span className="text-custom-150">${project.amount} </span> 
                            invested.
                        </div>
                    </section>
                    ) : (null)}
                
                {/** Non-owner can ever view investments to a project */}
                {(investments.length > 0 && project.user === user._id) ? (
                    <div>
                        {investments.map((investment) => (
                            <>
                            {investment.project === params.id ? (
                                <InvestmentItem key={investment._id} investment={investment}/>
                            ) : (null)}
                            </>
                        ))}
                    </div>
                    ) : (<h3>You are not authorized to view investments in this project or there are no investments.</h3>)}
                
                
            </section>          
            </>
    )
}

export default InvestmentView