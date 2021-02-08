import axios from "axios"
import { SET_LIBRARY,TOGGLE_ISBOOK_ADDING, SET_BOOKS, SET_INDIVIDUAL, SET_EMPTY,SET_WILLREADINGINDIVIDUAL,SET_READINGINDIVIDUAL,DELETE_READINDIVIDUAL,DELETE_READINGINDIVIDUAL,DELETE_WILLREADINDIVIDUAL, SET_LIBRARY_NULL } from "../actionTypes"
export const setlibrary = (query) => async (dispatch) => {
    try {
        if (query.length>0) {
            const { data } = await axios(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
            let bookstitle = []
            let title;
            let link;
            let bookinfo;
            if (data) {
                for (let i = 0; i < data.items.length; i++) {
                    title = data.items[i].volumeInfo.title
                    link = data.items[i].selfLink
                    bookinfo = {
                        title, link
                    }
                    bookstitle.push(title)
                    dispatch({ type: SET_LIBRARY, payload: bookinfo }) 
                }
                
                dispatch({ type: SET_BOOKS, payload: bookstitle })

            }
        }
    }
    catch (err) {
        console.error(err)
    }
}

export const fetchlibrary = (history) => async (dispatch) => {
    try {
        dispatch({type:SET_LIBRARY_NULL})
        dispatch({type:TOGGLE_ISBOOK_ADDING})

       const {data} = await axios(`${process.env.REACT_APP_BASE_URL}/library`,{
        headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
      })
      if(data.success){
        for (let value of data.collection ){
            if(value.collectionId===1){
                dispatch({ type: SET_INDIVIDUAL, payload: value })
            }
            else if (value.collectionId===2){
                dispatch({ type: SET_READINGINDIVIDUAL, payload: value })
            }
            else if(value.collectionId ===3){
                dispatch({ type: SET_WILLREADINGINDIVIDUAL, payload: value })
            }
      }
      }
      else{
          history.push('/login')
      }
    }
    catch (err) {
        console.error(err)
    }
    finally{
        dispatch({type:TOGGLE_ISBOOK_ADDING})

    }
}

export const getuserLibrary = (userId) => async (dispatch) => {
    try {
        console.log('Ia m ri')
        dispatch({type:SET_LIBRARY_NULL})
        dispatch({type:TOGGLE_ISBOOK_ADDING})

       const {data} = await axios(`${process.env.REACT_APP_BASE_URL}/library/${userId}`,{
        headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
      })
      console.log(data)

      for (let value of data.collection ){
            if(value.collectionId===1){
                dispatch({ type: SET_INDIVIDUAL, payload: value })
            }
            else if (value.collectionId===2){
                dispatch({ type: SET_READINGINDIVIDUAL, payload: value })
            }
            else if(value.collectionId ===3){
                dispatch({ type: SET_WILLREADINGINDIVIDUAL, payload: value })
            }
      }
    }
    catch (err) {
        console.error(err)
    }
    finally{
        dispatch({type:TOGGLE_ISBOOK_ADDING})

    }
}


export const getlibrary = (query, booksarray) => async (dispatch) => {
    try {
        let index = booksarray.findIndex(x => x.title === query);
        console.log(index, booksarray, query)
        if (index !== -1) {
            dispatch({type:TOGGLE_ISBOOK_ADDING})
            const { data } = await axios(`${booksarray[index]["link"]}`)
            const bookObj = { bookId: data.id, title:data.volumeInfo.title, image:data.volumeInfo.imageLinks.smallThumbnail}
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/library`,{bookId:data.id,title:data.volumeInfo.title,image:data.volumeInfo.imageLinks.smallThumbnail, collectionId:1},{
                headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
              })
            if (res.data.success){
                if (data) {
                    dispatch({ type: SET_INDIVIDUAL, payload: bookObj })
                    dispatch({type:SET_EMPTY})
                }
            }
            else{
                alert(res.data.message)
            }
            
        }
    }
    catch (e) {
        console.error(e)
    }
    finally{
        dispatch({type:TOGGLE_ISBOOK_ADDING})
    }
}

export const getreadinglibrary = (query, booksarray) => async (dispatch) => {
    try {
        let index = booksarray.findIndex(x => x.title === query);
        console.log(index, booksarray, query)
        if (index !== -1) {
            dispatch({type:TOGGLE_ISBOOK_ADDING})
            const { data } = await axios(`${booksarray[index]["link"]}`)
            const bookObj = { bookId: data.id, title:data.volumeInfo.title, image:data.volumeInfo.imageLinks.smallThumbnail}
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/library`,{bookId:data.id,title:data.volumeInfo.title,image:data.volumeInfo.imageLinks.smallThumbnail, collectionId:2},{
                headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
              })
            if(res.data.success){
                if (data) {
               
                    dispatch({ type: SET_READINGINDIVIDUAL, payload: bookObj })
                    dispatch({type:SET_EMPTY})
                }
            }
            else{
                alert(res.data.message)
            }
            
        }
    }
    catch (e) {
        console.error(e)
    }
    finally{
        dispatch({type:TOGGLE_ISBOOK_ADDING})

    }
}

