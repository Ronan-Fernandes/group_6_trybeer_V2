const { user } = require('../models');
const createToken = require('./createToken');

const userLoginServ = async (userEmail, userPassword) => {
  const userLogin = await user.findOne({ where: { email: userEmail } });
  if (userLogin == null) throw Error('Login ou senha inválido');
  console.log('userNovo', userLogin);
  // throw Error('Login ou senha inválido');
  const { password, ...data } = userLogin.dataValues;
  if (userLogin && userPassword === password) {
    const token = createToken(data);
    return { token, data };
  }
  throw Error('Login ou senha inválido');
};
module.exports = { userLoginServ };
