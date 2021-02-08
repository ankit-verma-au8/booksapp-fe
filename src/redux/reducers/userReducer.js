import {
    SET_USER,
    TOGGLE_ISUSERFETCHING_STATE,
    LOGOUT_USER,
    SET_USER_RESPONSE,
    TOGGLE_IS_RES_FETCHING,
    SET_TOKEN,
    SET_USER_DETAIL,
    SET_DP_RESPONSE,
    SET_SOCKET_ID,
    SET_UPDATE_RESPONSE,
    TOGGLE_IS_DP_RES_FETCHING,
    TOGGLE_IS_UPDATE_RES_FETCHING,
    SET_IMAGE_LINK,
    SET_ALL_USERS,
    SET_USER_PROFILE,
    SET_RESET_PASS_RES,
    SET_UPDATE_PASS_RES
  } from "../actionTypes";
  
  const initialState = {
    user: JSON.parse(sessionStorage.getItem("user")) || null,
    allusers:null,
    userDetail:null,
    userProfile:null,
    isuserFetching: false,
    userResponse:null, 
    isResponseFetching:false,
    isDPresonsefetching:false,
    isUpdateresponsefetching:false,
    dpresponse:null,
    updateResponse:null,
    socketId:null,
    resetPasswordres:null,
    updatePasswordres:null
  };
  
  const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case SET_USER:
        const userJSON = JSON.stringify(payload);
        sessionStorage.setItem("user", userJSON);
        return { ...state, user: payload };
        case SET_IMAGE_LINK:
          return { ...state, user: {...state.user,imagelink:payload} };
      case SET_USER_DETAIL:
        return {...state,userDetail:payload}
        case SET_SOCKET_ID:
        return {...state,socketId:payload}
      case SET_ALL_USERS:
        return {...state, allusers:payload}
      case SET_UPDATE_PASS_RES:
        return {...state, updatePasswordres:payload}
      case SET_RESET_PASS_RES:
        return{...state, resetPasswordres:payload}
      case SET_USER_PROFILE:
        return {...state, userProfile:payload}
      case SET_TOKEN:
        sessionStorage.setItem("auth_token",payload)
        return state
      case TOGGLE_ISUSERFETCHING_STATE:
        return { ...state, isuserFetching: !state.isuserFetching };
      case LOGOUT_USER:
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("auth_token")
        return { ...state, user: null, userDetail:null, userResponse:null };
        case TOGGLE_IS_RES_FETCHING:
        return{...state, isResponseFetching:!state.isResponseFetching}
      case SET_USER_RESPONSE:
        return{...state, userResponse:payload}
      case SET_UPDATE_RESPONSE:
        return {...state, updateResponse:payload }
      case SET_DP_RESPONSE:
        return {...state, dpresponse :payload }
      case TOGGLE_IS_UPDATE_RES_FETCHING:
        return {...state, isUpdateresponsefetching:!state.isUpdateresponsefetching}
      case TOGGLE_IS_DP_RES_FETCHING:
        return {...state, isDPresonsefetching:!state.isDPresonsefetching}
      default:
        return state;
    }
  };
  
  export default userReducer;