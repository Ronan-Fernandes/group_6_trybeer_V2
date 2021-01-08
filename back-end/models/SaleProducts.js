const SaleProduct = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('salesProduct', {
    sale_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  });
  SalesProducts.associate = (models) => {
    SalesProducts.belongsTo(models.sale, { as: 'sale', foreighKey: 'sale_id' });
    SalesProducts.belongsTo(models.product, { as: 'product', foreighKey: 'product_id' });
  };

  return SalesProducts;
};

module.exports = SaleProduct;
