const { HealthHistory } = require("../../app/models");

module.exports = async (req, res) => {
  try {
    const id = req.params.id; // vamos usar o id do animal
    const healthHistory = await HealthHistory.findAll({
      where: {
        fk_animal: id
      }
    });
    
    if(!healthHistory.length) throw new Error("Histórico de Saúde não encontrado para o animal com o id " + id);
    
    return res.send(healthHistory)
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({error: error.message});
  }
};
