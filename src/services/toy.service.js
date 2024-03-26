import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const TOYS_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(TOYS_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            const regExp = new RegExp(filterBy.txt, 'i')
            return toys.filter(toy =>
                regExp.test(toy.name) &&
                toy.price <= filterBy.maxPrice
            )
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
        createdAt: null,
        inStock: null,
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
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
        createdAt: Date.now(),
        inStock: Math.random() > 0.9
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