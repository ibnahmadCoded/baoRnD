import { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import { useSelector } from "react-redux";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SideMenu2 from "../components/SideMenu2";

const WYSIWYGEditor = () => {
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
      if(!user){
          navigate("/landing")
      }
    })

    // to improve and save data later
    const [text, setText] = useState("")

    return (
        <>
        <section className="text-3xl font-bold py-0 px-5 content-center">
        {/** <h1 className="text-center">Welcome {user && user.name}</h1> */}
        
        <p className="hidden md:block text-custom-120 text-2xl text-center">[type: Normal]</p>

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
                <section>
                <CKEditor
                    editor={ ClassicEditor }
                    data={text}
                    onChange={(event, editor) => {
                        const data = editor.getData()
                        setText(data)
                    }}
                />
                </section>   
            </main>
            </div>
        </div>
        </section>
        </>
    )
}

export default WYSIWYGEditor