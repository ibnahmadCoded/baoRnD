import { useSelector } from "react-redux"
const lodash = require('lodash')

const InvestmentItem = ({investment}) => {
    const { user } = useSelector((state) => state.auth)

    return (
        <>
            <div className="my-0 mx-auto w-9/12 mb-5">
            <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
                <p>
                    Investor:
                    {investment.user === user._id ? (
                        <>
                            {/* can view user profile via the link */}
                            <a className="text-custom-100 font-bold hover:text-custom-150" href={"/profile/" + investment.user}> You</a> 
                        </>
                    ) : (
                        <>
                            <a className="text-custom-100 font-bold hover:text-custom-150" href={"/profile/" + investment.user}> {investment.username}</a> 
                        </>
                    )}
                </p>

                <p>
                    Amount: {lodash.sum(investment.amounts)}
                </p>
                <p>
                    Investment Date: {new Date(investment.createdAt).toLocaleString("en-Us")}
                </p>
            </div>
            </div>
            </>
    )
}

export default InvestmentItem