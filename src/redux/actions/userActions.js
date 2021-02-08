import { SET_USER_RESPONSE,SET_RESET_PASS_RES,SET_UPDATE_PASS_RES, SET_DP_RESPONSE, SET_UPDATE_RESPONSE, TOGGLE_IS_DP_RES_FETCHING, TOGGLE_IS_UPDATE_RES_FETCHING, LOGOUT_USER, TOGGLE_IS_RES_FETCHING, SET_USER, TOGGLE_ISUSERFETCHING_STATE, SET_TOKEN, SET_USER_DETAIL, SET_SOCKET_ID, SET_ALL_USERS, SET_USER_PROFILE} from '../actionTypes'
import axios from 'axios'




export const registerUser = (user, history) => async (dispatch) => {

    try {
      dispatch({type:TOGGLE_IS_RES_FETCHING})
      dispatch({type:SET_USER_RESPONSE, payload:null})
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/register`, user
      );
      if (res.data.success){
        dispatch({
          type:SET_USER,
          payload:res.data.user
        })
        dispatch({
          type:SET_TOKEN,
          payload:res.data.token
        })
        dispatch({
          type:SET_USER_RESPONSE,
          payload:res.data
        })
        setTimeout(()=>{
          history.push('/home')
        },1000)
      }
     else{
      dispatch({
        type:SET_USER_RESPONSE,
        payload:res.data
      })
     } 
      
      
    } catch (err) {
      console.error(err);
      alert(err.message)
    }
    finally{
      dispatch({type:TOGGLE_IS_RES_FETCHING})
    }
  };


  export const removeResponse =()=>{
    return{
      type:SET_USER_RESPONSE,
      payload:null
    }
  }

  export const setSocketId =(socketid)=>{
    return{
      type:SET_SOCKET_ID,
      payload:socketid
    }
  }

  export const loginUser = (user, history) => async (dispatch) => {

    try {
      dispatch({type:TOGGLE_ISUSERFETCHING_STATE})
      dispatch({type:SET_USER_RESPONSE, payload:null})
      dispatch({type:SET_USER, payload:null})
      console.log(user)
      const {data} = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/login`, user
      );
      
      if(data.success){
        dispatch({
          type:SET_USER,
          payload:data.user
        })
        dispatch({
          type:SET_TOKEN,
          payload:data.token
        })
        dispatch({
          type:SET_USER_RESPONSE,
          payload:data
        })
      setTimeout(()=>{
        history.push('/home')
      },1000)
        
      }
      else{
       
        dispatch({
          type:SET_USER_RESPONSE,
          payload:data
        })
      }
      
      
    } catch (err) {
      console.log(err);
      alert(err.message)
    } 
    finally{
      dispatch({type:TOGGLE_ISUSERFETCHING_STATE})
    }
  };


  export const getuserDetail = (history) => async (dispatch) => {

    try {
  
      dispatch({type:TOGGLE_ISUSERFETCHING_STATE})
      dispatch({type:SET_USER_RESPONSE, payload:null})
      dispatch({type:SET_USER_DETAIL, payload:null})
      const {data} = await axios(
        `${process.env.REACT_APP_BASE_URL}/user`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
        }
      );
      
      
      if(data.success){
        dispatch({
          type:SET_USER_DETAIL,
          payload:data.userProfile
        })  
      }
      else{
       
        dispatch({
          type:SET_USER_RESPONSE,
          payload:data
        })
        history.push('/login')

      }
    } catch (err) {
      console.log(err);
      alert(err.message)
    } 
    finally{
      dispatch({type:TOGGLE_ISUSERFETCHING_STATE})
    }
  };

 
  export const uploadPicture = (imageData) => async (dispatch) => {

    try {
      dispatch({type:TOGGLE_IS_DP_RES_FETCHING})
      dispatch({type:SET_DP_RESPONSE, payload:null})
      const {data} = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/uploadfile`, imageData,{
          headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
        }
      );
     
       dispatch({type:SET_DP_RESPONSE, payload:data})
       dispatch({type:SET_USER, payload:data.user})
     
     } catch (err) {
      console.error(err);
      alert(err.message)
    } finally{
      dispatch({type:TOGGLE_IS_DP_RES_FETCHING})

    }
  };

  export const editProfile = (userdata) => async (dispatch) => {

    try {
      dispatch({type:TOGGLE_IS_UPDATE_RES_FETCHING})
      dispatch({type:SET_UPDATE_RESPONSE, payload:null})
      const {data} = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user`, userdata,{
          headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
        }
      );
      dispatch({type:SET_UPDATE_RESPONSE, payload:data})

     } catch (err) {
      console.error(err);
      alert(err.message)
    }finally{
      dispatch({type:TOGGLE_IS_UPDATE_RES_FETCHING})

    }
  };

  export const deactivateuser = (userId, window) => async (dispatch) => {

    try {
      dispatch({type:TOGGLE_ISUSERFETCHING_STATE})
      const {data} = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/deactivate`,{userId},{
          headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
        }
      )
      if(data.success){
        alert(data.message)
        window.location.reload()

      }
      else{
        alert(data.error.message)
      }

     } catch (err) {
      console.error(err);
      alert(err.message)
    }finally{
      dispatch({type:TOGGLE_ISUSERFETCHING_STATE})

    }
  };

  export const activateuser = (userId, window) => async (dispatch) => {

    try {
      dispatch({type:TOGGLE_ISUSERFETCHING_STATE})
      const {data} = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/activate`,{userId},{
          headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
        }
      )
      if(data.success){
        alert(data.message)
        window.location.reload()
      }
      else{
        alert(data.error.message)
      }

     } catch (err) {
      console.error(err);
      alert(err.message)
    }finally{
      dispatch({type:TOGGLE_ISUSERFETCHING_STATE})

    }
  };

  export const logoutUser = (data1) => async (dispatch) => {
    const {data} = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/logout`,data1, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
        }
      );
    if(data.success){
      dispatch({
        type:LOGOUT_USER
      })
    }
    

  };

  export const logoutAll = (data1) => async (dispatch) => {
    console.log('i am logout')
    const {data} = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/logoutall`,data1,{
          headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
        }
      );
      console.log(data)
    if(data.success){
      dispatch({
        type:LOGOUT_USER
      })
    }
    

  };


  export const getAllusers = (history) => async (dispatch) => {

    try {
      dispatch({
        type:SET_ALL_USERS,
        payload:null
      })
      dispatch({type:TOGGLE_ISUSERFETCHING_STATE})
      const {data} = await axios(
        `${process.env.REACT_APP_BASE_URL}/user/all`,{
          headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
        }
      );
      if(data.success){
          dispatch({
            type:SET_ALL_USERS,
            payload:data.users
          })
      }
      else{
        alert(data.error.message)
        history.push('/login')
      }
     
    } catch (err) {
      alert(err.message)
    } 
    finally{
      dispatch({type:TOGGLE_ISUSERFETCHING_STATE})
    }
  };

  export const fetchuserProfile = (userId) => async (dispatch) => {

    try {
      dispatch({
        type:SET_USER_PROFILE,
        payload:null
      })
      dispatch({type:TOGGLE_ISUSERFETCHING_STATE})
      const {data} = await axios(
        `${process.env.REACT_APP_BASE_URL}/user/${userId}`,{
          headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
        }
      );
      if(data.success){
          dispatch({
            type:SET_USER_PROFILE,
            payload:data.user
          })
      }
      else{
        alert(data.error.message)
      }
     
    } catch (err) {
      alert(err.message)
    } 
    finally{
      dispatch({type:TOGGLE_ISUSERFETCHING_STATE})
    }
  };


  export const sendresetpasswordRequest = (email) => async (dispatch) => {

    try {
      dispatch({type:TOGGLE_ISUSERFETCHING_STATE})
      dispatch({type:SET_RESET_PASS_RES, payload:null})
      const {data} = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/resetpassword`,{email}
      );
      if(data.success){
        dispatch({type:SET_RESET_PASS_RES,payload:{message:data.message}})

      }
      else{
        dispatch({type:SET_RESET_PASS_RES,payload:{message:data.error.message}})

      }
     
    } catch (err) {
      alert(err.message)
    } 
    finally{
      dispatch({type:TOGGLE_ISUSERFETCHING_STATE})
    }
  };

  export const updatePassword = (object) => async (dispatch) => {

    try {
      console.log('fornt')
      dispatch({type:TOGGLE_ISUSERFETCHING_STATE})
      dispatch({type:SET_UPDATE_PASS_RES, payload:null})
      const {data} = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/updatepassword`,object
      );
      if(data.success){
        dispatch({type:SET_UPDATE_PASS_RES,payload:{message:data.message}})

      }
      else{
        dispatch({type:SET_UPDATE_PASS_RES,payload:{message:data.error.message}})

      }
     
    } catch (err) {
      alert(err.message)
    } 
    finally{
      dispatch({type:TOGGLE_ISUSERFETCHING_STATE})
    }
  };