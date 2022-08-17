import { useSelector, useDispatch } from "react-redux"
import { deleteMaterial } from "../features/materials/materialSlice"

const MaterialItem = ({material}) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)

    return (
        <>
        <div className="my-0 mx-auto w-9/12 mb-5">
        <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
            <p>
                Type: {material.type}
            </p>
            {/* Allow users to delete milestones on projects that is theirs */}
            {project.user === user._id ? (
                <button 
                    onClick={() => dispatch(deleteMaterial(material._id))} 
                    className="text-black rounded-lg hover:bg-custom-100 bg-custom-150 float-right w-16 h-10 rounded-tr-lg hover:text-white">
                        Delete
                </button>
            ) : (null)}
            
                {material.type === "Link" ? (
                    <p>
                        Material: 
                        <a className="text-custom-100 hover:text-custom-150 text-bold" href={material.material}> {material.material}</a>
                    </p>
                    
                ) : (
                    <p>
                    Material: {material.material}
                    </p>
                )}
            {material.visibility === "Hidden" ? (
                <>
                {/* Only the porject owner who added the material can see hidden materials */}
                {project.user === user._id ? (
                    <p>
                        Visibility: <span className="text-custom-150">{material.visibility}</span> 
                    </p>
                ) : (null)}
                </>
            ) : (
                <p>
                    Visibility: {material.visibility}
                </p>
            )}
            
            <p>
                Created At: {new Date(material.createdAt).toLocaleString("en-Us")}
            </p>
        </div>
        </div>
        </>
    )
}

export default MaterialItem