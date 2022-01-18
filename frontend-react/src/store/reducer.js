import { MEME_ADD, MEME_REMOVE, MEMES_UPDATE, USER_LOGIN, USER_LOGOUT, USER_UPDATE } from "./actions";

const memeReducer = (state, action) => {
  switch(action.type){
    case MEME_ADD:
      return {
        ...state,
        data: state.data.concat(action.payload)
      };
    case MEME_REMOVE:
      return {
        ...state,
        data: state.data.filter(meme => meme.memeID !== action.payload)
      }
    case MEMES_UPDATE:
      const newData = [];
        return {
          ...state,
          data: newData.concat(action.payload)
        }
    default:
      return state;
  }
}

const authReducer = (state, action) => {
  switch(action.type){
    case USER_LOGIN:
      return {
        ...state,
        username: action.payload.username,
        token: action.payload.token
      }
    case USER_LOGOUT:
      return {
        ...state,
        username: null,
        token: null
      }
    case USER_UPDATE:
      const newData = [];
        return {
          ...state,
          data: newData.concat(action.payload)
        }
    default:
      return state
  }
}

export { memeReducer, authReducer }