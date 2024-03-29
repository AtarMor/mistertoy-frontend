import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function ToyPreview({ toy, onRemoveToy }) {
    const user = useSelector(storeState => storeState.userModule.user)

    return <article>
        <Link to={`/toy/${toy._id}`}>
            <h2 className="toy-name">{toy.name}</h2>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <img src={`https://robohash.org/${toy.name}`} alt="" />
        </Link>
        {user && user.isAdmin &&
            <div className="btn-container">
                <Link to={`/toy/${toy._id}`}><button>Details</button></Link>
                <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link>
                <button onClick={() => onRemoveToy(toy._id)}>x</button>
            </div>
        }
    </article>
}