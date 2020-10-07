const Discord = require(`discord.js`);
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`${client.user.username} prêt !`)
    client.user.setPresence({
        status: "dnd"
    });
});

client.login(process.env.TOKEN);
