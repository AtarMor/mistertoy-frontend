import { userService } from '../../services/user.service.js'
import { store } from '../store.js'
import { SET_USER } from '../reducers/user.reducer.js'

export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch(err => {
            console.error('Cannot log in:', err)
            throw err
        })
}

export function signup(credentials) {
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch(err => {
            console.error('Cannot sign up:', err)
            throw err
        })
}

export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch(err => {
            console.error('Cannot log out:', err)
            throw err
        })
}

// export function updateUser(userToUpdate) {
//     return userService.updateUserPrefs(userToUpdate)
//         .then((updatedUser) => {
//             store.dispatch({ type: SET_USER, user: updatedUser })
//         })
// }