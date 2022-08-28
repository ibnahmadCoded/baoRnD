import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SideMenu2 from "../components/SideMenu";
import { getUser, resetusers } from "../features/users/userSlice";

const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    const { auser } = useSelector((state) => state.users)

    const params = useParams()

    useEffect(() => {
      if(!user){
          navigate("/landing")
      }

      dispatch(getUser(params.id))

      return() => {
        dispatch(resetusers)
      }
    }, [user, navigate, params.id, dispatch])

    return (
        <>
        <section className="text-3xl font-bold py-0 px-5 content-center">
        <h1 className="text-center">Welcome {user && user.name}</h1>
        <p className="text-custom-120 text-2xl text-center">Here goes the user profile</p>
        </section>

        {/* Dashborad Menu */}
        <section>
        <div class="container mx-auto">
            <div class="flex flex-row flex-wrap py-4">
            <section>
                {/* Side Menu */}
                <SideMenu2 />
            </section>

            <main role="main" class="w-full sm:w-2/3 pt-1 px-2">
                <section>
                <p className="md:ml-28 md:mb-5">You will soon be able to glimpse other details about the user here. 
                    NOTE: this is still in beta stage. Please bear with us.
                </p>
                    {auser ? (
                        <div className="my-0 mx-auto w-9/12 mb-5">
                            <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
                                <p>
                                    Name: <span className="text-custom-100 font-bold">{auser.name}</span>
                                </p>
                    
                                <p>
                                    Account type: {auser.type}
                                </p>
                            </div>
                        </div>
                    ) : (<h3>User not found</h3>)}
                </section>   
            </main>

            <section>
                {/* Create Project Button */}
                <div class="py-8 px-6 mx-auto ">
                    <a
                        href="/createproject"
                        class="p-3 px-6 pt-2 shadow-2xl text-black bg-custom-150 rounded-full baseline hover:bg-custom-100 hover:text-white">Add New Project
                    </a>
                </div>
                <div class="py-8 px-6 mx-auto ">
                    <a
                        href="/refer"
                        class="p-3 px-6 pt-2 shadow-2xl text-black bg-custom-150 rounded-full baseline hover:bg-custom-100 hover:text-white">Refer Stakeholder
                    </a>
                </div>
            </section>
            </div>
        </div>
        </section>
        </>
    )
}

export default Profile