import { Link } from "react-router-dom";

export function ToyPreview({ toy, onRemoveToy }) {
    return <article>
        <h2 className="toy-name">{toy.name}</h2>
        <p>Price: <span>${toy.price.toLocaleString()}</span></p>
        <img src={`https://robohash.org/${toy.name}`} alt="" />
        <div className="btn-container">
            <Link to={`/toy/${toy._id}`}><button>Details</button></Link>
            <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link>
            <button onClick={() => onRemoveToy(toy._id)}>x</button>
        </div>
    </article>
}