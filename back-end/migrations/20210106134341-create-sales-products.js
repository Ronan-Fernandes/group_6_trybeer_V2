module.exports = {
  up: async (queryInterface, Sequelize) => {
    const SalesProductsTable = queryInterface.createTable('sales_products', {
      sale_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: 'sales', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      product_id: {
        allownull: false,
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: { allownull: false, unique: true, type: Sequelize.STRING },
    });

    return SalesProductsTable;
  },

  down: async (queryInterface, _Sequelize) =>
    queryInterface.dropTable('sales_products'),
};
