import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { addReview, loadReviews, removeReview } from "../store/actions/review.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function ToyReview({ toy }) {
    const user = useSelector(storeState => storeState.userModule.user)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const filterBy = {toyId: toy._id}

    const [reviewToEdit, setReviewToEdit] = useState({ txt: '', toyId: toy._id })

    useEffect(() => {
        loadReviews(filterBy)
    }, [])

    const handleChange = ev => {
        const { name, value } = ev.target
        setReviewToEdit({ ...reviewToEdit, [name]: value })
    }

    const onAddReview = async ev => {
        ev.preventDefault()
        if (!reviewToEdit.txt) return alert('Please enter a review')
        try {
            await addReview(reviewToEdit)
            showSuccessMsg('Review added')
            setReviewToEdit({ txt: '', toyId: toy._id })
        } catch (err) {
            showErrorMsg('Cannot add review')
        }
    }
    console.log(reviewToEdit);
    const onRemoveReview = async reviewId => {
        try {
            await removeReview(reviewId)
            showSuccessMsg('Review removed')
        } catch (err) {
            showErrorMsg('Cannot remove')
        }
    }

    console.log(reviews);
    return <div className="user-reviews">
        <h1>Reviews</h1>
        <ul className="clean-list">
            {reviews?.map(review => <li key={review._id}>
                <p><span>{review.user.fullname}:</span> {review.txt}</p>
                {user?.isAdmin &&
                    <button className="del-review-btn" onClick={() => onRemoveReview(review._id)}>
                        x</button>}
            </li>)}
            <li><form className="add-review-form" onSubmit={onAddReview}>
                <input
                    type="text"
                    name="txt"
                    placeholder="Enter a review"
                    value={reviewToEdit.txt}
                    onChange={handleChange}>
                </input>
                <button>Submit</button>
            </form></li>
        </ul>
    </div>
}