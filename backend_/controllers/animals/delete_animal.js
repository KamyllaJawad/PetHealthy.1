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
    const id = req.params.id; // vamos usar o id do animal a ser deletado
    const animal = await Animal.findOne({ where: { id: id } });

    if (!animal) {
      return res.status(404).send({ message: "Animal não encontrado!" });
    }

    // Verificar se existem entradas na tabela OwnerAnimal que referenciam esse animal
    const ownerAnimal = await OwnerAnimal.findOne({ where: { animal_id: id } });

    if (ownerAnimal) {
      // Se existirem, deletá-las antes de deletar o animal
      await OwnerAnimal.destroy({ where: { animal_id: id } });
    }

    await Animal.destroy({ where: { id: id } });
    io.emit('deleteAnimal', {message: 'Animal Deletado!'})
    return res.send({ message: `Animal com o id ${id} deletado com sucesso!`});
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({error: error.message});
  }
};
