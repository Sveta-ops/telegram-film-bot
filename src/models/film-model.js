const sequelize = require('../../database');
const {DataTypes} = require('sequelize')
const Film = sequelize.define('film', {
	id: {type: DataTypes.INTEGER, primaryKey:true, unique:true},
	name: {type: DataTypes.STRING},
	genreFilm: {type: DataTypes.STRING},
	countyFilm: {type: DataTypes.STRING}
})

module.exports = Film;