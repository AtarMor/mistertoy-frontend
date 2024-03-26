import { useDispatch, useSelector } from "react-redux"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { loadToys, removeToy, setFilterBy, setSortBy } from "../store/actions/toy.actions"
import { ToyList } from "../cmps/ToyList"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ToyFilter } from "../cmps/ToyFilter"
import { ToySort } from "../cmps/ToySort"

export function ToyIndex() {
    const dispatch = useDispatch()
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy, sortBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSort(type) {
        setSortBy({ type, dir: -sortBy.dir })
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy was removed')
            })
            .catch(() => showErrorMsg('Had trouble removing the toy'))
    }

    function addToCart(toy) {
        console.log(`Adding ${toy.name} to cart`)
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsg('Added to Cart')
    }

    return <main className="toy-index">
        <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />

        <ToySort onSetSort={onSetSort} sortBy={sortBy} />

        <Link to="/toy/edit"><button>Add Toy</button></Link>

        {isLoading && <div>Loading...</div>}
        {!isLoading && <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}
            addToCart={addToCart}
        />}
    </main>
}
