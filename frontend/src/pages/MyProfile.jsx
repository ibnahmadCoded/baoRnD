import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import SideMenu2 from "../components/SideMenu";
import { getUsers, resetusers } from "../features/users/userSlice";
import Spinner from "../components/Spinner";
import SideButtons from "../components/SideButtons";
import ProfileView from "../components/ProfileView";
import ContactView from "../components/ContactView";
import ReferralsView from "../components/ReferralsView";
import MyUpdatesView from "../components/MyUpdatesView";
import MyApplicationsView from "../components/MyApplicationsView";
import MyInvestmentView from "../components/MyInvestmentView";
import MyRequestsView from "../components/MyRequestsView";
import SettingsView from "../components/SettingsView";

const MyProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { users, isLoadingUsers, isErrorUsers, isSuccessUsers, messageUsers } = useSelector((state) => state.users)

    const [active, setActive] = useState(1);
    const [activeTab, setActiveTab] = useState(1);
    const SetView = (active) => {
      setActive(active);
      setActiveTab(active);
    };

    const ActiveView = () => {
      switch (active) {
        case 1:
          return <ProfileView />;
        case 2:
          return <ContactView users={users}/>;
        case 3:
          return <ReferralsView />
        case 4:
          return <MyUpdatesView />
        case 5:
          return <MyApplicationsView />
        case 6:
          return <MyInvestmentView />
        case 7:
          return <MyRequestsView />
        case 8:
          return <SettingsView />
        default:
            return <ProfileView />;
      }
    };

    useEffect(() => {
      if(isErrorUsers){
        console.log(messageUsers)
      }
      if(!user){
          navigate("/landing")
      }

      if(isSuccessUsers){
      }

      dispatch(getUsers())

      // remove the return if u want it to persist
      return() => {
        dispatch(resetusers)
      }
    }, [user, navigate, isErrorUsers, isSuccessUsers, messageUsers, dispatch])

    if(isLoadingUsers){
      return <Spinner />
    }

    return (
      <>
      <section className="text-3xl font-bold py-0 px-5 content-center">
      {/* <h1 className="text-center">Welcome {user && user.name}</h1> */}
      <p className="text-custom-120 text-2xl text-center">My Profile</p>
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
            <section class="hidden md:block">
              <button 
                  onClick={() => SetView(1)} 
                  style={{background: activeTab === 1 ? "#386641" : "", color: activeTab === 1 ? "#fff" : ""}}
                  className="ml-24 mb-0 border-custom-150 border-2 border-r-0 p-3 mx-auto text-black hover:bg-custom-100 hover:text-white">
                  Profile
              </button>
              <button 
                  onClick={() => SetView(2)} 
                  style={{background: activeTab === 2 ? "#386641" : "", color: activeTab === 2 ? "#fff" : ""}}
                  className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                  Contacts
              </button>
              <button 
                  onClick={() => SetView(3)} 
                  style={{background: activeTab === 3 ? "#386641" : "", color: activeTab === 3 ? "#fff" : ""}}
                  className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                  Referrals
              </button>
              {/* continue from here */}
              <button 
                  onClick={() => SetView(4)} 
                  style={{background: activeTab === 4 ? "#386641" : "", color: activeTab === 4 ? "#fff" : ""}}
                  className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                  Updates
              </button>
              <button 
                  onClick={() => SetView(5)} 
                  style={{background: activeTab === 5 ? "#386641" : "", color: activeTab === 5 ? "#fff" : ""}}
                  className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                  Applications
              </button>
              <button 
                  onClick={() => SetView(6)} 
                  style={{background: activeTab === 6 ? "#386641" : "", color: activeTab === 6 ? "#fff" : ""}}
                  className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                  Investments
              </button>
              <button 
                  onClick={() => SetView(7)} 
                  style={{background: activeTab === 7 ? "#386641" : "", color: activeTab === 7 ? "#fff" : ""}}
                  className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                  Requests
              </button>
              <button 
                  onClick={() => SetView(8)} 
                  style={{background: activeTab === 8 ? "#386641" : "", color: activeTab === 8 ? "#fff" : ""}}
                  className="mb-0 border-custom-150 border-2 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                  Settings
              </button>
            </section>

            <section class="md:hidden">
              <button 
                  onClick={() => SetView(1)} 
                  style={{background: activeTab === 1 ? "#386641" : "", color: activeTab === 1 ? "#fff" : ""}}
                  className="mb-0 border-custom-150 border-2 border-r-0 p-3 mx-auto text-black hover:bg-custom-100 hover:text-white">
                  Profile
              </button>
              <button 
                  onClick={() => SetView(2)} 
                  style={{background: activeTab === 2 ? "#386641" : "", color: activeTab === 2 ? "#fff" : ""}}
                  className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                  Contacts
              </button>
              <button 
                  onClick={() => SetView(3)} 
                  style={{background: activeTab === 3 ? "#386641" : "", color: activeTab === 3 ? "#fff" : ""}}
                  className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                  Referrals
              </button>
              {/* continue from here */}
              <button 
                  onClick={() => SetView(4)} 
                  style={{background: activeTab === 4 ? "#386641" : "", color: activeTab === 4 ? "#fff" : ""}}
                  className="mb-0 border-custom-150 border-2 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                  Updates
              </button>
              <button 
                  onClick={() => SetView(5)} 
                  style={{background: activeTab === 5 ? "#386641" : "", color: activeTab === 5 ? "#fff" : ""}}
                  className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                  Applications
              </button>
              <button 
                  onClick={() => SetView(6)} 
                  style={{background: activeTab === 6 ? "#386641" : "", color: activeTab === 6 ? "#fff" : ""}}
                  className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                  Investments
              </button>
              <button 
                  onClick={() => SetView(7)} 
                  style={{background: activeTab === 7 ? "#386641" : "", color: activeTab === 7 ? "#fff" : ""}}
                  className="mb-0 border-custom-150 border-2 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                  Requests
              </button>
              <button 
                  onClick={() => SetView(8)} 
                  style={{background: activeTab === 8 ? "#386641" : "", color: activeTab === 8 ? "#fff" : ""}}
                  className="mb-0 border-custom-150 border-2 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                  Settings
              </button>
            </section>
            
            {ActiveView()}
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

export default MyProfile