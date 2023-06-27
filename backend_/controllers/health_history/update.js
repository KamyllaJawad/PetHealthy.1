const { HealthHistory } = require("../../app/models");
let io = null

// nao alterar pois dará o seguinte erro: TypeError: Cannot read properties of null (reading 'emit') at module.exports
setTimeout(() => {
   io = require('../../app');

},1000)

module.exports = async (req, res) => {
  try {
    const id = req.params.id; // vamos usar o id do histórico a ser atualizado
    const requestData = extractData(req);
    await analyseData(requestData);
    const healthHistory = await updateHealthHistory(id, requestData);
    io.emit('updateHealthHistory', {message: 'Historico Atualizado!'})
    return res.send(healthHistory)
  } catch (error) {
    console.log(error);
    return res.status(500).send({error: error.message});
  }
};

function extractData(req) {
  const { event_date, description, fk_event_type, fk_animal } = req.body;
  const requestData = {
    event_date,
    description,
    fk_event_type,
    fk_animal
  };
  return requestData;
}

async function analyseData(request) {
  if(!request.event_date) throw new Error("event_date is required");
}

async function updateHealthHistory(id, request) {
  try {
    const healthHistory = await HealthHistory.update({
      event_date: request.event_date,
      description: request.description,
      fk_event_type: request.fk_event_type,
      fk_animal: request.fk_animal
    }, {
      where: {
        id: id
      },
      returning: true
    });

    if(!healthHistory[0]) throw new Error("Health History not found");

    return healthHistory[1][0];
    
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
}
