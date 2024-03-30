import { httpService } from './http.service'
import { utilService } from './util.service'

export const toyService = {
    query,
    getById,
    remove,
    save,
    addMsg,
    removeMsg,
    getEmptyToy,
    // getEmptyMsg,
    getDefaultFilter,
    getDefaultSort,
    getLabels,
    calcAvgPricePerLabel,
}

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

function query(filterBy, sortBy) {
    return httpService.get('toy', { ...filterBy, ...sortBy })
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

function addMsg(toyId, txt) {
    return httpService.post(`toy/${toyId}/msg`, txt)
}

function removeMsg(toyId, msgId) {
    return httpService.delete(`toy/${toyId}/msg/${msgId}`)
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: true,
        msgs: []
    }
}

function getEmptyMsg() {
    return {
        id: utilService.makeId(),
        txt: '',
        by: {
            _id: '',
            fullname: ''
        }
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', inStock: 'all' }
}

function getDefaultSort() {
    return { type: 'created', dir: -1 }
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