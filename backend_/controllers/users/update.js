const { User } = require('../../app/models')

module.exports = async (req, res) => {
    try {
    const dataRequest = extractData(req);
    await validationUser(dataRequest);
    const user = await updateUser(dataRequest);
    res.sendStatus(200)
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };
  
  function extractData(request) {
    const { name, email, password, cpf, login, birthdate } = request.body
    return { name, email, password, cpf, login, birthdate }
  }
  
  async function validationUser(dataRequest) {
    if (!dataRequest.login) {
      throw new Error("Usuário não existe!");
    }
  }

  async function updateUser(dataRequest) {
    try {

        let 

        return await User.update(, {
            where: {
              
            }
          });
    } catch (error) {
        console.log(error)
        throw new Error(error)   
    }
}