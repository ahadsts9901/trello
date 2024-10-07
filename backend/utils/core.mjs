export const userNamePattern = /^[\p{L}\p{N}\p{P}\p{S} !@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{2,15}$/u;
export const emailPattern = /^[a-zA-Z0-9!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?!.*\s{2})[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,24}$/;
export const otpPattern = /^[a-zA-Z0-9]{6}$/
export const defaultProfilePicture = "https://res.cloudinary.com/do6sd9nyx/image/upload/v1725535697/default_avatar_avhpw8.png"

export const sessionInDays = 15;
export const googleUserApi = "https://www.googleapis.com/oauth2/v3/userinfo"
export const profilePictureUploadFolder = "trello/profile-pictures"
export const _1mbSize = 10000000 // 1_mb

export const allowedOrigins = "http://localhost:5173"
export let globalIoObject = { io: null }

export const boardNameLength = 32