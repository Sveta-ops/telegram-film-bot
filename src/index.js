const TelegramBot = require('node-telegram-bot-api')
const config = require('./config')
const helper = require('./helpers')
const kb = require('./keyboard-buttons')
const keyboard = require('./keyboard')

helper.logStart()

let genreId = ''
let countryId = ''
const bot = new TelegramBot (config.TOKEN, {
	polling: {
		interval: 300,
		autoStart: true
	}
})

bot.onText(/\/start/, msg => {
	console.log(msg)
	bot.sendMessage (helper.getChatId(msg), 'Привет, ' + msg.from.first_name + ', чем могу тебе помочь?)', {
		reply_markup: {
			keyboard: keyboard.home,
			one_time_keyboard: true
		}
	})
})


bot.on('message', msg => {

	switch (msg.text) {
		case kb.home.close:
			bot.sendMessage(helper.getChatId(msg), 'Жаль, что не смог вам помочь. Буду ждать нашей встречи)');
			break;
		case kb.home.randomFilm:
			bot.sendMessage(helper.getChatId(msg), 'Подбираю');
			break;
		case kb.home.character:
			bot.sendMessage(helper.getChatId(msg), 'Выберите характеристику, по которой вы хотите сделать подбор фильма', {
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: 'Жанр',
								callback_data: 'genreAll'
							}
						],
						[
							{
								text: 'Страна',
								callback_data: 'countryAll'
							}
						],
						[
							{
								text: 'Готово',
								callback_data: 'end'
							}
						]
					]
				}
			});
			break;
		case kb.genre.horor:
		case kb.genre.comedy: 
		case kb.genre.drama:
			genreId = msg.text;
			break;
		case kb.country.rus:
		case kb.country.uk: 
		case kb.country.japan: 
			countryId = msg.text;
			break;
		case kb.end.change:
			bot.sendMessage(helper.getChatId(msg), 'Выберите характеристику, по которой вы хотите сделать подбор фильма', {
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: 'Жанр',
								callback_data: 'genreAll'
							}
						],
						[
							{
								text: 'Страна',
								callback_data: 'countryAll'
							}
						],
						[
							{
								text: 'Готово',
								callback_data: 'end'
							}
						]
					]
				}
			});
			break;
		case kb.end.ok: 
			bot.sendMessage (helper.getChatId(msg), 'Уже ищу подходящий фильм под выбранные вами характеристики');
			console.log(
				{'Жанр': genreId}, 
				{'Страна': countryId}
			);
			break
	}
})

bot.on('callback_query', query => {
	const id = query.message.chat.id
	if (query.data === 'genreAll') {
		bot.sendMessage (id, 'Выберите жанр', {
			reply_markup: {
				keyboard: keyboard.genre,
				one_time_keyboard: true
			} 
		})
	} else if (query.data === 'countryAll') {
		bot.sendMessage (id, 'Выберите страну производитель', {
			reply_markup: {
				keyboard: keyboard.country,
				one_time_keyboard: true
			} 
		})
	} else if (query.data === 'end') {
		const html = `
		<strong> Ваш запрос на фильм </strong>
		<u>Жанр:</u> <i>${genreId}</i>
		<u>Страна:</u> <i>${countryId}</i>`
		bot.sendMessage (id, html, {
			parse_mode: 'HTML'} )
		bot.sendMessage (id, 'Проверьте правильность введенных данных', {
				reply_markup: {
				keyboard: keyboard.end
			}
		})
	}
})
