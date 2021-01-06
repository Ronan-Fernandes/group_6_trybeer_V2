'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const SalesProductsTable = queryInterface.createTable('sales_products', {
      sale_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: { allownull: false, type: Sequelize.INTEGER },
      quantity: { allownull: false, unique: true, type: Sequelize.STRING },
      sale_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'sales', key: 'id' },
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'products', key: 'id' },
      },
    });

    return SalesProductsTable;
  },

  down: async (queryInterface, _Sequelize) =>
    queryInterface.dropTable('sales_products'),
};
