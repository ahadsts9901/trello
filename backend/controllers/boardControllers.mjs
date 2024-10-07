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

export const deleteBoardController = async (req, res, next) => {
    const { boardId } = req?.params
    const { currentUser } = req

    if (!boardId || boardId?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.idIsMissing
        })
    }

    if (!isValidObjectId(boardId)) {
        return res.status(400).send({
            message: errorMessages?.invalidId
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
        const query = { _id: boardId, createdBy: _id }
        const board = await boardModel.findOne(query)

        if (!board) {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        const delResp = await boardModel.findByIdAndDelete(boardId)

        // delete columns & cards also

        return res.send({
            message: errorMessages?.boardDeleted
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }
}

export const updateBoardController = async (req, res, next) => {
    const { boardId } = req?.params
    const { currentUser } = req
    const { boardName, backgroundImage } = req?.body

    if (!boardId || boardId?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.idIsMissing
        })
    }

    if (!isValidObjectId(boardId)) {
        return res.status(400).send({
            message: errorMessages?.invalidId
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

    if (!boardName || boardName?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.requiredParameterMissing("boardName")
        })
    }

    if (!backgroundImage || backgroundImage?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.requiredParameterMissing("backgroundImage")
        })
    }

    try {
        const query = { _id: boardId, createdBy: _id }
        const board = await boardModel.findOne(query)

        if (!board) {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        board.boardName = boardName
        board.backgroundImage = backgroundImage
        await board.save()

        const data = { ...board, boardName: boardName?.trim(), backgroundImage: backgroundImage?.trim() }

        return res.send({
            message: errorMessages?.boardDeleted,
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