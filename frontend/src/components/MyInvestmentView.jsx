import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "./Spinner"
import { getMyInvestments, resetinvestments } from "../features/investments/investmentSlice"
import MyInvestmentItem from "./MyInvestmentItem"

const MyInvestmentView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { investments, isLoadingInvestment, isErrorInvestment, isSuccessInvestment, messageInvestment } = useSelector((state) => state.investments)

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }
  
        if(isErrorInvestment){
          console.log(messageInvestment)
        }

        if(isSuccessInvestment){
        }

        dispatch(getMyInvestments())
  
        return() => {
          dispatch(resetinvestments)
        }
  
      }, [user, messageInvestment, isSuccessInvestment, isErrorInvestment, navigate, dispatch])

    if(isLoadingInvestment){
          return <Spinner />
    }

    return (
        <>
        <section>
        <p className="md:ml-28 md:mb-5">You can find all your applications here. We are still in beta stage. Please bear with us.</p>

            {investments.length > 0 ? (
                <div>
                    {[...investments].reverse().map((investment) => (
                        <>
                        {investment.user === user._id ? (
                            <MyInvestmentItem key={investment._id} investment={investment}/>
                        ) : (null)}
                        </>
                    ))}
                </div>
            ) : (<h3>You have not made any investments</h3>)}

        </section>
        </>
    )
}

export default MyInvestmentView