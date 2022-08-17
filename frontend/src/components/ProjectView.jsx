import IndividualProjectItem from "../components/IndividualProjectItem";
import { useSelector } from "react-redux"

const ProjectView = () => {
    const { project } = useSelector((state) => state.project)

    return (
        <>   
        <section className="content">
            {project ? (
                <div>
                    <IndividualProjectItem key={project._id} project={project}/>
                </div>
            ) : (<h3>Project not found</h3>)}
        </section>          
        </>
    )
}

export default ProjectView