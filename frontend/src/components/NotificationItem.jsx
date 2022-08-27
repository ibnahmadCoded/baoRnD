import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import moment from 'moment';
import { deleteNotification, updateNotification } from "../features/notifications/notificationSlice";
//const dateTimeAgo = moment(new Date(created_at)).fromNow();

const NotificationItem = ({notification}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)

    const onClickMyProfile = (e) => {
        e.preventDefault()

        dispatch(updateNotification(notification._id))

        navigate("/myprofile")
    }

    const onClickUserProfile = (e) => {
        e.preventDefault()

        dispatch(updateNotification(notification._id))

        navigate(`/profile/${notification.item}`)
    }

    const onClickProjectPage = (e) => {
        e.preventDefault()

        dispatch(updateNotification(notification._id))

        navigate(`/project/${notification.item}`)
    }

    const onClickUpdatePage = (e) => {
        e.preventDefault()

        dispatch(updateNotification(notification._id))

        navigate(`/update/${notification.item}`)
    }



    return (
        <>
        {notification.seen ? 
            (
                <div className="my-0 mx-auto w-9/12 border border-custom-150">
                    <div class="bg-white py-8 px-6 sm:px-10">

                        {notification.type === "PasswordReset" ? 
                        <div onClick={onClickMyProfile} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>You reset your password</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "Signup" ? 
                        <div onClick={onClickMyProfile} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>Welcome to baoRnD</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "Referral" ? 
                        <div onClick={onClickMyProfile} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>You referred a new user. Thank you!</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "ReferralSignup" ? 
                        <div onClick={onClickUserProfile} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>A user you referred has joined baoRnD.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "ProjectInit" ? 
                        <div onClick={onClickProjectPage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>You created a new project.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "Investment" ? 
                        <div onClick={onClickProjectPage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>Someone invested in your project.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "ProjectApplication" ? 
                        <div onClick={onClickProjectPage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>Someone applied in your project.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "ProjectUpdate" ? 
                        <div onClick={onClickProjectPage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>You edited your project.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "ContactRequest" ? 
                        <div onClick={onClickMyProfile} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>You have a contact request.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "ContactRequestAccepted" ? 
                        <div onClick={onClickMyProfile} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>Your contact request was accepted.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "ContactAdded" ? 
                        <div onClick={onClickMyProfile} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>A new contact has been added to your contact list.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "ProjectApplicationRejected" ? 
                        <div onClick={onClickProjectPage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>We are so sorry, your application was rejected.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "ProjectApplicationAccepted" ? 
                        <div onClick={onClickProjectPage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>Congrats, your application was acceptd.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "Request" ? 
                        <div onClick={onClickProjectPage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>You have a request on a project you are on.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "RequestReply" ? 
                        <div onClick={onClickProjectPage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>Your have a reply to your request on a project.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "UpdatePush" ? 
                        <div onClick={onClickUpdatePage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>An update was pushed to a project you are on or you follow.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "UpdateComment" ? 
                        <div onClick={onClickUpdatePage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>An update was pushed to a project you are on or you follow.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        <p className=" text-sm">
                            {moment(new Date(notification.createdAt)).fromNow()}
                        </p>

                        <button 
                            onClick={() => dispatch(deleteNotification(notification._id))} 
                            className="text-custom-100 hover:text-custom-150 mt-5">
                                Delete
                        </button>
                    </div>
                </div>
            )
            : 
            (
                <div className="my-0 mx-auto w-9/12 border border-custom-150">
                    <div class="bg-custom-50 py-8 px-6 sm:px-10">

                        {notification.type === "PasswordReset" ? 
                        <div onClick={onClickMyProfile} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>You reset your password</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "Signup" ? 
                        <div onClick={onClickMyProfile} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>Welcome to baoRnD</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "Referral" ? 
                        <div onClick={onClickMyProfile} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>You referred a new user. Thank you!</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "ReferralSignup" ? 
                        <div onClick={onClickUserProfile} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>A user you referred has joined baoRnD.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "ProjectInit" ? 
                        <div onClick={onClickProjectPage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>You created a new project.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "Investment" ? 
                        <div onClick={onClickProjectPage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>Someone invested in your project.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "ProjectApplication" ? 
                        <div onClick={onClickProjectPage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>Someone applied your project.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "ProjectUpdate" ? 
                        <div onClick={onClickProjectPage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>You edited your project.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "ContactRequest" ? 
                        <div onClick={onClickMyProfile} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>You have a contact request.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "ContactRequestAccepted" ? 
                        <div onClick={onClickMyProfile} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>Your contact request was accepted.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "ContactAdded" ? 
                        <div onClick={onClickMyProfile} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>A new contact has been added to your contact list.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "ProjectApplicationRejected" ? 
                        <div onClick={onClickProjectPage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>We are so sorry, your application was rejected.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "ProjectApplicationAccepted" ? 
                        <div onClick={onClickProjectPage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>Congrats, your application was acceptd.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "Request" ? 
                        <div onClick={onClickProjectPage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>You have a request on a project.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "RequestReply" ? 
                        <div onClick={onClickProjectPage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>Your have a reply to your request on a project.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "UpdatePush" ? 
                        <div onClick={onClickUpdatePage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>An update was pushed to a project you are on or you follow.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        {notification.type === "UpdateComment" ? 
                        <div onClick={onClickUpdatePage} style={{cursor:'pointer'}}>
                            {notification.user === user._id ? (
                                <>  
                                    <p>An update was pushed to a project you are on or you follow.</p>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        : 
                        null}

                        <p className=" text-sm">
                            {moment(new Date(notification.createdAt)).fromNow()}
                        </p>

                        <button 
                            onClick={() => dispatch(deleteNotification(notification._id))} 
                            className="text-custom-100 hover:text-custom-150 mt-5">
                                Delete
                        </button>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default NotificationItem