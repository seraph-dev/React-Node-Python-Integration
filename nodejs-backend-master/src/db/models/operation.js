'use strict';
module.exports = (sequelize, DataTypes) => {
  const Operation = sequelize.define(
    'Operation',
    {
      parameter: DataTypes.STRING,
      filename: DataTypes.STRING,
      Precisão: DataTypes.STRING,
      Revocação: DataTypes.STRING,
      Acurácia: DataTypes.STRING,
    },
    {},
  );
  Operation.associate = function (models) {
    // associations can be defined here
  };
  return Operation;
};
