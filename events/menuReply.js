module.exports = {
        name : 'interactionCreate',
        execute(interaction) {
            if (!interaction.isSelectMenu()) return;
        }
}