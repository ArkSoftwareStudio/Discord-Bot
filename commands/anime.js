const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const {aniApi} = require('../config.json');

const search = axios.create({
	baseURL : 'https://api.aniapi.com',
	headers : 
	{'Accept' : 'application/vnd.api+json', 
	'Content-Type' : 'application/vnd.api+json',
	'Authorization' : `${aniApi}`}
});

function sliceTitle(title){
	if(title.length >= 100){
		title.slice(0, -6);
		return title + '...';
	}else{
		return title;
	}
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('anime')
		.setDescription('Looks for an anime description!')
		.addStringOption(option => option.setName('title').setDescription('Title for the Anime to look Up!')),
	async execute(interaction) {
		try {
			const response = await search.get('/v1/anime', {
				params : {
					'title' : `${interaction.options.getString('title')}`,
					'nsfw' : 'true'
				}
			}); 

			const aData = response.data.data.documents;

			const aOptions = aData.map(anime => {
				var mappedTitle = {
					label : sliceTitle(anime.titles['en']),
					description : `Episodes: ${anime.episodes_count}`,
					value : `${anime.anilist_id}`
				};
				return mappedTitle;
			}).slice(0,25);

			

			const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions(aOptions),
			);
			await interaction.reply({ content: 'Here is a list of Animes! Please Select one', components: [row]});
		  } catch (error) {
			console.error(error);
		  }
	}
};