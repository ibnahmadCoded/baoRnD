import { useSelector } from "react-redux"

const ProfileView = () => {

    const { user } = useSelector((state) => state.auth)

    return (
        <>
        <p className="md:ml-28 md:mb-5">You can find your profile details here. This is quite brief. We will have your projects featured here soon. Please bear with us.</p>
        <div className="my-0 mx-auto w-9/12 mb-5">
        <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
            <p>
                Name: <span className="text-custom-100 font-bold">{user.name}</span>
            </p>

            <p>
                Email: {user.email}
            </p>

            <p>
                Account type: {user.type}
            </p>
            
            <p>
                Joined on: {new Date(user.createdAt).toLocaleString("en-Us")}
            </p>
        </div>
        </div>
        </>
    )
}

export default ProfileView