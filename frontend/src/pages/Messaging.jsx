import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import SideMenu2 from "../components/SideMenu";

const Messaging = () => {
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }
      }, [user, navigate])

    return (
        <>
        <section className="text-3xl font-bold py-0 px-5 content-center">
        <h1 className="text-center">Welcome {user && user.name}</h1>
        <p className="text-custom-120 text-2xl text-center">Here go your messages</p>
        </section>

        <section>
        <div class="container mx-auto">
            <div class="flex flex-row flex-wrap py-4">
            {/* Side Menu */}
            
            <SideMenu2 />

            <main role="main" class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
                <p>Sorry, the messaging service is still in testing stage. We will notify you when it is launched. Thank you!</p>
            </main>
            </div>
        </div>
        </section>
        </>
    )
}

export default Messaging