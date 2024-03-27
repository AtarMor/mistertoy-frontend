import { toyService } from "../../services/toy.service"
import { ADD_TOY, EDIT_TOY, REMOVE_TOY, SET_FILTER_BY, SET_IS_LOADING, SET_SORT_BY, SET_TOYS } from "../reducers/toy.reducer"
import { store } from "../store"


export function loadToys() {
    const filterBy = store.getState().toyModule.filterBy
    const sortBy = store.getState().toyModule.sortBy
    console.log('actions', filterBy);
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy, sortBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? EDIT_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setSortBy(sortBy) {
    store.dispatch({ type: SET_SORT_BY, sortBy })
}