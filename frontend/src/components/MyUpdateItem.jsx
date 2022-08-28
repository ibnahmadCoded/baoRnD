import { useSelector, useDispatch } from "react-redux"
import { deleteUpdate } from "../features/updates/updateSlice"

const MyUpdateItem = ({update}) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

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
            
            <button 
                onClick={() => dispatch(deleteUpdate(update._id))} 
                className="text-black rounded-lg hover:bg-custom-100 bg-custom-150 float-right w-16 h-10 rounded-tr-lg hover:text-white">
                    Delete
            </button>
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
            <p className="mb-5">{update.content.substring(0,150) + "..."}</p>
            <a className="hover:text-custom-150" href={"/update/" + update._id}> View full update</a>
        </div>
        </div>
        </>
    )
}

export default MyUpdateItem