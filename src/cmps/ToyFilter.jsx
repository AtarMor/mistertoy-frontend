import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { toyService } from "../services/toy.service.js"

export function ToyFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        console.log(type, value);
        value = type === 'number' ? +value : value
        if (type === 'select-multiple') {
            setFilterByToEdit(prevFilter =>
            ({
                ...prevFilter, labels: filterByToEdit.labels.includes(value) ?
                    filterByToEdit.labels.filter(label => label !== value) :
                    [...filterByToEdit.labels, value]
            }))
            if (value === 'None') setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: [] }))
        }
        else setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }
    console.log(filterByToEdit);

    const labels = toyService.getLabels()
    return (
        <section className="toy-filter">
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="txt"
                    placeholder="Search by name"
                    value={filterByToEdit.txt || ''}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="Search by max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />

                <label htmlFor="inStock">In stock:</label>
                <select name="inStock" id="inStock" onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="inStock">In stock</option>
                    <option value="unavailable">Unavailable</option>
                </select>

                <label htmlFor="labels">Labels:</label>
                <select
                    multiple
                    id="labels"
                    name="labels"
                    value={filterByToEdit.labels}
                    onChange={handleChange}>
                    <option>None</option>
                    {labels.map(label => <option key={label}>{label}</option>)}
                </select>
            </form>
        </section>
    )
}