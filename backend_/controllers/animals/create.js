const { Animal } = require('../../app/models')

module.exports = async (req, res) => {
    try {
        const requestData = extractData(req)
        await analyseData(requestData)
        const animal = await createAnimal(requestData)
        return res.send(animal)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

function extractData(request) {
    const { name, age, weight, breed, coat_color, size, species, reg_ibama } = request.body
    return { name, age, weight, breed, coat_color, size, species, reg_ibama }
}

async function analyseData(request) {
    try {
        if(!request.weight || !request.size) {
            throw new Error(`Idade e peso são obrigatorios`)
        }
        return
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

async function createAnimal(request) {
    try {
        return await Animal.create(request)
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}