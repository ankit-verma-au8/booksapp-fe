import {combineReducers} from 'redux'
import userReducer from './reducers/userReducer'
import postReducer from './reducers/Postreducers'
import commentReducer from './reducers/Commentreducer'
import { libraryReducer } from './reducers/libraryReducer';



const rootReducer = combineReducers({
    userState: userReducer,
    postState:postReducer,
    commentState:commentReducer,
    libraryState:libraryReducer
  });
  
  export default rootReducer;