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
    const SetView = (active) => {
      setActive(active);
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
        <h1 className="text-center">Welcome {user && user.name}</h1>
        <p className="text-custom-120 text-2xl text-center">Here goes the project</p>
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
                <button 
                    onClick={() => SetView(1)} 
                    className="ml-24 mb-0 border-custom-150 border-2 border-r-0 p-3 mx-auto text-black hover:bg-custom-100 hover:text-white">
                    Project
                </button>
                <button 
                    onClick={() => SetView(2)} 
                    className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Stakeholders
                </button>
                <button 
                    onClick={() => SetView(3)} 
                    className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Code
                </button>
                {/* continue from here */}
                <button 
                    onClick={() => SetView(4)} 
                    className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Materials
                </button>
                <button 
                    onClick={() => SetView(5)} 
                    className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Milestones
                </button>
                <button 
                    onClick={() => SetView(6)} 
                    className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Updates
                </button>
                <button 
                    onClick={() => SetView(7)} 
                    className="mb-0 border-custom-150 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Applications
                </button>
                <button 
                    onClick={() => SetView(8)} 
                    className="mb-0 border-custom-150 border-2 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Investments
                </button>
              </section>

              <section>
                  <button 
                    onClick={() => SetView(9)} 
                    className="mb-5 mt-0 ml-60 border-custom-150 border-t-0 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Category
                  </button>
                  <button 
                    onClick={() => SetView(10)} 
                    className="mb-5 mt-0 border-custom-150 border-t-0 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Goals
                  </button>
                  <button 
                    onClick={() => SetView(11)} 
                    className="mb-5 mt-0 border-custom-150 border-t-0 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Deliverables
                  </button>
                  <button 
                    onClick={() => SetView(12)} 
                    className="mb-5 mt-0 border-custom-150 border-t-0 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Requests
                  </button>
                  <button 
                    onClick={() => SetView(13)} 
                    className="mb-5 mt-0 border-custom-150 border-t-0 border-2 border-r-0 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
                    Fields
                  </button>
                  <button 
                    onClick={() => SetView(14)} 
                    className="mb-5 mt-0 border-custom-150 border-t-0 border-2 mx-auto p-3 text-black hover:bg-custom-100 hover:text-white">
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