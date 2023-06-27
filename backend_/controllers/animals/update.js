const { Animal } = require("../../app/models");
const { OwnerAnimal } = require("../../app/models");
const jwt = require('jsonwebtoken');
let io = null

// nao alterar pois dará o seguinte erro: TypeError: Cannot read properties of null (reading 'emit') at module.exports
setTimeout(() => {
   io = require('../../app');

},1000)

module.exports = async (req, res) => {
  try {
    const id = req.params.id; // vamos usar o id do animal a ser atualizado
    const requestData = extractData(req);
    await analyseData(requestData);
    const animal = await updateAnimal(id, requestData);
    io.emit('updateAnimal', {message: 'Animal Atualizado!'})
    return res.send(animal)
  } catch (error) {
    console.log(error);
    return res.status(500).send({error: error.message});
  }
};

function extractData(request) {
  let idUser = jwt.verify(request.headers.token, process.env.KEYJWT);
  idUser = idUser.id;
  const { name, age, weight, breed, coat_color, size, species, reg_ibama } =
    request.body;
  return { name, age, weight, breed, coat_color, size, species, reg_ibama, idUser };
}

async function analyseData(request) {
  try {
    if (!request.weight || !request.size) {
      throw new Error(`Peso e tamanho são obrigatórios`);
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function updateAnimal(id, request) {
  try {
    const animal = await Animal.update(request, {
      where: { id: id },
      returning: true
    });

    if(!animal[0]) throw new Error("Animal não encontrado");

    return animal[1][0];
    
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
}
