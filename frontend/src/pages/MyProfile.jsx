import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import SideMenu from "../components/SideMenu";
import { getUsers, resetusers } from "../features/users/userSlice";
import Spinner from "../components/Spinner";

const MyProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { users, isLoadingUsers, isErrorUsers, isSuccessUsers, messageUsers } = useSelector((state) => state.users)

    useEffect(() => {
      if(isErrorUsers){
        console.log(messageUsers)
      }
      if(!user){
          navigate("/landing")
      }

      dispatch(getUsers())

      // remove the return if u want it to persist
      return() => {
        dispatch(resetusers)
      }
    }, [user, navigate, isErrorUsers, messageUsers, dispatch])

    if(isLoadingUsers){
      return <Spinner />
    }

    return (
        <>
        <section className="text-3xl font-bold py-0 px-5 content-center">
        <h1 className="text-center">Welcome {user && user.name}</h1>
        <p className="text-custom-120 text-2xl text-center">Here go your profile</p>
        </section>

        <section>
        <div class="container mx-auto">
            <div class="flex flex-row flex-wrap py-4">
            {/* Side Menu */}
            
            <SideMenu />

            <main role="main" class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
                
            </main>
            </div>
        </div>
        </section>
        </>
    )
}

export default MyProfile