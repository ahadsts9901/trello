export const errorMessages = {
    serverError: "internal server error",
    unAuthError: "unauthorized",
    noTokenPayload: "token payload not provided",
    userNameRequired: "username is required",
    emailRequired: "email is required",
    passwordRequired: "password is required",
    userNameInvalid: "username is invalid",
    emailInvalid: "email is invalid",
    passwordInvalid: "password must be alphanumeric and 8 to 24 characters long",
    emailTaken: "email already taken",
    emailPasswordIncorrect: "email or password incorrect",
    noAccessToken: "access token is required",
    googleLoginDone: "google login successfull",
    idIsMissing: "id is required",
    invalidId: "id is invalid",
    noAccountFound: "account not found",
    profilePhotoUpdated: "profile picture updated successfully",
    userNameUpdated: "username updated successfully",
    profileFetched: "profile fetched",
    userProfileFetched: "user profile fetched",
    onlyImagesAllowed: "only images are allowed",
    largeImage: "image too large please select under 2mb",
    logoutDone: "logout successfull",
    boardsFetched: "boards fetched",
    boardNameRequired: "board name is required",
    boardNameLengthError: "board name length must be under 32 characters",
    boardCreated: "board created successfully",
    boardDeleted: "board deleted successfully",
    boardUpdated: "board updated successfully",
    columnsFetched: "columns fetched",
    columnNameRequired: "column name is required",
    columnNameLengthError: "column name length must be under 32 characters",
    columnCreated: "column created successfully",
    columnDeleted: "column deleted successfully",
    columnUpdated: "column updated successfully",
    cardsFetched: "cards fetched",
    cardNameRequired: "card name is required",
    cardNameLengthError: "card name length must be under 32 characters",
    cardCreated: "card created successfully",
    cardDeleted: "card deleted successfully",
    cardUpdated: "card updated successfully",
    requiredParameterMissing: (field) => `required parameter is missing ${field}`
}