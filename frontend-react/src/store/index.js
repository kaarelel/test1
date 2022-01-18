import { createContext, useReducer } from "react";
import { memeReducer, authReducer } from "./reducer";
import combineReducers from "react-combine-reducers"

const initialMemes = {
    data: []
}

const initialAuth = {
    username: null,
    token: null
}

const [combinedReducer, initialState] = combineReducers({
    memes: [memeReducer, initialMemes],
    auth: [authReducer, initialAuth]
})

export const Context = createContext(initialState)

function Store({ children }){
    const [state, dispatch] = useReducer(combinedReducer, initialState)

    return (
        <Context.Provider value={[ state, dispatch ]}>
        { children }
        </Context.Provider>
    )
}

export default Store