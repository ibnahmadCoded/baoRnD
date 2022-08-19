import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SideMenu from "../components/SideMenu";
import { getAnUpdate, resetupdates } from "../features/updates/updateSlice";
import IndividualUpdateItem from "../components/IndividualUpdateItem"

const Update = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    const { update } = useSelector((state) => state.updates)

    const params = useParams()

    useEffect(() => {
      if(!user){
          navigate("/landing")
      }

      dispatch(getAnUpdate(params.id))

      return() => {
        dispatch(resetupdates)
      }
    }, [user, navigate, params.id, dispatch])

    return (
        <>
        <section className="text-3xl font-bold py-0 px-5 content-center">
        <h1 className="text-center">Welcome {user && user.name}</h1>
        <p className="text-custom-120 text-2xl text-center">Here goes the full update</p>
        </section>

        {/* Dashborad Menu */}
        <section>
        <div class="container mx-auto">
            <div class="flex flex-row flex-wrap py-4">
            <section>
                {/* Side Menu */}
                <SideMenu />
            </section>

            <main role="main" class="w-full sm:w-2/3 pt-1 px-2">
                <section>
                    {update ? (
                        <div>
                            <IndividualUpdateItem key={update._id} update={update}/>
                        </div>
                    ) : (<h3>Update not found</h3>)}
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
                        href="/createproject"
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

export default Update