export const getwillreadinglibrary = (query, booksarray) => async (dispatch) => {
    try {
        let index = booksarray.findIndex(x => x.title === query);
        console.log(index, booksarray, query)
        if (index !== -1) {
            dispatch({type: TOGGLE_ISBOOK_ADDING})
            const { data } = await axios(`${booksarray[index]["link"]}`)
            const bookObj = { bookId: data.id, title:data.volumeInfo.title, image:data.volumeInfo.imageLinks.smallThumbnail}
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/library`,{bookId:data.id,title:data.volumeInfo.title,image:data.volumeInfo.imageLinks.smallThumbnail, collectionId:3},{
                headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
              })
            if(res.data.success){
                if (data) {
                    dispatch({ type: SET_WILLREADINGINDIVIDUAL, payload: bookObj })
                    dispatch({type:SET_EMPTY})
                }
            }
            else{
                alert(data.message)
            }
        }
    }
    catch (e) {
        console.error(e)
    }
    finally{
        dispatch({type:TOGGLE_ISBOOK_ADDING})
    }
}

export const deleteread=(id)=>async (dispatch)=>{
    try{
        dispatch({type:TOGGLE_ISBOOK_ADDING})
        const {data} =await axios.delete(`${process.env.REACT_APP_BASE_URL}/library/${id}`,{
            headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
          })
          if(data.success){
            dispatch({type:DELETE_READINDIVIDUAL,payload:id})

          }
          else{
              alert(data.error.message)
          }
    }
    catch(err){
        alert(err)
    }
    finally{
        dispatch({type:TOGGLE_ISBOOK_ADDING})

    }
    
}

export const deletereading=(id)=>async (dispatch)=>{
    try{
        dispatch({type:TOGGLE_ISBOOK_ADDING})
        const {data} =await axios.delete(`${process.env.REACT_APP_BASE_URL}/library/${id}`,{
            headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
          })
          if(data.success){
            dispatch({type:DELETE_READINGINDIVIDUAL,payload:id})

          }
          else{
              alert(data.error.message)
          }
    }
    catch(err){
        alert(err)
    }
    finally{
        dispatch({type:TOGGLE_ISBOOK_ADDING})

    }
}

export const deletewillread=(id)=>async (dispatch)=>{
    try{
        dispatch({type:TOGGLE_ISBOOK_ADDING})
        const {data} =await axios.delete(`${process.env.REACT_APP_BASE_URL}/library/${id}`,{
            headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
          })
          if(data.success){
            dispatch({type:DELETE_WILLREADINDIVIDUAL,payload:id})

          }
          else{
              alert(data.error.message)
          }
    }
    catch(err){
        alert(err)
    }
    finally{
        dispatch({type:TOGGLE_ISBOOK_ADDING})

    }
}