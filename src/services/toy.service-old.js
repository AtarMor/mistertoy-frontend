import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const TOYS_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort
}

function query(filterBy = {}, sortBy = {}) {
    return storageService.query(TOYS_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }
            if (filterBy.maxPrice) {
                toys = toys.filter(toy => toy.price < filterBy.maxPrice)
            }
            if (filterBy.inStock !== 'all') {
                toys = toys.filter(toy => (filterBy.inStock === 'inStock' ? toy.inStock : !toy.inStock))
            }
            
            if (sortBy.name) toys.sort((toy1, toy2) => (toy1.name.localeCompare(toy2.name)) * sortBy.name)
            if (sortBy.price) toys.sort((toy1, toy2) => (toy1.price - toy2.price) * sortBy.price)
            if (sortBy.created) toys.sort((toy1, toy2) => (toy1.created - toy2.created) * sortBy.created)

            return toys
        })
}

function getById(toyId) {
    return storageService.get(TOYS_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(TOYS_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOYS_KEY, toy)
    } else {
        return storageService.post(TOYS_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: null,
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', inStock: 'all' }
}

function getDefaultSort() {
    return { type: 'created', dir: -1 }
}

function _createToys() {
    const toys = [
        _createToy('Talking doll'),
        _createToy('Teddy bear'),
        _createToy('Ball'),
        _createToy('Lego')
    ]
    utilService.saveToStorage(TOYS_KEY, toys)
}

function _createToy(name = '') {
    return {
        _id: utilService.makeId(),
        name,
        price: utilService.getRandomIntInclusive(50, 250),
        labels: _getRandLabels(),
        createdAt: utilService.getRandomTimestamp(),
        inStock: Math.random() > 0.1
    }
}

function _getRandLabels() {
    const lablesToReturn = []
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']
    while (lablesToReturn.length < 2) {
        const randLabel = labels[utilService.getRandomIntInclusive(0, labels.length - 1)]
        if (!lablesToReturn.includes(randLabel)) lablesToReturn.push(randLabel)
    }
    return lablesToReturn
}