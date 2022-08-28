import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import { getfeedbacks, reset, submitfeedback } from "../features/feedbacks/feedbackSlice"
import SideMenu2 from "../components/SideMenu"
import FeedbackItem from "../components/FeedbackItem"
import { getfeedbackStatus } from "../features/feedbackstatus/statusSlice"

function Support() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { feedbacks, isLoading, isError, isSuccess, message } = useSelector((state) => state.feedbacks)
    const { status, isLoadingS, isErrorS, isSuccessS, messageS } = useSelector((state) => state.feedbackstatus)

    const [formData, setFormData] = useState({
      feedback: ''
    })

    const { feedback } = formData

    useEffect(() => {
      if(!user){
        navigate("/landing")
      }

      if(isError){
        console.log(message)
      }

      if(isErrorS){
        console.log(messageS)
      }

      if(isSuccess){
      }

      if(isSuccessS){
      }

      dispatch(getfeedbacks())

      dispatch(getfeedbackStatus())

      return() => {
        dispatch(reset)
      }
    }, [user, navigate, isError, isErrorS, message, messageS, isSuccessS, isSuccess, dispatch])

    if(isLoading){
      return <Spinner />
    }

    if(isLoadingS){
      return <Spinner />
    }

    const onChange = (e) => {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
      }))
  }

  const onSubmit = (e) => {
      e.preventDefault()

      const feedbackData = {
          feedback: feedback,
      }

      dispatch(submitfeedback(feedbackData))

      toast.success("Feedback successfully submitted. Thank you.")

      setFormData({
          feedback: ""
      })
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
          
          <SideMenu2 />

          <main role="main" class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
          
                <p class="md:ml-28 md:mb-5">You can give us <a href="/givefeedback" class="text-custom-150 hover:text-custom-100">feedback</a> here, You can also upvote feedbacks if it is what you would like us to focus on. You can request new features 
                        using the feedback form or make a request to our support team using the same form. We read all feedbacks, we will surely get back to you. Thank you for your support.
                </p>

                <section className="my-0 mx-auto w-9/12">
                  <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                    <form onSubmit={onSubmit}>
                      <div class="mb-4">
                        <textarea type="textarea" id="feedback" name="feedback"
                          class="shadow-sm bg-gray-50 border h-32 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                          placeholder="Write your feedback" value={feedback} onChange={onChange} required 
                        />
                      </div>
                                    
                      <div>
                        <button type="submit" class="text-white bg-custom-100 hover:bg-custom-150 focus:ring-4 focus:outline-none focus:ring-custom-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Submit Feedback</button>
                      </div>
                    </form>
                  </div>
                </section>

                {feedbacks.length > 0 ? (
                  <div>
                    {feedbacks.map((feedback) => (
                      <>
                      <FeedbackItem key={feedback._id} feedback={feedback} status={status.filter((s) => s.feedback === feedback._id)[0]}/>
                      </>
                    ))}
                  </div>
                ) : (<h3>No feedbacks can be found</h3>)}

          </main>
        </div>
      </div>
    </section>
    </>
  )
}

export default Support