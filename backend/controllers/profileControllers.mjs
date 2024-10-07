import { isValidObjectId } from "mongoose"
import { errorMessages } from "../utils/errorMessages.mjs"
import { userModel } from "../models/userModel.mjs"
import { _1mbSize, profilePictureUploadFolder, userNamePattern, globalIoObject } from "../utils/core.mjs"
import { uploadOnCloudinary } from "../utils/cloudinary.mjs"

export const getCurrentUserProfileController = async (req, res, next) => {
    try {
        const { currentUser } = req
        if (!currentUser) {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        const { _id } = currentUser
        if (!_id || _id?.trim() === "") {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        if (!isValidObjectId(_id)) {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        const user = await userModel.findById(_id).exec()
        if (!user) {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        return res.send({
            message: errorMessages?.profileFetched,
            data: user
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}

export const getUserProfileController = async (req, res, next) => {
    const { userId } = req?.params
    if (!userId || userId?.trim() === "") {
        return res.status(401).send({
            message: errorMessages?.unAuthError
        })
    }

    if (!isValidObjectId(userId)) {
        return res.status(401).send({
            message: errorMessages?.unAuthError
        })
    }

    try {
        const user = await userModel.findById(userId).exec()
        if (!user) {
            return res.status(404).send({
                message: errorMessages?.noAccountFound
            })
        }

        res.send({
            message: errorMessages?.userProfileFetched,
            data: user
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }
}

export const updateUserNameController = async (req, res, next) => {

    const { _id } = req?.currentUser
    const { userName } = req?.body

    if (!_id || _id?.trim() === "") {
        return res.status(401).send({
            message: errorMessages?.unAuthError
        })
    }

    if (!isValidObjectId(_id)) {
        return res.status(401).send({
            message: errorMessages?.unAuthError
        })
    }

    if (!userName || userName?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.userNameRequired
        })
    }

    if (!userNamePattern?.test(userName?.trim())) {
        return res.status(400).send({
            message: errorMessages?.userNameInvalid
        })
    }

    try {

        const user = await userModel.findById(_id).exec()
        if (!user) {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        user.userName = userName?.trim()
        await user?.save()

        return res.send({
            message: errorMessages?.userNameUpdated,
            data: userName?.trim()
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}

export const updateProfilePictureController = async (req, res, next) => {

    const { files } = req
    const { _id } = req?.currentUser

    if (!_id || _id?.trim() === "") {
        return res.status(401).send({
            message: errorMessages?.unAuthError
        })
    }

    if (!isValidObjectId(_id)) {
        return res.status(401).send({
            message: errorMessages?.unAuthError
        })
    }

    if (!files || !files?.length || !files[0]) {
        return res.status(400).send({
            message: errorMessages?.noFileProvided
        })
    }

    const file = files[0]

    if (!file?.mimetype?.startsWith("image")) {
        return res.status(400).send({
            message: errorMessages?.onlyImagesAllowed
        })
    }

    if (file?.size > (_1mbSize * 2)) {
        return res.status(400).send({
            message: errorMessages?.largeImage
        })
    }

    try {

        const user = await userModel.findById(_id).exec()
        if (!user) {
            return res.status(401).send({
                message: errorMessages.unAuthError
            })
        }

        const imageUploadResp = await uploadOnCloudinary(file, profilePictureUploadFolder)
        user.profilePhoto = imageUploadResp?.url
        await user?.save()

        return res.send({
            message: errorMessages?.profilePhotoUpdated,
            data: imageUploadResp?.url
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}

export const logoutController = async (req, res, next) => {
    try {
        res.clearCookie("hart")
        return res.send({
            message: errorMessages?.logoutDone
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }
}