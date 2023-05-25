const { User } = require("../../app/models");

module.exports = async (req, res) => {
  try {
    const dataRequest = extractData(req);
    await validationLogin(dataRequest);
    const user = await findUser(dataRequest);
    if (!user) {
      res.send("Usuário não encontrado");
    }
    res.send(user);
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
    return await User.findOne({
      raw: true,
      where: {
        login: dataRequest.login,
        password: dataRequest.password,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
