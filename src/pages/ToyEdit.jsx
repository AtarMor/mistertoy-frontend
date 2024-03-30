import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { LabelSelection } from "../cmps/LabelSelection.jsx"

export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field, checked } = target
        value = type === 'number' ? +value : value
        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
        if (type === 'checkbox') {
            if (checked) {
                setToyToEdit((prev) => ({ ...prev, inStock: true }))
            } else {
                setToyToEdit((prev) => ({ ...prev, inStock: false }))
            }
            return
        }
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        console.log(toyToEdit);
        if (!toyToEdit.price) toyToEdit.price = 100
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues saving toy', err)
                showErrorMsg('Had issues saving toy')
            })
    }

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} toy</h2>

            <form onSubmit={onSaveToy} >
                <label htmlFor="name">Name: </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name"
                    value={toyToEdit.name}
                    onChange={handleChange}
                />
                <label htmlFor="price">Price: </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />
                <div className="label-select">
                    <LabelSelection
                        toyToEdit={toyToEdit}
                        setToyToEdit={setToyToEdit} />
                </div>
                <div>
                <label htmlFor="inStock">In stock?</label>
                <input type="checkbox"
                    name="inStock"
                    id="inStock"
                    onChange={handleChange}
                    checked={toyToEdit.inStock}
                />
                </div>

                <div className="btn-container">
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>

        </section>
    )
}