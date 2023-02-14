const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
	'films',
	'Sveta_ops',
	'020302cv',
	{
		host: '188.68.206.186',
		port: '6432',
		dialect: 'postgres'
	}
)