const { Animal } = require('../../app/models')
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
    const dataRequest = extractData(req);
    await validationAnimal(dataRequest);
    const animal = await deleteAnimal(dataRequest);
    res.sendStatus(200)
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };
  
  function extractData(request) {
    const { name } = request.body;
    return { name };
  }
  
  async function validationAnimal(dataRequest) {
    if (!dataRequest.name) {
      throw new Error("Animal não existe!");
    }
  }

  async function deleteAnimal(dataRequest) {
    try {
        return await Animal.destroy({
            where: {
              name: dataRequest.name
            }
          });
    } catch (error) {
        console.log(error)
        throw new Error(error)   
    }
}