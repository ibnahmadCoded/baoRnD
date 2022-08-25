import ProjectForm from "../components/ProjectForm"
import SideMenu from "../components/SideMenu"

const CreateProject = () => {
    return (
      <>
        <section className="text-3xl font-bold py-0 px-5 content-center">
          <h1 className="text-center">Add New Project</h1>
          <p className="text-custom-120 text-2xl text-center">Project Form</p>
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
                <section className="my-0 mx-auto w-9/12">
                  <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                    <ProjectForm/>   
                  </div>
                </section>        
              </main>
              <section>
                  {/* Side Button */}
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

export default CreateProject