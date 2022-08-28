import { useSelector } from "react-redux"
const lodash = require('lodash')

const MyInvestmentItem = ({investment}) => {
    const { user } = useSelector((state) => state.auth)

    return (
        <>
            <div className="my-0 mx-auto w-9/12 mb-5">
            <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
                <p>
                    Project:
                        
                    <a className="text-custom-100 font-bold hover:text-custom-150" href={"/project/" + investment.project}> {investment.projectname}</a> 
                    
                </p>
                <p>
                    Investor:
                    {investment.user === user._id ? (
                        <>
                            {/* can view user profile via the link */}
                            <a className="text-custom-100 font-bold hover:text-custom-150" href={"/profile/" + investment.user}> You</a> 
                        </>
                    ) : (null)}
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

export default MyInvestmentItem