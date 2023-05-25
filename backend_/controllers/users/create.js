const { User } = require('../../app/models')

module.exports = async (req, res) => {
    try {
        const requestData = extractData(req)
        await analyseData(requestData)
        const user = await createUser(requestData)
        return res.send(user)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

function extractData(request) {
    const { name, email, password, cpf, login, birthdate } = request.body
    return { name, email, password, cpf, login, birthdate }
}

async function analyseData(request) {
    try {
        if(!request.login || !request.email) {
            throw new Error(`Nome e Email são obrigatorios`)
        }
        return
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

async function createUser(request) {
    try {
        return await User.create(request)
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}