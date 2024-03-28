import { httpService } from './http.service'

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getLabels,
    calcAvgPricePerLabel
}

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

function query(filterBy, sortBy) {
    return httpService.get('toy', { params: { filterBy, sortBy } })
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
    return { created : -1 }
}

function calcAvgPricePerLabel(toys, labels) {
    const labelMap = {}

    labels.forEach(label => {
        labelMap[label] = { total: 0, count: 0 }
    })

    toys.forEach(toy => {
        toy.labels.forEach(label => {
            labelMap[label].total += toy.price
            labelMap[label].count++
        })
    })

    const avgPricePerLabel = {}
    for (const label in labelMap) {
        if (labelMap[label].count !== 0) {
            avgPricePerLabel[label] = labelMap[label].total / labelMap[label].count
        } else {
            avgPricePerLabel[label] = 0
        }
    }
    return avgPricePerLabel
}