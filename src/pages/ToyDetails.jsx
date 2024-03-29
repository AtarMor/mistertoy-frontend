import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { useSelector } from "react-redux"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const user = useSelector(storeState => storeState.userModule.user)

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
            <div className="toy-desc">
                <h1 className="toy-name">{toy.name}</h1>
                <h2 className="toy-price">Price: ${toy.price}</h2>
                {toy.labels.length ? <h2 className="toy-labels">Labels: {toy.labels.join(', ')}</h2> : ''}
                <h2 className={toy.inStock ? 'in-stock' : 'unavailable'}>
                    {toy.inStock ? 'In stock' : 'Unavailable'}
                </h2>
                <h3 className="toy-created">Added on {utilService.getFormattedDate(toy.created)}</h3>
                <div className="btn-container">
                    {user && user.isAdmin &&
                        <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link>}
                    <Link to={`/toy`}><button>Back</button></Link>

                </div>
            </div>
            <img src={`https://robohash.org/${toy.name}`} alt="" />
        </section>
    )
}