const config = require('../config')

var funcs = {}

function Fight(client, message, embed){

}

function Explore(client, message, embed){

}

funcs.GoAdventure = function (client, message, embed){
    let Data = GetUserData(message.guild.id, message.author.id)

    if(Data.NowHealth === 0){
        embed.setTitle('회복부터!')
        .setDescription('체력이 0이야!')
        .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
        .setFooter('치즈덕 게임')
        .setColor('#FF0000')
        .setTimestamp()

        message.channel.send(embed)
    }
    
    switch(Math.floor(Math.random() * (4 + 1))){
        case 4:
            Fight(client, message, embed)
            return;
        default:
            Explore(client, message, embed)
            return;
    }
}

module.exports = funcs;