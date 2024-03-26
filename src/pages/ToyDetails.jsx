import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy: {toy.name}</h1>
            <h2>Price: ${toy.price}</h2>
            <h2>Labels: {toy.labels.join(', ')}</h2>
            <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link>
            <Link to={`/toy`}><button>Back</button></Link>
        </section>
    )
}