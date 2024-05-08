import { combineReducers, configureStore } from '@reduxjs/toolkit'

import loaderSlice from './slice/loader.slice'

const rootReducer = combineReducers({
    loaderSlice
})

const store = configureStore({
    reducer: rootReducer,
})

export default store