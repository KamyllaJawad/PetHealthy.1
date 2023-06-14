const { Animal } = require('../../app/models')
const { OwnerAnimal } = require('../../app/models')
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
        const requestData = extractData(req)
        const animal = await retrieveAnimal(requestData)
        return res.send(animal)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

function extractData(request) {
    let idUser = jwt.verify(request.headers.token, process.env.KEYJWT);
    idUser = idUser.id
    const { name, age, weight, breed, coat_color, size, species, reg_ibama } = request.body
    return { name, age, weight, breed, coat_color, size, species, reg_ibama, idUser }
}

async function retrieveAnimal(request) {
    try {
        const idUser = request.idUser
        const animalsIds = await OwnerAnimal.findAll({
            raw: true,
            attributes: ['animal_id'],
            where: {
                user_id: idUser
            }
        })
        return await Animal.findAll({
            where: {
                id: animalsIds.map(animal => animal.animal_id)
            }
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
