const kb = require('./keyboard-buttons')

module.exports = {
	home: [
		[kb.home.character],
		[kb.home.randomFilm],
		[kb.home.close]
	],
	genre: [
		[kb.genre.horor],
		[kb.genre.comedy],
		[kb.genre.drama]
	],
	country: [
		[kb.country.rus],
		[kb.country.uk],
		[kb.country.japan]
	],
	end:[
		[kb.end.ok],
		[kb.end.change]
	]
}