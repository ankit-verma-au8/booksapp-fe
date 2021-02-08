import {SET_POSTS,SET_BOOK_INFO,ADD_POST, TOGGLE_MODAL_STATE, TOGGLE_POST_FETCHING_STATE, SET_ISLIKED, INCREASE_LIKE, INCREASE_COMMENT, DECREASE_LIKE} from '../actionTypes'
import axios from 'axios'
export const getallPosts = (history) => async (dispatch) => {

    try {
      dispatch({type:TOGGLE_POST_FETCHING_STATE})
      dispatch({type:SET_POSTS, payload:null})
      const {data} = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/post`,{
          headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
        }
      );
      if(data.success){
        dispatch({type:SET_POSTS, payload:data.posts})
      }
      else{
        history.push('/login')
      }
      

     } catch (err) {
      console.error(err);
      alert(err.message)
    }finally{
      dispatch({type:TOGGLE_POST_FETCHING_STATE})

    }
  };

  export const createPost = (postObj) => async (dispatch) => {

    try {
      dispatch({type:TOGGLE_POST_FETCHING_STATE})

      const {data} = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/post`,postObj,{
          headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
        }
      );
      console.log(data)
      if(data.success){
        dispatch({
          type:ADD_POST,
          payload:data.post
        }) 
        dispatch({
          type:SET_BOOK_INFO,
          payload:null
        })
      }
      else{
        alert(data.message)
      }

     } catch (err) {
      console.error(err);
      alert(err.message)
    }finally{
      dispatch({type:TOGGLE_POST_FETCHING_STATE})

    }
  };


  export const checkuserLike = (postId) => async (dispatch) => {

    try {
      console.log(postId)
      const {data} =await axios({ method: 'get', url:`${process.env.REACT_APP_BASE_URL}/like/user`,data:postId, headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("auth_token") } })
      console.log(data)
      if (data.found){
        dispatch({type:SET_ISLIKED, payload:{postId,liked:true}})

      }
      else{
      dispatch({type:SET_ISLIKED, payload:{postId:postId.postId,liked:false}})

      }

     } catch (err) {
      console.error(err);
      alert(err.message)
    }
  };


  export const addlike = (postId) => async () => {

    try {
      console.log(postId)
      const {data} =await axios({ method: 'post', url:`${process.env.REACT_APP_BASE_URL}/like`,data:postId, headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("auth_token") } })
      console.log(data)
     } catch (err) {
      console.error(err);
      alert(err.message)
    }
  };

  export const removelike = (postId) => async () => {

    try {
      console.log(postId)
      const {data} =await axios({ method: 'delete', url:`${process.env.REACT_APP_BASE_URL}/like`,data:postId, headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("auth_token") } })
      console.log(data)
     } catch (err) {
      console.error(err);
      alert(err.message)
    }
  };

  export const increaseLike =(postId)=>{
    return{
      type:INCREASE_LIKE,
      payload:postId
    }
  }

  export const toggleModalstate =(postId)=>{
    return{
      type:TOGGLE_MODAL_STATE,
    }
  }

  export const setBookinfo =(book)=>{
    return{
      type:SET_BOOK_INFO,
      payload:book
    }
  }

  export const decreaseLike =(postId)=>{
    return{
      type:DECREASE_LIKE,
      payload:postId
    }
  }

  export const increaseComment =(postId)=>{
    return{
      type:INCREASE_COMMENT,
      payload:postId
    }
  }