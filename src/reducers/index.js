import { combineReducers } from "redux";
import authReducer from '../slices/authSlice'
import cartReducer from "../slices/cartSlice"
import profieReducer from "../slices/profileSlice";
import loadingBarReducer from "../slices/loadingBarSlice"
import courseReducer from '../slices/courseSlice'
import viewCourseReducer from "../slices/viewCourseSlice";

const rootReducer=combineReducers({
    auth:authReducer,
    cart:cartReducer,
    profile:profieReducer,
    loadingBar: loadingBarReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer,
    
})

export default rootReducer;