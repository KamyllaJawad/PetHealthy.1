const { HealthHistory } = require("../../app/models");
let io = null

setTimeout(() => {
   io = require('../../app');
},1000)

module.exports = async (req, res) => {
    try {
      console.log(req.params)
      const id = req.params.id; 
      const deletedRows = await deleteHealthHistory(id);
  
      if (deletedRows === 0) {
        throw new Error("Registro de Histórico de Saúde não encontrado");
      } else {
        io.emit('deleteHealthHistory', {message: 'Registro de Histórico de Saúde Excluído!'})
        return res.send({message: `Registro de Histórico de Saúde com o id ${id} foi excluído com sucesso!`})
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({error: error.message});
    }
  };

async function deleteHealthHistory(id) {
  try {
    const deletedRows = await HealthHistory.destroy({
      where: {
        id: id
      }
    });
    return deletedRows;
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
}
