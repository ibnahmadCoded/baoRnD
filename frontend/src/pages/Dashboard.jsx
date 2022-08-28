import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "../components/Spinner"
import { getProjects, reset } from "../features/projects/projectSlice"
import SideMenu2 from "../components/SideMenu"
import ProjectItem from "../components/ProjectItem"
import SideButtons from "../components/SideButtons"

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { projects, isLoading, isError, isSuccess, message } = useSelector((state) => state.projects)

    useEffect(() => {
      if(isError){
        console.log(message)
      }
      if(!user){
          navigate("/landing")
      }

      if(isSuccess){
      }

      dispatch(getProjects())

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
        <p className="text-custom-120 text-2xl text-center">Projects</p>
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
              <section className="content">
                {projects.length > 0 ? (
                  <div>
                    {projects.map((project) => (
                      <ProjectItem key={project._id} project={project}/>
                    ))}
                  </div>
                ) : (<h3>No projects can be found</h3>)}
              </section>            
            </main>

            <section>
                {/* Side Buttons */}
                <SideButtons />
            </section>
            
            
          </div>
        </div>
      </section>
      </>
    )
}

export default Dashboard