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
            {/* Allow users to delete milestones on projects that is theirs */}
            {project.user === user._id ? (
                <button 
                    onClick={() => dispatch(deleteMaterial(material._id))} 
                    className="text-black rounded-lg hover:bg-custom-100 bg-custom-150 float-right w-16 h-10 rounded-tr-lg hover:text-white">
                        Delete
                </button>
            ) : (null)}

                {material.type === "Link" && material.visibility === "Hidden" && project.user === user._id ? (
                    /// update. stakeholders should be able to see hidden materials also. (maybe from backend)
                    <>
                    <p>
                        Type: {material.type}
                    </p>
                    <p>
                        Material: 
                        {material.material.substring(0, 4) !== "http" ? 
                            <a className="text-custom-100 hover:text-custom-150 text-bold" target="_blank" rel="noreferrer" href={"https://" + material.material}> {material.material}</a>
                        : 
                            <a className="text-custom-100 hover:text-custom-150 text-bold" target="_blank" rel="noreferrer" href={material.material}> {material.material}</a>
                        }
                    </p>

                    <p>
                        Visibility: <span className="text-custom-150">Hidden</span>
                    </p>
                    <p>
                        Created At: {new Date(material.createdAt).toLocaleString("en-Us")}
                    </p>
                    </>
                ) : (
                    null
                )}

                {material.type === "Link" && material.visibility === "Visible" ? (
                    <>
                    <p>
                        Type: {material.type}
                    </p>
                    <p>
                        Material: 
                        {material.material.substring(0, 4) !== "http" ? 
                            <a className="text-custom-100 hover:text-custom-150 text-bold" target="_blank" rel="noreferrer" href={"https://" + material.material}> {material.material}</a>
                        : 
                            <a className="text-custom-100 hover:text-custom-150 text-bold" target="_blank" rel="noreferrer" href={material.material}> {material.material}</a>
                        }
                    </p>

                    <p>
                        Visibility: <span className="text-custom-100">Visible</span> 
                    </p>
                    <p>
                        Created At: {new Date(material.createdAt).toLocaleString("en-Us")}
                    </p>
                    </>
                ) : (
                    null
                )}

                {material.type === "Text" && material.visibility === "Hidden" && project.user === user._id ? (
                    /// update. stakeholders should be able to see hidden materials also. (maybe from backend)
                    <>
                    <p>
                        Type: {material.type}
                    </p>
                    <p>
                        Material: {material.material}
                    </p>
                    <p>
                        Visibility: <span className="text-custom-150">Hidden</span>
                    </p>
                    <p>
                        Created At: {new Date(material.createdAt).toLocaleString("en-Us")}
                    </p>
                    </>
                    
                ) : (
                    null
                )}

                {material.type === "Text" && material.visibility === "Visible" ? (
                    <>
                    <p>
                        Type: {material.type}
                    </p>
                    <p>
                        Material: {material.material}
                    </p>
                    <p>
                        Visibility: <span className="text-custom-100">Visible</span>
                    </p>
                    <p>
                        Created At: {new Date(material.createdAt).toLocaleString("en-Us")}
                    </p>
                    </>
                ) : (
                    null
                )}

                {material.type === "File" && material.visibility === "Hidden" && project.user === user._id ? (
                    /// update. stakeholders should be able to see hidden materials also. (maybe from backend)
                    <>
                    <p>
                        Type: {material.type}
                    </p>
                    <p>
                        Visibility: <span className="text-custom-150">Hidden</span>
                    </p>
                    <p>
                        <img style={{ width: '100%' }} src={material.material} alt='' />
                    </p>
                    <p>
                        Created At: {new Date(material.createdAt).toLocaleString("en-Us")}
                    </p>
                    </>
                    
                ) : (
                    null
                )}

                {material.type === "File" && material.visibility === "Visible" ? (
                    <>
                    <p>
                        Type: {material.type}
                    </p>
                    <p>
                        Visibility: <span className="text-custom-100">Visible</span>
                    </p>
                    <p>
                        <img style={{ width: '100%' }} src={material.material} alt='' />
                    </p>
                    <p>
                        Created At: {new Date(material.createdAt).toLocaleString("en-Us")}
                    </p>
                    </>
                ) : (
                    null
                )}
        </div>
        </div>
        </>
    )
}

export default MaterialItem