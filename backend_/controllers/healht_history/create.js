const { Animal } = require("../../app/models");
const { OwnerAnimal } = require("../../app/models");
const jwt = require('jsonwebtoken');


module.exports = async (req, res) => {
  try {
    const requestData = extractData(req);
    await analyseData(requestData);
    const animal = await createAnimal(requestData);
    return res.send(animal);
  } catch (error) {
    console.log(error);
    return res.send(error);
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
      throw new Error(`Idade e peso são obrigatorios`);
    }
    return;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function createAnimal(request) {
  try {
    const animal =  await Animal.create(request);
    await OwnerAnimal.create({animal_id: animal.id, user_id: request.idUser})
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
