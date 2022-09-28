import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux"
import { deleteUpdate } from "../features/updates/updateSlice"
import Quill from "quill";

const UpdateItem = ({update}) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)

    const  wrapperRef = useCallback((wrapper) => {
        if(wrapper == null) return

        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
        const quill = new Quill(editor)
        quill.setContents(update.content)
        quill.setText(quill.getText(0, 150))
        quill.disable()
    }, [update.content])

    return (
        <>
        <div className="my-0 mx-auto w-9/12 mb-5">
        <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
            <p className="text-custom-100 text-bold">
                Update made by 
                    {update.user === user._id ? (
                    <>
                        <a className="hover:text-custom-150 font-bold" href={"/profile/" + update.user}> you </a> {/* can view user profile via the link */}
                        </>
                    ) : (
                        <>
                        <a className="hover:text-custom-150 font-bold" href={"/profile/" + update.user}>{update.username}</a> {/* can view user profile via the link */}
                        </>
                    )
                    }
                    on  
                     {" " + new Date(update.createdAt).toLocaleString("en-Us")}
            </p>
            {/* Allow users to delete an update that is theirs or an update that is on a project they created */}
            {(project.user === user._id || update.user === user._id) ? (
                <button 
                    onClick={() => dispatch(deleteUpdate(update._id))} 
                    className="text-black rounded-lg hover:bg-custom-100 bg-custom-150 float-right w-16 h-10 rounded-tr-lg hover:text-white">
                        Delete
                </button>
            ) : (null)}
            <>
            {update.type === "Normal" ? (
                <p >
                    Type: <span className="text-custom-100">{update.type}</span>
                </p>
            ) : (
                <p>
                    Type: <span className="text-custom-150">{update.type}</span>
                </p>
            )}
            </>

           
            {update.content !== "Not available" ? (
                <>  
                    {typeof(update.content) == "string" ? 
                        <p className="mb-5">{update.content.substring(0,150) + "..."}</p> 
                    : 
                        <div ref={wrapperRef}></div>
                    }
                    
                    <a className="hover:text-custom-150" href={"/update/" + update._id}> View full update</a>
                </>
            ) : (
                <p className="mb-5">{update.content}</p>
            )}
          
        </div>
        </div>
        </>
    )
}

export default UpdateItem