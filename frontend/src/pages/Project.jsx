import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SideMenu2 from "../components/SideMenu";
import { getProject, reset } from "../features/project/projectSlice";
import ProjectView from "../components/ProjectView";
import StakeholderView from "../components/StakeholderView";
import CodeView from "../components/CodeView";
import MaterialView from "../components/MaterialView";
import MilestoneView from "../components/MilestoneView";
import UpdateView from "../components/UpdateView";
import SideButtons from "../components/SideButtons";
import CategoryView from "../components/CategoryView";
import ApplicationView from "../components/ApplicationView";
import InvestmentView from "../components/InvestmentView";
import GoalView from "../components/GoalView";
import DeliverableView from "../components/DeliverableView";
import FieldView from "../components/FieldView";
import TagView from "../components/TagView";
import RequestView from "../components/RequestView";

const Project = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    const params = useParams()

    const [active, setActive] = useState(1);
    const [activeTab, setActiveTab] = useState(1);

    const SetView = (active) => {
      setActive(active);
      setActiveTab(active);
    };

    const ActiveView = () => {
      switch (active) {
        case 1:
          return <ProjectView />;
        case 2:
          return <StakeholderView />;
        case 3:
          return <CodeView />;
        case 4:
          return <MaterialView />;
        case 5:
          return <MilestoneView />;
        case 6:
          return <UpdateView />;
        case 7:
          return <ApplicationView />;
        case 8:
            return <InvestmentView />;
        case 9:
          return <CategoryView />;
        case 10:
          return <GoalView />;
        case 11:
          return <DeliverableView />
        case 12:
            return <RequestView />
        case 13:
            return <FieldView />
        case 14:
            return <TagView />
        default:
            return <ProjectView />;
      }
    };

    useEffect(() => {
      if(!user){
          navigate("/landing")
      }

      dispatch(getProject(params.id))

      return() => {
        dispatch(reset)
      }
    }, [user, navigate, params.id, dispatch])

    return (
        <>
        <section className="text-3xl font-bold py-0 px-5 content-center">
        {/* <h1 className="text-center">Welcome {user && user.name}</h1> */}
        <p className="text-custom-120 text-2xl text-center">Project</p>
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
                    className="md:ml-24 md:mb-0 sm:ml-5 border-custom-150 border-2 border-r-0 p-3 mx-auto text-black hover:bg-custom-100 hover:text-white">
                    Project
                </button>
                <button 
                    onClick={() => SetView(2)} 
                    style={{background: activeTab === 2 ? "#386641" : "", color: activeTab === 2 ? "#fff" : ""}}
                    className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Stakeholders
                </button>
                <button 
                    onClick={() => SetView(3)} 
                    style={{background: activeTab === 3 ? "#386641" : "", color: activeTab === 3 ? "#fff" : ""}}
                    className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Code
                </button>
                {/* continue from here */}
                <button 
                    onClick={() => SetView(4)} 
                    style={{background: activeTab === 4 ? "#386641" : "", color: activeTab === 4 ? "#fff" : ""}}
                    className="mb-0 border-custom-150 border-2 md:border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Materials
                </button>
                <button 
                    onClick={() => SetView(5)} 
                    style={{background: activeTab === 5 ? "#386641" : "", color: activeTab === 5 ? "#fff" : ""}}
                    className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Milestones
                </button>
                <button 
                    onClick={() => SetView(6)} 
                    style={{background: activeTab === 6 ? "#386641" : "", color: activeTab === 6 ? "#fff" : ""}}
                    className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Updates
                </button>
                <button 
                    onClick={() => SetView(7)} 
                    style={{background: activeTab === 7 ? "#386641" : "", color: activeTab === 7 ? "#fff" : ""}}
                    className="mb-0 border-custom-150 border-2 md:border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Applications
                </button>
                <button 
                    onClick={() => SetView(8)} 
                    style={{background: activeTab === 8 ? "#386641" : "", color: activeTab === 8 ? "#fff" : ""}}
                    className="mb-0 border-custom-150 border-2 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Investments
                </button>
              </section>

              <section class="hidden md:block">
                  <button 
                    onClick={() => SetView(9)} 
                    style={{background: activeTab === 9 ? "#386641" : "", color: activeTab === 9 ? "#fff" : ""}}
                    className="md:mb-5 md:mt-0 md:ml-60 border-custom-150 border-t-0 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Category
                  </button>
                  <button 
                    onClick={() => SetView(10)} 
                    style={{background: activeTab === 10 ? "#386641" : "", color: activeTab === 10 ? "#fff" : ""}}
                    className="mb-5 mt-0 border-custom-150 md:border-t-0 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Goals
                  </button>
                  <button 
                    onClick={() => SetView(11)} 
                    style={{background: activeTab === 11 ? "#386641" : "", color: activeTab === 11 ? "#fff" : ""}}
                    className="mb-5 mt-0 border-custom-150 md:border-t-0 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Deliverables
                  </button>
                  <button 
                    onClick={() => SetView(12)} 
                    style={{background: activeTab === 12 ? "#386641" : "", color: activeTab === 12 ? "#fff" : ""}}
                    className="mb-5 mt-0 border-custom-150 md:border-t-0 border-2 md:border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Requests
                  </button>
                  <button 
                    onClick={() => SetView(13)} 
                    style={{background: activeTab === 13 ? "#386641" : "", color: activeTab === 13 ? "#fff" : ""}}
                    className="mb-5 mt-0 border-custom-150 md:border-t-0 border-2 md:border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Fields
                  </button>
                  <button 
                    onClick={() => SetView(14)} 
                    style={{background: activeTab === 14 ? "#386641" : "", color: activeTab === 14 ? "#fff" : ""}}
                    className="mb-5 mt-0 border-custom-150 md:border-t-0 border-2 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Tags
                  </button>
              </section>

              <section class="md:hidden">
                <button 
                    onClick={() => SetView(1)} 
                    style={{background: activeTab === 1 ? "#386641" : "", color: activeTab === 1 ? "#fff" : ""}}
                    className="md:ml-24 md:mb-0 sm:ml-5 border-custom-150 border-2 border-r-0 p-3 mx-auto text-black hover:bg-custom-100 hover:text-white">
                    Project
                </button>
                <button 
                    onClick={() => SetView(2)} 
                    style={{background: activeTab === 2 ? "#386641" : "", color: activeTab === 2 ? "#fff" : ""}}
                    className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Stakeholders
                </button>
                <button 
                    onClick={() => SetView(3)} 
                    style={{background: activeTab === 3 ? "#386641" : "", color: activeTab === 3 ? "#fff" : ""}}
                    className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Code
                </button>
                {/* continue from here */}
                <button 
                    onClick={() => SetView(4)} 
                    style={{background: activeTab === 4 ? "#386641" : "", color: activeTab === 4 ? "#fff" : ""}}
                    className="mb-0 border-custom-150 border-2 md:border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Materials
                </button>
                <button 
                    onClick={() => SetView(5)} 
                    style={{background: activeTab === 5 ? "#386641" : "", color: activeTab === 5 ? "#fff" : ""}}
                    className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Milestones
                </button>
                <button 
                    onClick={() => SetView(6)} 
                    style={{background: activeTab === 6 ? "#386641" : "", color: activeTab === 6 ? "#fff" : ""}}
                    className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Updates
                </button>
                <button 
                    onClick={() => SetView(7)} 
                    style={{background: activeTab === 7 ? "#386641" : "", color: activeTab === 7 ? "#fff" : ""}}
                    className="mb-0 border-custom-150 border-2 md:border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Applications
                </button>
                <button 
                    onClick={() => SetView(8)} 
                    style={{background: activeTab === 8 ? "#386641" : "", color: activeTab === 8 ? "#fff" : ""}}
                    className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Investments
                </button>
                <button 
                    onClick={() => SetView(9)} 
                    style={{background: activeTab === 9 ? "#386641" : "", color: activeTab === 9 ? "#fff" : ""}}
                    className="border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Category
                  </button>
                  <button 
                    onClick={() => SetView(10)} 
                    style={{background: activeTab === 10 ? "#386641" : "", color: activeTab === 10 ? "#fff" : ""}}
                    className="mb-5 mt-0 border-custom-150 border-2 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Goals
                  </button>
                  <button 
                    onClick={() => SetView(11)} 
                    style={{background: activeTab === 11 ? "#386641" : "", color: activeTab === 11 ? "#fff" : ""}}
                    className="mb-5 border-custom-150 md:border-t-0 border-2 border-r-0 p-3 text-black hover:bg-custom-100 hover:text-white">
                    Deliverables
                  </button>
                  <button 
                    onClick={() => SetView(12)} 
                    style={{background: activeTab === 12 ? "#386641" : "", color: activeTab === 12 ? "#fff" : ""}}
                    className="mb-5 mt-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Requests
                  </button>
                  <button 
                    onClick={() => SetView(13)} 
                    style={{background: activeTab === 13 ? "#386641" : "", color: activeTab === 13 ? "#fff" : ""}}
                    className="mb-5 mt-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Fields
                  </button>
                  <button 
                    onClick={() => SetView(14)} 
                    style={{background: activeTab === 14 ? "#386641" : "", color: activeTab === 14 ? "#fff" : ""}}
                    className="mb-5 mt-0 border-custom-150 md:border-t-0 border-2 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Tags
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

export default Project