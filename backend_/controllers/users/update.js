const { User } = require('../../app/models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
        const idUser = jwt.verify(req.headers.token, process.env.KEYJWT);
        const id = idUser.id;
        const requestData = extractData(req)
        await analyseData(requestData)
        const user = await updateUser(id, requestData)
        return res.send(user)
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: error.message});
    }
}

function extractData(request) {
    const { name, email, password, cpf, login, birthdate } = request.body
    return { name, email, password, cpf, login, birthdate }
}

async function analyseData(request) {
    try {
        if(!request.login || !request.email) {
            throw new Error(`Login e Email são obrigatórios`)
        }
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

async function updateUser(id, request) {
    try {
        const [updateRows, [updatedUser]] = await User.update(request, {
            where: { id: id },
            returning: true
        });
        
        if(updateRows !== 1) throw new Error("Usuário não encontrado");
        
        return updatedUser;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
