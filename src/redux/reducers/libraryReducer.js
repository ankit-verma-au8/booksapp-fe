import { SET_LIBRARY,SET_LIBRARY_NULL, SET_BOOKS,TOGGLE_ISBOOK_ADDING, SET_INDIVIDUAL, SET_EMPTY, SET_READINGINDIVIDUAL, SET_WILLREADINGINDIVIDUAL, DELETE_READINDIVIDUAL, DELETE_READINGINDIVIDUAL, DELETE_WILLREADINDIVIDUAL } from "../actionTypes"

const initialState = {
    isbookAdding:false,
    booksinfo: [],
    bookstitle: null,
    readbooks: [],
    readingbooks: [],
    willreadbooks: []
};

export const libraryReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_LIBRARY:
            return { ...state, ...state.booksinfo.push(payload) };
        case SET_LIBRARY_NULL:
            return  {...state, readbooks:[], readingbooks:[], willreadbooks:[]}
        case TOGGLE_ISBOOK_ADDING:
            return {...state, isbookAdding:!state.isbookAdding}
        case SET_BOOKS:
            return { ...state, bookstitle: payload }
        case SET_INDIVIDUAL:
            return { ...state, readbooks:[...state.readbooks, payload] }
        case SET_READINGINDIVIDUAL:
            return { ...state, readingbooks:[...state.readingbooks, payload] }
        case SET_WILLREADINGINDIVIDUAL:
            return { ...state, willreadbooks:[...state.willreadbooks, payload] }
        case DELETE_READINDIVIDUAL:
            console.log(payload)
             let books = state.readbooks.filter(data => {
                return data.bookId !== payload
            })
            console.log(books)
            return { ...state, readbooks: books }
        case DELETE_READINGINDIVIDUAL:
            let abooks = state.readingbooks.filter(data => {
                return data.bookId !== payload
            })
            console.log(abooks)
            return { ...state, readingbooks: abooks }
        case DELETE_WILLREADINDIVIDUAL:
            let bbooks = state.willreadbooks.filter(data => {
                return data.bookId !== payload
            })
            console.log(bbooks)
            return { ...state, willreadbooks: bbooks }
        case SET_EMPTY:
            return { ...state, booksinfo: [] }
        default:
            return state;
    }
};