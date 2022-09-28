import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"
import SideMenu2 from "../components/SideMenu2";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { addUpdate } from "../features/updates/updateSlice";

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike", "link"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    
    ["clean"],
]

const WYSIWYGEditor = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const { user } = useSelector((state) => state.auth)
    const [quill, setQuill] = useState()

    const [formUpdate, setFormUpdate] = useState({
        type: '',
    })

    const { type } = formUpdate

    const onChange = (e) => {
        setFormUpdate((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const  wrapperRef = useCallback((wrapper) => {
        if(wrapper == null) return

        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS } })
        setQuill(q)
    }, [])

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }
    })

    const onSubmit = e => {
        const updateData = { project: params.id, type: type, content: quill.getContents()  }

        dispatch(addUpdate(updateData))

        toast.success("Your update was successfully saved.")

        navigate(`/project/${params.id}`)

        setFormUpdate({
            type: '',
        })

        setQuill("")
    }

    return (
        <>
        <section className="text-3xl font-bold py-0 px-5 content-center">
        {/** <h1 className="text-center">Welcome {user && user.name}</h1> */}
        

        <p className="md:hidden text-center">Sorry, not editor not available on mobile</p>
        </section>

        {/* Dashborad Menu */}
        <section>
        <div class="container mx-auto">
            <div class="flex flex-row flex-wrap py-4">
            <section>
                {/* Side Menu */}
                <SideMenu2 />
            </section>

            <main role="main" class="hidden md:block w-full ml-16 sm:w-2/3 pt-1 px-2">
            <form onSubmit={onSubmit}>
                        <p class="font-bold mb-3">Add New Update</p>
                        <label for="" class="block mb-2 text-sm font-medium text-gray-900">Select update type</label>
                        <select id="type" name="type" placeholder="Select Type"
                            class="shadow-sm mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5"
                            value={type} onChange={onChange} required>
                            <option label=" "></option>
                            <option value="Normal" selected="selected">Normal</option>
                            <option value="Note">Note</option>
                            <option value="Hidden">Hidden</option>
                        </select>
                        <section>
                            <div className="editorcontainer" ref={wrapperRef}></div>
                        </section> 
                        <div>
                            <button type="submit" class="mb-5 text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 rounded-lg text-sm px-5 py-2.5 text-center">
                                Add Update
                            </button>
                        </div>
                        <button className="text-custom-100 font-semibold hover:text-custom-150" onClick={() => navigate(`/editor/${params.id}`)}>use editor</button>
                </form>  
            </main>
            </div>
        </div>
        </section>
        </>
    )
}

export default WYSIWYGEditor