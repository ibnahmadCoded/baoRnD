import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "../components/Spinner"
import SideMenu from "../components/SideMenu"
import NotificationItem from "../components/NotificationItem"
import { getNotifications, reset } from "../features/notifications/notificationSlice"

function Notification() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { notifications, isLoading, isError, isSuccess, message } = useSelector((state) => state.notifications)

    useEffect(() => {
      if(isError){
        console.log(message)
      }
      if(!user){
          navigate("/landing")
      }

      if(isSuccess){
      }

      dispatch(getNotifications())

      return() => {
        dispatch(reset)
      }
    }, [user, navigate, isError, isSuccess, message, dispatch])

    if(isLoading){
      return <Spinner />
    }
  return (
    <>
    <section className="text-3xl font-bold py-0 px-5 content-center">
      <h1 className="text-center">Welcome {user && user.name}</h1>
      <p className="text-custom-120 text-2xl text-center">Here are your notifications</p>
    </section>

    <section>
      <div class="container mx-auto">
        <div class="flex flex-row flex-wrap py-4">
          {/* Side Menu */}
          
          <SideMenu />

          <main role="main" class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
            {notifications.length > 0 ? 
              <div>
                {[...notifications].reverse().map((notification) => (
                  <>
                    <NotificationItem key={notification._id} notification={notification}/>
                  </>
                ))}
              </div>
            : 
            
              <p>You have no notifications</p>}
                
          </main>
        </div>
      </div>
    </section>
    </>
  )
}

export default Notification