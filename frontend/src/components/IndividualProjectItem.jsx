import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { changeProjectVisibility, deleteProject } from "../features/project/projectSlice"
import { getStakeholders, deleteStakeholder, addStakeholder, resetstakeholders } from "../features/stakeholders/stakeholderSlice"
import Spinner from "./Spinner"

const IndividualProjectItem = ({project}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const { user } = useSelector((state) => state.auth)

    const { stakeholders, isLoadingStakeholder, isErrorStakeholder, isSuccessStakeholder, messageStakeholder } = useSelector((state) => state.stakeholders)

    const [follow, setFollow] = useState(() => {
        if(stakeholders.filter((stakeholder) => stakeholder.user === user._id).length === 1 
            && stakeholders.filter((stakeholder) => stakeholder.user === user._id)[0].type.includes("Follower")){
            return true
        }
        else{
            return false
        }
    })

    useEffect(() => {
      if(!user){
          navigate("/landing")
      }

      if(isErrorStakeholder){
        console.log(messageStakeholder)
      }

      if(isSuccessStakeholder){
      }

      dispatch(getStakeholders(params.id))

      return() => {
        dispatch(resetstakeholders)
      }

    }, [user, params.id, messageStakeholder, isErrorStakeholder, isSuccessStakeholder, navigate, dispatch])

    if(isLoadingStakeholder){
        return <Spinner />
      }

    return (
        <div className="my-0 mx-auto w-9/12 mb-5">

            {/* Allow users to delete projects that is theirs */}
            {project.user === user._id ? (
                <button 
                    onClick={() => dispatch(deleteProject(project._id))} 
                    className="bg-custom-150 float-right text-black w-16 h-10 rounded-tr-lg hover:bg-custom-100 hover:text-white">
                        Delete
                </button>
            ) : (
                <>
                {/* Show follow button if user is not following already and the project isnt the current user`s, else show unfollow */}
                
                {(stakeholders.filter((stakeholder) => stakeholder.user === user._id).length === 1 
                && 
                stakeholders.filter((stakeholder) => stakeholder.user === user._id)[0].type.indexOf("Follower") > -1 ) || (follow) ? (
                  
                        <button 
                            onClick={() => dispatch(deleteStakeholder({project: params.id, user: user._id, type: "Follower"}), setFollow(false))} 
                            className="bg-custom-100 float-right text-black w-16 h-10 rounded-tr-lg hover:bg-custom-150 hover:text-white">
                                Unfollow
                        </button>
                   
                   
                ) : (
                    <button 
                            onClick={() => dispatch(addStakeholder({project: params.id, user: user._id, type: "Follower", viewership: "true", update: "false",}), 
                            setFollow(true))} 
                            className="bg-custom-100 float-right text-black w-16 h-10 rounded-tr-lg hover:bg-custom-150 hover:text-white">
                                Follow
                    </button>
                )}
                </>
            )
            }
            
            <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
                <h2 className="text-2xl pt-7 text-custom-100 font-bold mb-2">
                    Title: {project.title}
                </h2>
                <div className="">
                    {"Created At: " + new Date(project.createdAt).toLocaleString("en-US")}
                    {project.visibility === "Public" ? (
                        <p className="text-custom-100">{project.visibility}</p>
                    ) : (
                        <p className="text-custom-150">{project.visibility}</p>
                    )}
                    
                </div>
                <p>
                    {/* Show seeking info if the project category is Collab and the project owner is accepting applications b*/}
                    {(project.category && project.category === "Collab" && project.acceptapps) ? (<>Seeking collaborator(s)</>) : (null)}
                </p>

                <p>
                    {/* Show seeking info if the project category is Sup and the project owner is accepting applications b*/}
                    {(project.category && project.category === "Sup" && project.acceptapps) ? (<>Seeking supervisor(s)</>) : (null)}
                </p>

                <p>
                    {/* Show seeking info if the project category is Dev and the project owner is accepting applications b*/}
                    {(project.category && project.category === "Dev" && project.acceptapps)? (<>Seeking developer(s)</>) : (null)}
                </p>

                <p>
                    {/* Show seeking info if the project category is Res and the project owner is accepting applications b*/}
                    {(project.category && project.category === "Res" && project.acceptapps) ? (<>Seeking researcher(s)</>) : (null)}
                </p>

                <p>
                    {/* Show seeking info if the project category is Collab, Dev, Fund, or Res and the project owner is accepting applications b*/}
                    {(project.category && project.category === "Fund" && project.acceptapps) ? (<>Seeking investment</>) : (null)}
                </p>

                <h3 className="text-1xl mt-5 text-custom-100 font-bold mb-2">
                    Overview
                </h3>
                <p className="mb-5">{project.overview}</p>

                <h3 className="text-1xl text-custom-100 font-bold mb-2">
                    Additional Information
                </h3>
                <p className="mb-5">{project.moreinfo}</p>

                <h3 className="text-1xl text-custom-100 font-bold mb-2">
                    Project Duration
                </h3>
                <p className="mb-5">{project.duration}</p>

                {(project.user === user._id && project.visibility === "Public")? (
                    <button 
                        onClick={() => dispatch(changeProjectVisibility({projectId: params.id, visibility: "Private"}))} 
                        className="rounded-lg hover:text-custom-150 text-custom-100 h-12 rounded-tr-lg">
                            Take project private
                    </button>
                ) : (null)}

                {(project.user === user._id && project.visibility === "Private")? (
                    <button 
                        onClick={() => dispatch(changeProjectVisibility({projectId: params.id, visibility: "Public"}))} 
                        className="rounded-lg hover:text-custom-150 text-custom-100 h-12 rounded-tr-lg">
                            Take project public
                    </button>
                ) : (null)}
            </div>
        </div>
    )
}

export default IndividualProjectItem