import ReferralForm from "../components/ReferralForm"
import SideMenu2 from "../components/SideMenu"

const ReferUser = () => {
    return (
        <>
          <section className="py-0 px-5 content-center">
            <h1 className="text-center text-3xl font-bold ">Refer New User</h1>
            <p>
                Sorry we are still carefully easing new users unto this platform. But you can refer a user you want to start using baoRnD immediately.
                Think of rreferring people like Supervisors, researchers, collaborators or developers who are already part of your project(s).
            </p>
            <p className="text-custom-120 text-2xl text-center">Referral Form</p>
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
                  <section className="my-0 mx-auto w-9/12">
                    <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                        <ReferralForm />
                    </div>
                  </section>        
                </main>
                <section>
                    {/* Side Button */}
                    <div class="py-8 px-6 mx-auto ">
                    <a
                        href="/createproject"
                        class="p-3 px-6 pt-2 shadow-2xl text-black bg-custom-150 rounded-full baseline hover:bg-custom-100 hover:text-white">Send Referral
                    </a>
                  </div>
                </section>
              </div>
            </div>
          </section>
          </>
      )
}

export default ReferUser