import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "../components/Spinner"
import { getfeedbacks, reset } from "../features/feedbacks/feedbackSlice"
import SideMenu from "../components/SideMenu"

function Support() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { feedbacks, isLoading, isError, isSuccess, message } = useSelector((state) => state.feedbacks)

    useEffect(() => {
      if(isError){
        console.log(message)
      }
      if(!user){
          navigate("/landing")
      }

      dispatch(getfeedbacks())

      return() => {
        dispatch(reset)
      }
    }, [user, navigate, isError, message, dispatch])

    if(isLoading){
      return <Spinner />
    }
  return (
    <>
    <section className="text-3xl font-bold py-0 px-5 content-center">
      <h1 className="text-center">Welcome {user && user.name}</h1>
      <p className="text-custom-120 text-2xl text-center">Here is the Support page</p>
    </section>

    {/* Dashborad Menu */}
    <section>
      <div class="container mx-auto">
        <div class="flex flex-row flex-wrap py-4">
          {/* Side Menu */}
          
          <SideMenu />

          <main role="main" class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
          
                <p>You can give us <a href="/givefeedback" class="text-custom-150 hover:text-custom-100">feedback</a> here, You can also upvote feedbacks if it is what you would like us to focus on. You can request new features 
                        using the feedback form or make a request to our support team using the same form. We read all feedbacks, we will surely get back to you. Thank you for your support.
                </p>
          </main>
        </div>
      </div>
    </section>
    </>
  )
}

export default Support