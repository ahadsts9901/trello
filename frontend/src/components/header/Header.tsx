import "./Header.css"
import logo from '/logo.png'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { defaultProfilePicture, profilePictureBg } from "../../utils/core"
import { useState } from "react"
import Sidebar from "../mui/Sidebar"
import Profile from "../profile/Profile"

const Header = () => {
    const navigate = useNavigate()
    const currentUser = useSelector((state: any) => state?.user)

    const [is_drawer_open, set_is_drawer_open] = useState(false)

    return (
        <>
            <Sidebar open={is_drawer_open} setOpen={set_is_drawer_open}><Profile /></Sidebar>
            <div className="header">
                <img src={logo} alt="logo" className="logo" onClick={() => navigate("/")} />
                <div className="profile-section"
                    onClick={() => set_is_drawer_open(true)}
                >
                    <p>{currentUser?.userName}</p>
                    <img src={currentUser?.profilePhoto} alt="profile-photo"
                        onError={(e: any) => {
                            e.target.src = defaultProfilePicture
                            e.target.style.backgroundColor = profilePictureBg
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default Header