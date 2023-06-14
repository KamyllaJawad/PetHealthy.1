// const { Animal } = require('../../app/models')
// const jwt = require('jsonwebtoken');

// module.exports = async (req, res) => {
//   try {
//     const dataRequest = extractData(req);
//     await validationUser(dataRequest);
//     const user = await updateUser(dataRequest);
//     res.sendStatus(200)
//   } catch (error) {
//     console.log(error);
//     return res.send(error);
//   }
// }

// function extractData(request) {
//   const { name, email, password, cpf, login, birthdate } = request.body
//   return { name, email, password, cpf, login, birthdate }
// }

// async function validationUser(dataRequest) {
//   if (!dataRequest.login) {
//     throw new Error("Usuário não existe!");
//   }
// }

// async function updateUser(dataRequest) {
//   try {

//     return await User.update({
//       where: {


//       }
//     });
//   } catch (error) {
//     console.log(error)
//     throw new Error(error)
//   }
// }


const { User } = require('../../app/models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  try {
    const dataRequest = extractData(req);
    await validationUser(dataRequest);

    // Extrair o token do cabeçalho da requisição
    const token = req.headers.authorization.replace('Bearer ', '');

    // Verificar a validade do token
    const decodedToken = jwt.verify(token, 'seu_segredo');

    // Obter o ID do usuário a partir do token decodificado
    const userId = decodedToken.id;

    // Atualizar as informações do usuário no banco de dados
    await updateUser(userId, dataRequest);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

function extractData(request) {
  const { name, email, password, cpf, login, birthdate } = request.body;
  return { name, email, password, cpf, login, birthdate };
}

async function validationUser(dataRequest) {
  if (!dataRequest.login) {
    throw new Error("Usuário não existe!");
  }
}

async function updateUser(userId, dataRequest) {
  try {
    return await User.update(dataRequest, {
      where: { id: userId }
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

