const { Sale } = require('../models');

const allSalesSev = async () => {
  const sales = await Sale.findAll({
    attributes: { exclude: ['userId'] },
  });

  return sales;
};

const finishSalesServ = async (id, total, address, number) => {
  const totalToInsert = total.replace(',', '.');

  const dateNow = new Date();
  const date = `${dateNow.getFullYear()}-${
    dateNow.getMonth() + 1
  }-${dateNow.getDate()} - ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;

  const checkout = await Sale.create({
    id,
    totalToInsert,
    address,
    number,
    date,
  });
  const sales = await Sale.findAll({
    attributes: { exclude: ['userId'] },
  });
  const newSale = await sales.filter((elem) => elem.user_id === id);

  const saleResponse = {
    ...checkout,
    saleId: newSale[newSale.length - 1].id,
  };

  return saleResponse;
};

const updateStatusServ = async (id, status) => {
  await Sale.update(
    {
      status,
    },
    { where: { id } },
  );

  return { message: status };
};

module.exports = {
  allSalesSev,
  finishSalesServ,
  updateStatusServ,
};
