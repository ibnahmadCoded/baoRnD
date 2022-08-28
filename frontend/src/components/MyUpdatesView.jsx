import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getUserUpdates, resetupdates } from "../features/updates/updateSlice"
import Spinner from "./Spinner"
import MyUpdateItem from "./MyUpdateItem"

const MyUpdatesView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { updates, isLoadingUpdate, isErrorUpdate, isSuccessUpdate, messageUpdate } = useSelector((state) => state.updates)

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }
  
        if(isErrorUpdate){
          console.log(messageUpdate)
        }

        if(isSuccessUpdate){
        }

        dispatch(getUserUpdates())
  
        return() => {
          dispatch(resetupdates)
        }
  
      }, [user, messageUpdate, isSuccessUpdate, isErrorUpdate, navigate, dispatch])

    if(isLoadingUpdate){
          return <Spinner />
    }

    return (
        <>
        <section>
        <p className="md:ml-28 md:mb-5">You can find all your project updates here. Only text updates for now. We are still in beta stage. Please bear with us.</p>

            {updates.length > 0 ? (
                <div>
                    {[...updates].reverse().map((update) => (
                        <>
                        {update.user === user._id ? (
                            <MyUpdateItem key={update._id} update={update}/>
                        ) : (null)}
                        </>
                    ))}
                </div>
            ) : (<h3>No updates can be found</h3>)}

        </section>
        </>
    )
}

export default MyUpdatesView