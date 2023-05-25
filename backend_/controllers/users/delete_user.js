const { User } = require('../../app/models')

module.exports = async (req, res) => {
    try {
    const dataRequest = extractData(req);
    await validationUser(dataRequest);
    const user = await deleteUser(dataRequest);
    res.sendStatus(200)
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };
  
  function extractData(request) {
    const { login } = request.body;
    return { login };
  }
  
  async function validationUser(dataRequest) {
    if (!dataRequest.login) {
      throw new Error("Usuário não existe!");
    }
  }

  async function deleteUser(dataRequest) {
    try {
        return await User.destroy({
            where: {
              login: dataRequest.login
            }
          });
    } catch (error) {
        console.log(error)
        throw new Error(error)   
    }
}