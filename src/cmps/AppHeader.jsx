import { NavLink } from "react-router-dom";

export function AppHeader() {
    return <header className="main-layout full">
        <div className="header-container">
            <h1>Mister Toy</h1>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>
        </div>
    </header>
}