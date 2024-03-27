import { NavLink } from "react-router-dom";

export function AppHeader() {
    return <header>
        <h1>Mister Toy</h1>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/toy">Toys</NavLink>
        </nav>
    </header>
}