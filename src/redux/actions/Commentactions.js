import {SET_COMMENTS,ADD_COMMENT, TOGGLE_COMMENT_FETCHING_STATE} from '../actionTypes'
import axios from 'axios'

export const addComment = (comment) => async (dispatch) => {

    try {
      dispatch({type:TOGGLE_COMMENT_FETCHING_STATE})
      const {data} =await axios({ method: 'post', url:`${process.env.REACT_APP_BASE_URL}/comment`,data:comment, headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("auth_token") } })
     console.log(data)
      if(data.success){
      dispatch({
        type:ADD_COMMENT,
        payload:data.comment
      })
     }
     else{
       alert(data.message)
     }

     } catch (err) {
      console.error(err);
      alert(err.message)
    }
    finally{
      dispatch({type:TOGGLE_COMMENT_FETCHING_STATE})
    }
  };

  export const getallcomments = (postId) => async (dispatch) => {

    try {
      console.log(postId)
      dispatch({type:SET_COMMENTS,payload:null})
      dispatch({type:TOGGLE_COMMENT_FETCHING_STATE})
      const {data} =await axios({ method: 'get', url:`${process.env.REACT_APP_BASE_URL}/comment/${postId.postId}`, headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("auth_token") } })
     console.log(data)
      if(data.success){
      dispatch({
        type:SET_COMMENTS,
      payload:data.comments
      })
     }
     else{
       alert(data.message)
     }

     } catch (err) {
      console.error(err);
      alert(err.message)
    }
    finally{
      dispatch({type:TOGGLE_COMMENT_FETCHING_STATE})
    }
  };