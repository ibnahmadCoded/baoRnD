import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteProject } from "../features/projects/projectSlice"

const ProjectItem = ({project}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
      if(!user){
          navigate("/landing")
      }
    }, [user, navigate])

    return (
        <div className="my-0 mx-auto w-9/12 mb-5">

            {/* Allow users to delete projects that is theirs */}
            {project.user === user._id ? (
                <button 
                    onClick={() => dispatch(deleteProject(project._id))} 
                    className="bg-custom-150 float-right text-black w-16 h-10 rounded-tr-lg hover:bg-custom-100 hover:text-white">
                        Delete
                </button>
            ) : (null)}
            
            <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
                <h2 className="text-2xl text-custom-100 text-bold hover:text-custom-150">
                    <a href={"/project/" + project._id}>{project.title}</a>
                </h2>
                {project.visibility === "Public" ? (
                    <p className="text-custom-100">{project.visibility}</p>
                ) : (
                    <p className="text-custom-150">{project.visibility}</p>
                )}
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
                <p className="mb-3 mt-3">Overview: {project.overview.substring(0,250) + "..."}</p>
                <div>
                    {"Created At: " + new Date(project.createdAt).toLocaleString("en-US")}
                </div>
            </div>
        </div>
    )
}

export default ProjectItem