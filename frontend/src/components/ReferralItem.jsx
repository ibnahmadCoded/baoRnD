import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import moment from "moment"

const ReferralItem = ({referral}) => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }

    }, [user, navigate])

    return (
        <div className="my-0 mx-auto w-9/12 mb-5">
            
            <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
                <p >
                    {referral.user === user._id ? (
                    <>
                        <p className="text-custom-100 font-bold">{referral.email}</p>
                        {referral.joined ? <span className="text-custom-100">Signed up</span> : <span className="text-custom-150">Not signed up</span>}
                        <p>referred {moment(new Date(referral.createdAt)).fromNow()} as {referral.type}</p>
                        <p className=" text-sm">
                            
                        </p>
                    </>
                    ) : (
                        null
                    )
                    }
                </p>
            </div>
        </div>
    )
}

export default ReferralItem