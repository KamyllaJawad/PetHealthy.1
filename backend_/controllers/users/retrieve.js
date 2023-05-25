const { User } = require("../../app/models")

module.exports = async (req, res) => {
    try {
        const requestData = extractData(req)
        const user = await retrieveUser(requestData)
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


async function retrieveUser(request) {
    try {
        return await User.findAll(request)
    } catch (error) {
        console.log(error)
        throw new Error(error)   
    }
}