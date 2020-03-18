const config = require('../config')
const Level = require('./level')

var funcs = {}

function Fight(client, message, embed, Data){


    return Data
}

function Explore(client, message, Create_Embed, Data, color){
    let embed = new Create_Embed()

    if (Math.floor(Math.random() * (2 + 1)) === 1) var fluctuation_Exp = Math.floor(Math.random() * (Math.floor(Number(Data.UpExp) * 0.1) + 1))
    else var fluctuation_Exp = Math.floor(Math.random() * (Math.floor(Number(Data.UpExp) * 0.1) + 1)) * -1

    if (Math.floor(Math.random() * (2 + 1)) === 1) var fluctuation_Money = Math.floor(Math.random() * (Math.floor(Number(Data.UpMoney) * 0.1) + 1))
    else var fluctuation_Money = Math.floor(Math.random() * (Math.floor(Number(Data.UpMoney) * 0.1) + 1)) * -1

    Data.NowExp += (Data.UpExp + fluctuation_Exp);
    Data.Money += (Data.UpMoney + fluctuation_Money);

    embed.setTitle('모험 결과')
    .setDescription('탐험을 무사히 마쳤어!')
    //.addField('\u200b', '\u200b', false)
    .addField('획득한 아이템 💎', '**' + Data.NowExp + ' Exp**, **' + Data.Money + '** 💵', true)
    //.addField('\u200b', '\u200b', false)
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 게임')
    .setColor(color)
    .setTimestamp()

    let obj = Level.detectLevelUp(Data)

    if(obj !== false){
        let level_embed = new Create_Embed()
        
        level_embed.setTitle('LEVEL UP!')
        .setDescription('**Lv.' + (Data.Level - 1) + '** => **Lv.' + Data.Level + '**')
        .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
        .setFooter('치즈덕 게임')
        .setColor(color)
        .setTimestamp()

        message.channel.send(level_embed)
    }

    message.channel.send(embed)/*.then((msg)=>{
        msg.react('🔁')

        const filter = (reaction, user) => {
            return reaction.emoji.name === '🔁' && user.id === message.author.id;
        };
        
        const collector = msg.createReactionCollector(filter, { time: 5000 });
        
        collector.on('collect', (reaction, reactionCollector) => {
            collector.stop()
            return Explore(client, message, Create_Embed, Data, color)
        });
        
        collector.on('end', collected => {
            msg.reactions.removeAll()
        });
    })*/

    if (obj === false) return Data
    else return obj
}

funcs.GoAdventure = function (client, message, Create_Embed, Data, color){
    let embed = new Create_Embed()

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
            return Fight(client, message, embed, Data)
        default:
            return Explore(client, message, Create_Embed, Data, color)
    }
}

module.exports = funcs;