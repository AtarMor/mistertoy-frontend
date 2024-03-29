import { NavLink } from "react-router-dom";
import { LoginSignup } from "./LoginSignup";
import { useSelector } from "react-redux";
import { logout } from "../store/actions/user.actions";

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)

    function onLogout() {
        logout()
            .then(() => {
                console.log('bye')
            })
    }

    return <header className="main-layout full">
        <div className="header-container">
            <h1>Mister Toy</h1>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>
        </div>

        <div className="login-signup">
            {user &&
                <div className='welcome-user'>
                    <h2>Hello {user.fullname}</h2>
                    <button onClick={onLogout}>Log out</button>
                </div>}

            {!user && <LoginSignup />}
        </div>
    </header>
}