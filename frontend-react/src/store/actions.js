export const MEME_ADD = "MEME_ADD"
export const MEME_REMOVE = "MEME_REMOVE"
export const MEMES_UPDATE = "MEMES_UPDATE"
export const USER_LOGIN = "USER_LOGIN"
export const USER_LOGOUT = "USER_LOGOUT"
export const USER_UPDATE = "USER_UPDATE"

export const addMeme = meme => ({
    type: MEME_ADD,
    payload: meme
})

export const removeMeme = id => ({
    type: MEME_REMOVE,
    payload: id
})

export const updateMemes = meme => ({
    type: MEMES_UPDATE,
    payload: meme
})

export const loginUser = data => ({
    type: USER_LOGIN,
    payload: data
})

export const logoutUser = data => ({
    type: USER_LOGOUT
})

export const updateUser = data => ({
    type: USER_UPDATE,
    payload: data
})