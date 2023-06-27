const { Animal } = require('../../app/models')
const { OwnerAnimal } = require('../../app/models')
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
        const requestData = extractData(req)
        const animal = await findAnimal(requestData)
        return res.send(animal)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

function extractData(request) {


    const { id } = request.query
    return { id }

    // let idUser = jwt.verify(request.headers.token, process.env.KEYJWT);
    // idUser = idUser.id
    // const { name, age, weight, breed, coat_color, size, species, reg_ibama } = request.body
    // return { name, age, weight, breed, coat_color, size, species, reg_ibama, idUser }
}

async function findAnimal(request) {
    try {
        return await Animal.findOne({
            where: {
                id: request.id
            },
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
