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
const join = require('./function/join')
const config = require('../config')
const error = require('../function/error')
const AdventureFunc = require('./adventure/adventure')

var funcs = {}

function UserData(nickname, link){
    this.Name = nickname

    this.Money = 0

    this.NowHealth = 30
    this.MaxHealth = 30 // * 1.3

    this.Power = 10 // * 1.3

    this.Equipment = []

    this.Level = 1
    this.NowExp = 0
    this.MaxExp = 50 // * 1.3

    this.UpExp = 10 // * 1.1
    this.UpMoney = 10 // * 1.5

    this.Items = []

    this.ProfileImage = link
    this.Introduce = ''
}

function GetUserData(server, id){
    let obj = io.read(server, id)
    if (obj === 'error') return obj
    else if (obj === 'undefined') return obj
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

    message.channel.send('<@' + message.author.id + '>, 계정의 닉네임을 입력해줘!')

    const filter = m => m.author.id === message.author.id
    const collector = message.channel.createMessageCollector(filter, { time: 10000 });
    var complete = false

    collector.on('collect', m => {
        let nickname = JSON.parse(io.read(message.guild.id, message.author.id)).Name
        if(m.content === nickname){
            complete = true

            collector.stop()
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
    });
    
    collector.on('end', collected => {
        if (!complete) message.channel.send('세션이 만료됐어!\n계정을 삭제하려면 다시 시도해줘!')
    });
}

function SendUI(client, message, embed){
    let Data = GetUserData(message.guild.id, message.author.id)

    if(Data === 'error'){
        error.createaccountplz(client, message, embed)
        return
    }

    if (Data.Level === 1) var color = Colors[0]
    else if (Data.Level > 100) var color = Colors[19]
    else var color = Colors[Math.floor((Data.Level - 1) / 5)]

    embed.setTitle('**Lv.' + Data.Level + '** ' + Data.Name)
    .setThumbnail(Data.ProfileImage)
    .addField('\u200b', '\u200b', false)
    .addField('체력 ❤️', '**' + Data.NowHealth + '/' + Data.MaxHealth + '\n(' + ((Number(Data.NowHealth) / Number(Data.MaxHealth)) * 100).toFixed(2) + '%)**', true)
    .addField('공격력 ⚔️', '**' + Data.Power + '**', true)
    .addField('경험치 ⭐', '**' + Data.NowExp + '/' + Data.MaxExp + '\n(' + ((Number(Data.NowExp) / Number(Data.MaxExp)) * 100).toFixed(2) + '%)**', true)
    .addField('자산 💰', '**' + Data.Money + '** 💵', true)
    .addField('\u200b', '\u200b', false)
    .addField('경고 ⚠️', '아직 **얼리엑세스** 버전이라\n계정이 삭제되거나 오류가 발생할 수 있어!', false)
    .addField('\u200b', '\u200b', false)
    .setAuthor(message.author.tag, message.author.avatarURL(config.ImageOption))
    .setFooter('치즈덕 게임')
    .setColor(color)
    .setTimestamp();

    message.channel.send(embed)
}

function ChangeNickname(client, message, embed){
    if (message.content.length > 128) {
        error.toolongcommand(client, message, embed)
        return;
    }

    let Data = GetUserData(message.guild.id, message.author.id)

    if(Data === 'error'){
        error.createaccountplz(client, message, embed)
        return
    }

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

function ChangeProfileImage(client, message, embed){
    let Data = GetUserData(message.guild.id, message.author.id)

    if(Data === 'error'){
        error.createaccountplz(client, message, embed)
        return
    }

    let arg = message.content.split(' ')

    embed.setTitle('프로필 이미지 변경 성공!')
    .setDescription('이 이미지로 프로필 이미지를 변경했어!')
    .setThumbnail(arg[2])
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 게임')
    .setColor('#00FF00')
    .setTimestamp()

    Data.ProfileImage = arg[2]
    io.write(Data, message.guild.id, message.author.id)

    message.channel.send(embed)
}

function ChangeIntroduce(client, message, embed){
    let Data = GetUserData(message.guild.id, message.author.id)

    if(Data === 'error'){
        error.createaccountplz(client, message, embed)
        return
    }

    let cut = 0
    for(let i = 0; i < 2; i++){
        cut = message.content.indexOf(' ', cut + 1)
    }

    let text = message.content.substr(cut + 1)

    embed.setTitle('소개글 변경 성공!')
    .setDescription('```' + text + '```\n이걸로 소개글을 변경했어!')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 게임')
    .setColor('#00FF00')
    .setTimestamp()

    Data.Introduce = text
    io.write(Data, message.guild.id, message.author.id)

    message.channel.send(embed)
}

function SendTutorial(client, message, embed){

}



funcs.main = function(client, message, Create_Embed){
    let embed = new Create_Embed()
    let cmd_arr = message.content.split(' ')

    if (cmd_arr.length === 1) {
        SendUI(client, message, embed)
        return;
    }

    switch(cmd_arr[1]){
        case '튜토리얼':
        case 'tutorial':
            SendTutorial(client, message, embed)
            return;
        case '닉네임':
        case '닉넴':
        case 'nickname':
            ChangeNickname(client, message, embed)
            return;
        case '프로필사진':
        case '프사':
        case 'profileimage':
            ChangeProfileImage(client, message, embed)
            return;
        case '소개':
        case '소개글':
        case 'introduce':
            ChangeIntroduce(client, message, embed)
            return;
        case '모험':
        case 'adventure':
            let Data = GetUserData(message.guild.id, message.author.id)
            if(Data === 'error'){
                error.createaccountplz(client, message, embed)
                return
            }
            if (Data.Level === 1) var color = Colors[0]
            else if (Data.Level > 100) var color = Colors[19]
            else var color = Colors[Math.floor((Data.Level - 1) / 5)]
            io.write(AdventureFunc.GoAdventure(client, message, Create_Embed, GetUserData(message.guild.id, message.author.id), color), message.guild.id, message.author.id)
            return;
        default:
            error.unknownargument(client, message, embed)
    }
}

module.exports = funcs;