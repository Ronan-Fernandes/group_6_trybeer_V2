const rescue = require('express-rescue');
const { salesModel, usersModel } = require('../models_antigo');

const getProfile = rescue(async (req, res) => {
  const { email } = req.user;
  const profile = await usersModel.getUserByEmailMod(email);

  if (profile.email === undefined) throw new Error('email não cadastrado');
  const { id, password, role, ...newProfile } = profile;
  res.status(200).json(newProfile);
});

const getAdminSales = rescue(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const sales = await salesModel.getAdminOrderById(id);
  console.log(id);
  console.log('sales', sales);
  res.status(200).json(sales);
});

module.exports = { getProfile, getAdminSales };
