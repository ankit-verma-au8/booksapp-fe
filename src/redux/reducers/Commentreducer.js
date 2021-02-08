import {
    SET_COMMENTS,TOGGLE_COMMENT_FETCHING_STATE,ADD_COMMENT
  } from "../actionTypes";
  
  const initialState = {
    comments: null,
    isCommentfetching:false
  };
  
  const commentReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case SET_COMMENTS:
        return { ...state, comments: payload };
        case ADD_COMMENT:
          return { ...state, comments: [payload,...state.comments ] };
      case TOGGLE_COMMENT_FETCHING_STATE:
        return {...state,isCommentfetching:!state.isCommentfetching}
      default:
        return state;
    }
  };
  
  export default commentReducer;