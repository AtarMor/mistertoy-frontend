import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { addMsg } from "../store/actions/toy.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const user = useSelector(storeState => storeState.userModule.user)
    const [msgTxt, setMsgTxt] = useState(null)

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

    function onMsgSubmit(ev) {
        ev.preventDefault()
        addMsg(toyId, msgTxt)
            .then(msg => {
                setToy({ ...toy, msgs: [...toy.msgs, msg] })
                showSuccessMsg('Message submitted.')
                setMsgTxt(null)
            })
            .catch(err => {
                console.log('Had issues saving toy', err)
                showErrorMsg('Had issues submitting message.')
            })
    }

    function handleChange({ target }) {
        setMsgTxt(target.value)
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
            <div className="user-msgs">
                <h1>User messages</h1>
                <ul className="clean-list">
                    {toy && toy.msgs && toy.msgs.map(msg => <li key={toy.id}>
                        {msg.by.fullname}: {msg.txt}
                    </li>)}
                    <li><form className="add-msg-form" onSubmit={onMsgSubmit}>
                        <input
                            type="text"
                            placeholder="Enter a message"
                            value={msgTxt}
                            onChange={handleChange}>
                        </input>
                        <button>Submit</button>
                    </form></li>
                </ul>
            </div>
        </section>
    )
}