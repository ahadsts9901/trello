import { errorMessages } from "../utils/errorMessages.mjs"

export const getBoardsController = async (req, res, next) => {
    try {

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