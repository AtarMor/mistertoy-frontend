import { Link } from "react-router-dom";

export function ToyPreview({ toy, onRemoveToy }) {
    return <article>
        <h2>{toy.name}</h2>
        <p>Price: <span>${toy.price.toLocaleString()}</span></p>
        <Link to={`/toy/${toy._id}`}><button>Details</button></Link>
        <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link>
        <button onClick={() => onRemoveToy(toy._id)}>x</button>
    </article>
}