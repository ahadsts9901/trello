import { isValidObjectId } from "mongoose"
import { errorMessages } from "../utils/errorMessages.mjs"
import { columnModel } from "../models/columnModel.mjs"
import { columnNameLength } from "../utils/core.mjs"

export const getColumnsController = async (req, res, next) => {
    try {
        const { currentUser } = req
        const { boardId } = req?.params

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

        const query = { boardId: boardId, createdBy: _id }
        const columns = await columnModel.find(query).sort({ _id: -1 }).exec()
        return res.send({
            message: errorMessages?.columnsFetched,
            data: columns
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }
}

export const createColumnController = async (req, res, next) => {
    const { currentUser } = req
    const { columnName, boardId } = req?.body

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

    if (!columnName || columnName?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.columnNameRequired
        })
    }

    if (columnName?.length > columnNameLength) {
        return res.status(400).send({
            message: errorMessages?.columnNameLengthError
        })
    }

    if (!boardId || boardId?.trim() === "") {
        return res.status(401).send({
            message: errorMessages?.idIsMissing
        })
    }

    if (!isValidObjectId(boardId)) {
        return res.status(401).send({
            message: errorMessages?.invalidId
        })
    }

    try {
        const query = { boardId: boardId, userId: _id }
        const columnsLength = await columnModel.countDocuments(query)

        const payload = {
            boardId: boardId,
            columnName: columnName,
            userId: _id,
            sequence: +columnsLength + 1
        }

        const column = await columnModel.create(payload)
        const data = {
            _id: column?._id,
            boardId: column?.boardId,
            columnName: column?.columnName,
            userId: column?.userId,
            createdOn: column?.createdOn,
            sequence: column?.sequence
        }

        return res.send({
            message: errorMessages?.columnCreated,
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

export const deleteColumnController = async (req, res, next) => {
    const { boardId, columnId } = req?.params
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

    if (!columnId || columnId?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.idIsMissing
        })
    }

    if (!isValidObjectId(columnId)) {
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
        const query = { _id: columnId, boardId: boardId, userId: _id }
        const column = await columnModel.findOne(query)

        if (!column) {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        const delResp = await columnModel.findByIdAndDelete(columnId)

        // delete cards also

        return res.send({
            message: errorMessages?.columnDeleted
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }
}

export const updateColumnController = async (req, res, next) => {
    const { boardId, columnId } = req?.params
    const { currentUser } = req
    const { columnName, sequence } = req?.body

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

    if (!columnId || columnId?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.idIsMissing
        })
    }

    if (!isValidObjectId(columnId)) {
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

    if (!columnName || columnName?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.requiredParameterMissing("columnName")
        })
    }

    if (!sequence || isNaN(+sequence)) {
        return res.status(400).send({
            message: errorMessages?.requiredParameterMissing("sequence")
        })
    }

    try {
        const query = { _id: columnId, userId: _id, boardId: boardId }
        const column = await columnModel.findOne(query)

        if (!column) {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        column.columnName = columnName
        column.sequence = +sequence
        await column.save()

        const data = { ...column, columnName: columnName?.trim(), sequence: +sequence }

        return res.send({
            message: errorMessages?.columnUpdated,
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