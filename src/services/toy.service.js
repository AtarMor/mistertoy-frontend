import { httpService } from './http.service'

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getLabels
}

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

function query(filterBy, sortBy) {
    console.log('filterBy', filterBy);
    console.log('sortBy', sortBy);
    return httpService.get('toy', { params: { ...filterBy, ...sortBy } })
}

function getLabels() {
    return [...labels]
}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post('toy', toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: true
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', inStock: 'all' }
}

function getDefaultSort() {
    return { type: 'created', dir: -1 }
}