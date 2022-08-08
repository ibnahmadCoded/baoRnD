import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

function Dashboard() {
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }
    }, [user, navigate])
  return (
    <div><h1 className="text-center font-bold">Dashboard</h1></div>
  )
}

export default Dashboard