import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy }) {
    return <ul className="toy-list clean-list">
        {toys.map(toy => {
            return <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
            </li>
        }
        )}
    </ul>
}