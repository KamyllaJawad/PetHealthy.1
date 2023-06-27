const { User } = require('../../app/models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      throw new Error('Token é obrigatório');
    }

    let decoded = jwt.verify(token, process.env.KEYJWT);
    const user = await User.findOne({ where: { id: decoded.id }});
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    await User.destroy({ where: { id: decoded.id }});

    return res.send({ message: `Usuário ${user.login} foi deletado com sucesso` });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};
