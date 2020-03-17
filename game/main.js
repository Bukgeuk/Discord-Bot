const Colors = [
    '#2ecc71',
    '#1abc9c',
    '#1f8b4c',
    '#11806a',
    '#3498db',
    '#206694',
    '#9b59b6',
    '#71368a',
    '#e91e63',
    '#ad1457',
    '#f1c40f',
    '#c27c0e',
    '#e67e22',
    '#a84300',
    '#e74c3c',
    '#992d22',
    '#95a5a6',
    '#979c9f',
    '#607d8b',
    '#546e7a'
    
]

const io = require('./io')
const join = require('./join')
const config = require('../config')
const error = require('../function/error')

var funcs = {}

function UserData(nickname, link){
    this.Name = nickname

    this.Money = 0

    this.NowHealth = 30

    this.BasicHealth = 30
    this.BasicPower = 10

    this.AlphaHealth = 0
    this.AlphaPower = 0

    this.Equipment = []

    this.Level = 1
    this.NowExp = 0
    this.MaxExp = 50

    this.Items = []

    this.ProfileImage = link
}

function GetUserData(server, id){
    let obj = io.read(server, id)
    if (obj === 'error') return obj
    else return JSON.parse(obj)
}

funcs.start = function(client){
    let guild_arr = client.guilds.cache.array()

    for(let i = 0; i < guild_arr.length; i++){
        join.read(guild_arr[i].id)
    }
}

funcs.join = function(client, message, embed){
    if (message.content.length > 128) {
        error.toolongcommand(client, message, embed)
        return;
    }

    if (join.isjoin(message.guild.id, message.author.id)) {
        embed.setTitle('계정 생성 실패...')
        .setDescription('계정은 **한번만** 생성할 수 있어!')
        .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
        .setFooter('치즈덕 게임')
        .setColor('#FF0000')
        .setTimestamp()
        message.channel.send(embed)
        return;
    }
    let num = message.content.indexOf(' ')
    if (num === -1) var nickname = message.author.username
    else var nickname = message.content.substr(num + 1)
    join.join(message.guild.id, message.author.id)
    io.write(new UserData(nickname, message.author.avatarURL(config.ImageOption)), message.guild.id, message.author.id)

    embed.setTitle('계정 생성 성공!')
    .setDescription('**' + nickname + '** 으로 계정을 생성했어!')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 게임')
    .setColor('#00FF00')
    .setTimestamp()
    message.channel.send(embed)
}

funcs.leave = function(client, message, embed){
    if (!join.isjoin(message.guild.id, message.author.id)) {
        embed.setTitle('계정 삭제 실패...')
        .setDescription('삭제할 계정이 없어!')
        .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
        .setFooter('치즈덕 게임')
        .setColor('#FF0000')
        .setTimestamp()
        message.channel.send(embed)
        return;
    }
    let nickname = JSON.parse(io.read(message.guild.id, message.author.id)).Name
    join.leave(message.guild.id, message.author.id)
    io.delete(message.guild.id, message.author.id)

    embed.setTitle('계정 삭제 성공!')
    .setDescription('**' + nickname + '** 계정을 삭제했어!')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 게임')
    .setColor('#00FF00')
    .setTimestamp()
    message.channel.send(embed)
}

function SendUI(client, message, embed){
    let Data = GetUserData(message.guild.id, message.author.id)

    if(Data === 'error'){
        error.createaccountplz(client, message, embed)
        return
    }

    embed.setTitle('**Lv.' + Data.Level + '** ' + Data.Name)
    .setThumbnail(Data.ProfileImage)
    .addField('\u200b', '\u200b', false)
    .addField('체력 ❤️', '**' + Data.NowHealth + '/' + (Number(Data.BasicHealth) + Number(Data.AlphaHealth)) + '**', true)
    .addField('공격력 ⚔️', '**' + (Number(Data.BasicPower) + Number(Data.AlphaPower)) + '**', true)
    .addField('경험치 ⭐', '**' + Data.NowExp + '/' + Number(Data.MaxExp) + '**', true)
    .addField('자산 💰', '**' + Data.Money + '** 💵', true)
    .addField('\u200b', '\u200b', false)
    .setAuthor(message.author.tag, message.author.avatarURL(config.ImageOption))
    .setFooter('치즈덕 게임')
    .setColor('#00FF00')
    .setTimestamp();

    const prom = message.channel.send(embed)
    prom.then((msg) => {
        msg.react('💎')
        msg.react('🛒')
        msg.react('🎒')
        msg.react('❌')

        const filter = (reaction, user) => {
            return user.id === message.author.id;
        };
        
        const collector = msg.createReactionCollector(filter, { time: 20000 });
        
        collector.on('collect', (reaction, reactionCollector) => {

            switch(reaction.emoji.name){
                case '💎':
                    collector.stop()
                    return;
                case '🛒':
                    collector.stop()
                    return;
                case '🎒':
                    collector.stop()
                    return;
                case '❌':
                    collector.stop()
                    return;
            }
    
        });
        
        collector.on('end', collected => {
            msg.reactions.removeAll()
            return;
        });
    }).catch(error => {
        console.log(error)
    })
}

function ChangeNickname(client, message, embed){
    if (message.content.length > 128) {
        error.toolongcommand(client, message, embed)
        return;
    }

    let Data = GetUserData(message.guild.id, message.author.id)
    let arg = message.content.split(' ')

    embed.setTitle('닉네임 변경 성공!')
    .setDescription('닉네임을 **\"' + Data.Name + '\"** 에서 **\"' + arg[2] + '\"** (으)로 변경했어!')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 게임')
    .setColor('#00FF00')
    .setTimestamp()

    Data.Name = arg[2]
    io.write(Data, message.guild.id, message.author.id)

    message.channel.send(embed)
}

function SendTutorial(client, message, embed){

}

funcs.main = function(client, message, embed){
    let cmd_arr = message.content.split(' ')

    if (cmd_arr.length === 1) {
        SendUI(client, message, embed)
        return;
    }

    switch(cmd_arr[1]){
        case '튜토리얼':
            SendTutorial(client, message, embed)
            return;
        case '닉네임':
        case '닉넴':
            ChangeNickname(client, message, embed)
            return;
        default:
            error.unknownargument(client, message, embed)
    }
}

module.exports = funcs;