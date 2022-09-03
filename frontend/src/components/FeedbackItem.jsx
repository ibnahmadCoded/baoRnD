import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const FeedbackItem = ({feedback, status}) => {
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
      if(!user){
          navigate("/landing")
      }
      
    }, [user, navigate])

    const [vote, setVote] = useState(false)
    const [votes, setVotes] = useState(feedback.upvotes)

    var s 

    const onVote = async (e, feedbackData) => {
        e.preventDefault()

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            },
        }

        const response = await axios.put(`/api/feedbacks/${feedback._id}`, feedbackData, config)

        if(response && feedbackData.upvote === "true"){
            setVote(true)
            setVotes(votes + 1)
            s = true
        }

        if(response && feedbackData.upvote === "false"){
            setVote(false)
            setVotes(votes - 1)
            s = false
        }

    }

    if(status){
        if (status.status){
            s = true
        }

        if (!status.status){
            s = false
        }
    }
    

    return (
        <>
            <div className="my-0 flex flex-row space-x-10 mx-auto w-9/12 mb-5">
                <div class="py-6 px-6 space-y-10 rounded-lg sm:px-10">
                    
                    {(vote || s) ? 

                        <button
                            onClick={e => onVote(e, {feedbackId: feedback._id, upvote: "false"})}
                            type="button"
                            id="downvote"
                            class="float-right"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#E36414" d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"/></svg>
                        </button> 
                    
                    : 
                        
                        <button
                            onClick={e => onVote(e, {feedbackId: feedback._id, upvote: "true"})}
                            type="button"
                            id="upvote"
                            class="float-right"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#E36414" d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12H15z"/></svg>
                        </button>
                        
                    }
                    
                    <p className="md:ml-3">{votes}</p>
                </div>
            
                <div className="bg-custom-50 w-11/12 py-8 px-6 rounded-lg sm:px-10">
                    {feedback.type === "Question" ? <p>Type: <span className="text-black">Question</span></p> : null}
                    {feedback.type === "Request" ? <p>Type: <span className="text-custom-100">Feature Request</span></p> : null}
                    {feedback.type === "Complaint" ? <p>Type: <span className="text-custom-150">Complaint</span></p> : null}
                    
                     Feedback:   {feedback.feedback}
                </div>
            </div>
        </>
    )
}

export default FeedbackItem