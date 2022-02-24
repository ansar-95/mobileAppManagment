import currentUser from './currentUser'
import counter from './counter'
import {combineReducers} from 'redux'
import candidature from './candidature'
const rootReducer = combineReducers({
    currentUser,
    counter,
    candidature,
})

export default rootReducer