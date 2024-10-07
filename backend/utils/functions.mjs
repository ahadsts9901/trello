import { backgroundImages } from "./core.mjs"

export const getRandomBackground = () => {
    const randomNumber = Math.floor(Math.random() * 20)
    return backgroundImages[randomNumber]
}