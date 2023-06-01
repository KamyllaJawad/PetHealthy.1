const { User } = require("../../app/models");
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  try {
    const dataRequest = extractData(req);
    await validationLogin(dataRequest);
    const token = await findUser(dataRequest);
    if (!token) {
      res.send("Usuário não encontrado");
    }
    res.send(token);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

function extractData(request) {
  const { login, password } = request.body;
  return { login, password };
}

async function validationLogin(dataRequest) {
  if (!dataRequest.login || !dataRequest.password) {
    throw new Error("Login ou Senha inválida");
  }
}

async function findUser(dataRequest) {
  try {
    let user = await User.findOne({
      raw: true,
      where: {
        login: dataRequest.login,
        password: dataRequest.password,
      },
    });
    let token = null
    if (user){
      token = jwt.sign(user, process.env.KEYJWT)
    }
    console.log(token)
    return token
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

