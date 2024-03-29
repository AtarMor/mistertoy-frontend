import { useState } from 'react'
import { userService } from '../services/user.service.js'
import { login, signup } from '../store/actions/user.actions.js'

export function LoginSignup() {
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        const method = isSignupState ? signup : login
        method(credentials)
            .then((user) => {
                console.log(`Welcome ${user.fullname}`)
            })
            .catch(err => {
                console.error('Oops try again')
            })
    }

    function onToggleSignupState() {
        setIsSignupState(!isSignupState)
    }

    const { username, password, fullname } = credentials
    return (
        <div className="login-page">

            <form className="login-form" onSubmit={onSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={handleCredentialsChange}
                    required
                    autoFocus
                />

                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={handleCredentialsChange}
                    required
                />

                {isSignupState && <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    placeholder="Full name"
                    onChange={handleCredentialsChange}
                    required
                />}

                <button>{isSignupState ? 'Sign up' : 'Log in'}</button>
            </form>

            <div className="btns">
                <a href="#" onClick={onToggleSignupState}>
                {isSignupState ? <>Already a member? <span>Log in</span></> : <>Don't have an account yet? <span>Sign Up</span></>}
                </a >
            </div>
        </div >
    )
}

