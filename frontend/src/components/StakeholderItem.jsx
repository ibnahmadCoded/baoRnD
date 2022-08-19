import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteStakeholder } from "../features/stakeholders/stakeholderSlice"

const StakeholderItem = ({stakeholder}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)
    const [types, setTypes] = useState(stakeholder.type)

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }

    }, [user, navigate])
    
    return (
        <div className="my-0 mx-auto w-9/12 mb-5">
            
            <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
                <p className="text-custom-100 text-bold hover:text-custom-150">
                    {stakeholder.user === user._id ? (
                    <>
                        <a href={"/profile/" + stakeholder.user}>You</a> {/* can view user profile via the link */}
                        </>
                    ) : (
                        <>
                        <a href={"/profile/" + stakeholder.user}>{stakeholder.username}</a> {/* can view user profile via the link */}
                        </>
                    )
                    }
                </p>
                {stakeholder.viewership ? (<p>Has viewership: <span className="text-custom-100">Yes</span></p>) : 
                (<p>Has viewership: <span className="text-custom-150">No</span></p>)}
                {stakeholder.update ? (<p>Can push project updates: <span className="text-custom-100">Yes</span></p>) : 
                (<p>Can push project updates: <span className="text-custom-150">No</span></p>)}
                <div className="mt-5">
                    {types.map((stake) => (
                        <p key={stake}>
                            {stake}
                            {/* Allow users to delete stakeholders on projects that is theirs or if they are the stakeholder */}
                            {/* Cant delete initator. YOu have delete the project itself */}
                            {(project.user === user._id && stake !== "Initiator") || (stakeholder.user === user._id && stake !== "Initiator") ? (
                                <button 
                                    onClick={() => dispatch(deleteStakeholder({project: project._id, user: stakeholder.user, type: stake}))} 
                                    className="text-black mx-20 rounded-lg hover:bg-custom-100 hover:text-white">
                                        X
                                </button>
                            ) : (null)}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StakeholderItem