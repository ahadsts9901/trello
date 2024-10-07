import { isValidObjectId } from "mongoose"
import { errorMessages } from "../utils/errorMessages.mjs"
import { columnModel } from "../models/columnModel.mjs"
import { cardTypesEnum, columnNameLength } from "../utils/core.mjs"
import { cardModel } from "../models/cardModel.mjs"

export const getCardsController = async (req, res, next) => {
    try {
        const { currentUser } = req
        const { boardId, columnId } = req?.params

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

        const query = { boardId: boardId, userId: _id, columnId: columnId }
        const cards = await cardModel.find(query).sort({ _id: -1 }).exec()
        return res.send({
            message: errorMessages?.cardsFetched,
            data: cards
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }
}

export const createCardController = async (req, res, next) => {
    const { currentUser } = req
    const { boardId, columnId, title, description, type } = req?.body

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

    if (!title || title?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.requiredParameterMissing("title")
        })
    }

    if (!description || description?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.requiredParameterMissing("description")
        })
    }

    if (type && type?.length && !cardTypesEnum?.includes(type)) {
        return res.status(400).send({
            message: errorMessages?.invalidCardType
        })
    }

    try {
        const query = { boardId: boardId, columnId: columnId, userId: _id }
        const cardsLength = await cardModel.countDocuments(query)

        const payload = {
            boardId: boardId,
            columnId: columnId,
            userId: _id,
            title: title,
            description: description,
            type: type,
            sequence: +cardsLength + 1
        }

        const card = await columnModel.create(payload)
        const data = {
            _id: card?._id,
            boardId: card?.boardId,
            columnId: card?.columnId,
            userId: card?.userId,
            createdOn: card?.createdOn,
            sequence: card?.sequence,
            title: card?.title,
            description: card?.description,
            type: card?.type,
        }

        return res.send({
            message: errorMessages?.cardCreated,
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

export const deleteCardController = async (req, res, next) => {
    const { boardId, columnId, cardId } = req?.params
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

    if (!cardId || cardId?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.idIsMissing
        })
    }

    if (!isValidObjectId(cardId)) {
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
        const query = { _id: cardId, columnId: columnId, boardId: boardId, userId: _id }
        const card = await cardModel.findOne(query)

        if (!card) {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        const delResp = await cardModel.findByIdAndDelete(cardId)

        return res.send({
            message: errorMessages?.cardDeleted
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }
}

export const updateCardController = async (req, res, next) => {
    const { boardId, columnId, cardId } = req?.params
    const { currentUser } = req
    const { title, description, type, sequence } = req?.body

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

    if (!cardId || cardId?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.idIsMissing
        })
    }

    if (!isValidObjectId(cardId)) {
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

    if (!title || title?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.requiredParameterMissing("title")
        })
    }

    if (!description || description?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.requiredParameterMissing("description")
        })
    }

    if (!sequence || isNaN(+sequence)) {
        return res.status(400).send({
            message: errorMessages?.requiredParameterMissing("sequence")
        })
    }

    if (type && type?.length && !cardTypesEnum?.includes(type)) {
        return res.status(400).send({
            message: errorMessages?.invalidCardType
        })
    }

    try {
        const query = { _id: cardId, userId: _id, boardId: boardId, columnId: columnId }
        const card = await cardModel.findOne(query)

        if (!card) {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        card.title = title
        card.description = description
        card.type = type
        card.sequence = +sequence
        await card.save()

        const data = { ...card, title: title?.trim(), description: description?.trim(), sequence: +sequence }

        return res.send({
            message: errorMessages?.cardUpdated,
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