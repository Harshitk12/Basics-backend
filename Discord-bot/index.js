const {Client, GatewayIntentBits} =require('discord.js')

const client=new Client({
    intents : [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ]
});

client.on('messageCreate', (msg)=>{
    if(msg.author.bot) return
    msg.reply({
        content : "hi"
    })
})

client.login(
    ""
)