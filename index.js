// Require the necessary discord.js classes
const fs = require('fs');
const { Client, Collection ,Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    
    client.commands.set(command.data.name, command);
}

for (const file of eventFiles){
    const event = require(`./events/${file}`);
    console.log(event);
    if(event.once){
        client.once(event.name, (...args) => event.execute(...args));
    }
    else{
        client.on(event.name, (...args) => event.execute(...args));
    }
}


// Listening for Commands
client.on('interactionCreate', async interaction =>{
        if(!interaction.isCommand()) return; 

        const command = client.commands.get(interaction.commandName);
        
        if(!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }

    });

// Login to Discord with your client's token
client.login(token);