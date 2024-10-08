import "./Profile.css"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { baseUrl, defaultProfilePicture, profilePictureBg } from "../../utils/core"
import { Button, TextField } from "@mui/material"
import axios from "axios"
import { login } from "../../redux/user"
import AlertMui from "../mui/AlertMui"

const Profile = () => {

    const currentUser = useSelector((state: any) => state?.user)
    const dispatch = useDispatch()

    console.log("currentUser", currentUser)

    const [profile_base_64, set_profile_base_64] = useState<null | string>(null)
    const [file, set_file] = useState<any>(null)
    const [username, set_username] = useState("")
    const [error_message, set_error_message] = useState<null | string>(null)
    const [success_message, set_success_message] = useState<null | string>(null)
    const [is_loading, set_is_loading] = useState(false)

    const updateProfile = () => {
        if (username && username?.length) updateUsername()
        if (file) updateProfilePicture()
    }

    const updateUsername = async () => {
        if (!username || !username?.length) return
        try {
            set_is_loading(true)
            const resp = await axios.put(`${baseUrl}/api/v1/profile`, {
                userName: username
            }, { withCredentials: true })
            dispatch(login({ ...currentUser, userName: resp?.data?.data }))
            set_success_message("Profile updated successfully")
            set_is_loading(false)
            setTimeout(() => {
                set_success_message(null)
            }, 3000)
        } catch (error: any) {
            console.error(error)
            set_is_loading(false)
            set_error_message(error?.response?.data?.message)
            setTimeout(() => {
                set_error_message(null)
            }, 3000)
        }
    }

    const updateProfilePicture = async () => {
        if (!file) return
        const formData = new FormData()
        formData.append("file", file)
        try {
            set_is_loading(true)
            const resp = await axios.put(`${baseUrl}/api/v1/profile-picture`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            dispatch(login({ ...currentUser, profilePhoto: resp?.data?.data }))
            set_success_message("Profile updated successfully")
            set_is_loading(false)
            setTimeout(() => {
                set_success_message(null)
            }, 3000)
        } catch (error: any) {
            console.error(error)
            set_is_loading(false)
            set_error_message(error?.response?.data?.message)
            setTimeout(() => {
                set_error_message(null)
            }, 3000)
        }
    }

    return (
        <>
            {success_message && <AlertMui status="success" text={success_message} />}
            {error_message && <AlertMui status="error" text={error_message} />}
            <div className="profile">
                <h3>Your Profile</h3>
                <>
                    <input type="file" id="file" hidden onChange={(e: any) => {
                        set_profile_base_64(URL.createObjectURL(e?.target?.files[0]))
                        set_file(e?.target?.files[0])
                    }} />
                    <label htmlFor="file">
                        <img src={profile_base_64 ? profile_base_64 : currentUser?.profilePhoto} alt="profile photo"
                            onError={(e: any) => {
                                e.target.src = defaultProfilePicture
                                e.target.style.backgroundColor = profilePictureBg
                            }}
                        />
                    </label>
                </>
                <>
                    <TextField type="text" label="Username" defaultValue={currentUser?.userName}
                        onChange={(e: any) => set_username(e?.target?.value)}
                    />
                    <Button color="primary" variant="contained" sx={{ width: "100%", paddingY: "6px" }}
                        onClick={updateProfile} disabled={is_loading}
                    >{is_loading ? "Saving" : "Save"}</Button>
                </>
            </div>
        </>
    )
}

export default Profile