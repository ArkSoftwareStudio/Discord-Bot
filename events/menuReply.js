const axios = require('axios');
const {aniApi} = require('../config.json');
const { MessageEmbed } = require('discord.js');

const search = axios.create({
	baseURL : 'https://api.aniapi.com',
	headers : 
	{'Accept' : 'application/vnd.api+json', 
	'Content-Type' : 'application/vnd.api+json',
	'Authorization' : `${aniApi}`}
});

function sliceDesc(desc){
	if(desc.length >= 4096){
		desc.slice(0, -6);
		return desc + '...';
    }else if(desc.length <= 0){
        return "No English Description Found! Sorry for the inconvenience... :c"
	}else{
		return desc;
	}
}

module.exports = {
        name : 'interactionCreate',
        async execute(interaction) {
            if (!interaction.isSelectMenu()) return;

            if (interaction.customId === 'select') {

                console.log(interaction.values[0]);
                const res = await search.get('/v1/anime/', {
                    params: {
                        anilist_id : `${interaction.values[0]}`
                    }
                });
                const anime = res.data.data.documents[0];
                console.log(anime.cover_color);
                const embed = new MessageEmbed()
                .setAuthor('AnimArk')
                .setColor(`${anime.cover_color}`)
                .setTitle(`${anime.titles['en']}`)
                .setDescription(sliceDesc(`${anime.descriptions['en']}`))
                .setThumbnail(`${anime.cover_image}`)
                .setImage(`${anime.banner_image}`)
                .setFields(
                    {name: 'Japanese Title', value : `${anime.titles['jp']}`, inline : true},
                    {name: 'Episodes', value : `${anime.episodes_count}`, inline : true},
                    {name: 'Genres', value: `${anime.genres[0]}, ${anime.genres[1]}`, inline: true},
                    {name: 'Score', value: `${anime.score}`}
                    )

                await interaction.update({content: ' ', components: [], embeds: [embed]});
            }
        }
}