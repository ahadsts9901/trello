import { globalIoObject, googleUserApi } from "../utils/core.mjs"
import { errorMessages } from "../utils/errorMessages.mjs"
import { userModel } from "../models/userModel.mjs"
import axios from "axios"

export const googleLoginController = async (req, res, next) => {

    const { accessToken } = req?.body

    if (!accessToken || accessToken?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.noAccessToken
        })
    }

    try {
        const googleUser = await axios.get(googleUserApi, { headers: { Authorization: accessToken }, });
        const user = await userModel?.findOne({ email: googleUser?.data?.email }).exec()

        if (!user) {
            const userPayload = {
                userName: googleUser?.data?.name,
                email: googleUser?.data?.email?.toLowerCase(),
                profilePhoto: googleUser?.data?.picture,
            }

            const signupResp = await userModel?.create(userPayload)

            const tokenPayload = {
                _id: signupResp?._id,
                userName: signupResp?.userName,
                email: signupResp?.email,
                createdOn: signupResp?.createdOn,
                isAdmin: signupResp?.isAdmin,
                profilePhoto: signupResp?.profilePhoto
            }
            req.loginTokenPayload = tokenPayload

        } else if (user) {
            const tokenPayload = {
                _id: user?._id,
                userName: user?.userName,
                email: user?.email,
                createdOn: user?.createdOn,
                profilePhoto: user?.profilePhoto
            }

            req.loginTokenPayload = tokenPayload
            user.isActive = true
            await user.save()

        }

        next()

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}