import { useDispatch, useSelector } from "react-redux"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { loadToys, removeToy, saveToy } from "../store/actions/toy.actions"
import { ToyList } from "../cmps/ToyList"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [])

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

    if (isLoading) return <div>Loading...</div>
    return <main className="toy-index">
        <Link to="/toy/edit"><button>Add Toy</button></Link>
        <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}
            addToCart={addToCart}
        />
    </main>
}
