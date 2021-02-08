import {
   SET_BOOK_INFO,ADD_POST, SET_POSTS,TOGGLE_MODAL_STATE, TOGGLE_POST_FETCHING_STATE, SET_ISLIKED, INCREASE_LIKE, INCREASE_COMMENT, DECREASE_LIKE
  } from "../actionTypes";
  
  const initialState = {
    posts: null,
    isPostfetching:false,
    isPostliked:[],
    modalState:false,
    bookInfo:null
  };
  
  const postReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case SET_POSTS:
        return { ...state, posts: payload };
        case ADD_POST:
          return { ...state, posts: [payload,...state.posts] };
      case SET_BOOK_INFO:
          return { ...state, bookInfo: payload };
      case TOGGLE_POST_FETCHING_STATE:
        return {...state,isPostfetching:!state.isPostfetching}
      case TOGGLE_MODAL_STATE:
          return {...state,modalState:!state.modalState}
      case SET_ISLIKED:
        return {...state, isPostliked:[...state.isPostliked,payload]}
      case INCREASE_LIKE:
        return { 
          ...state, 
          posts: state.posts.map(
              (post) => post._id === payload ? {...post, likes: post.likes+1}: post 
          )
       }
       case DECREASE_LIKE:
        return { 
          ...state, 
          posts: state.posts.map(
              (post) => post._id === payload ? {...post, likes: post.likes-1}: post 
          )
       }
       case INCREASE_COMMENT:
        return { 
          ...state, 
          posts: state.posts.map(
              (post) => post._id === payload ? {...post, comments: post.comments+1}: post 
          )
       }
      default:
        return state;
    }
  };
  
  export default postReducer;