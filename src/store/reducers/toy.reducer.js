import { toyService } from "../../services/toy.service"

//* Toys
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const EDIT_TOY = 'EDIT_TOY'

//* Shopping cart
export const TOGGLE_CART_IS_SHOWN = 'TOGGLE_CART_IS_SHOWN'
export const ADD_TOY_TO_CART = 'ADD_TOY_TO_CART'
export const REMOVE_TOY_FROM_CART = 'REMOVE_TOY_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_SORT_BY = 'SET_SORT_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: [],
    isCartShown: false,
    shoppingCart: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
    sortBy: toyService.getDefaultSort()
}

export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {
        //* Toys
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case REMOVE_TOY:
            return {
                ...state, toys: state.toys.filter(toy =>
                    toy._id !== action.toyId)
            }
        case ADD_TOY:
            return { ...state, toys: [...state.toys, action.toy] }
        case EDIT_TOY:
            return {
                ...state, toys: state.toys.map(toy =>
                    toy._id === action.toy._id ? action.toy : toy)
            }

        //* Shopping cart
        case TOGGLE_CART_IS_SHOWN:
            return { ...state, isCartShown: !state.isCartShown }

        case ADD_TOY_TO_CART:
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, action.toy]
            }
        case REMOVE_TOY_FROM_CART:
            const shoppingCart = state.shoppingCart.filter(toy => toy._id !== action.toyId)
            return { ...state, shoppingCart }
        case CLEAR_CART:
            return { ...state, shoppingCart: [] }
        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
        case SET_SORT_BY:
            return { ...state, sortBy: { ...action.sortBy } }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return state
    }
}