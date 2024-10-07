import { isValidObjectId } from "mongoose"
import { errorMessages } from "../utils/errorMessages.mjs"
import { boardModel } from "../models/boardModel.mjs"
import { boardNameLength } from "../utils/core.mjs"

export const getBoardsController = async (req, res, next) => {
    try {
        const { currentUser } = req
        if (!currentUser) {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        const { _id } = currentUser
        if (!_id || _id?.trim() === "" || !isValidObjectId(_id)) {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        const boards = await boardModel.find({ createdBy: _id }).sort({ _id: -1 }).exec()
        return res.send({
            message: errorMessages?.boardsFetched,
            data: boards
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }
}

export const createBoardController = async (req, res, next) => {
    const { boardName } = req?.body
    const { currentUser } = req

    if (!boardName || boardName?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.boardNameRequired
        })
    }

    if (boardName?.length > boardNameLength) {
        return res.status(400).send({
            message: errorMessages?.boardNameLengthError
        })
    }

    if (!currentUser) {
        return res.status(401).send({
            message: errorMessages?.unAuthError
        })
    }

    const { _id } = currentUser
    if (!_id || _id?.trim() === "" || !isValidObjectId(_id)) {
        return res.status(401).send({
            message: errorMessages?.unAuthError
        })
    }

    try {
        const payload = {
            boardName: boardName,
            createdBy: _id
        }

        const board = await boardModel.create(payload)
        const data = {
            _id: board?._id,
            boardName: board?.boardName,
            createdBy: board?.createdBy,
            createdOn: board?.createdOn,
            backgroundImage: board?.backgroundImage,
            users: board?.users,
        }

        return res.send({
            message: errorMessages?.boardCreated,
            data: data
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }
}

export const _ = async (req, res, next) => {
    try {

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }
}