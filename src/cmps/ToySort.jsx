export function ToySort({ onSetSort, sortBy }) {
    return <div className="toy-sort-by">
        <button onClick={() => onSetSort('name')}>Name</button>
        <button onClick={() => onSetSort('price')}>Price</button>
        <button onClick={() => onSetSort('created')}>Created</button>
    </div>
}