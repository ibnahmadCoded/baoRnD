import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getMyReferrals, reset } from "../features/referrals/referralSlice"
import ReferralItem from "./ReferralItem"
import Spinner from "./Spinner"

const ReferralsView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { referrals, isLoading, isError, isSuccess, message } = useSelector((state) => state.referrals)

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }

        if(isError){
          console.log(message)
        }

        if(isSuccess){
        }

        dispatch(getMyReferrals())
  
        return() => {
          dispatch(reset)
        }
  
      }, [user, isSuccess, isError, message, navigate, dispatch])
    
    if(isLoading){
        return <Spinner />
    }

    return (
        <>
            
        <section className="content">

            <p className="md:ml-40 mt-5 md:mb-5">You can find your referrals here.
                NOTE: this is still in beta stage. Please bear with us.
            </p>

            {referrals.length > 0 ? (
            <div>
                {[...referrals].reverse().map((referral) => (
                    <>
                  
                        <ReferralItem key={referral._id} referral={referral}/>
                   
                    </>
                ))}
            </div>
                ) : (<h3>You have not referred any user</h3>)}
             
        </section>         
            
        </>
    )
}

export default ReferralsView