const config = require('../config')

exports.run = function(client, message, embed){

    if (message.channel.type === 'dm') return

    
    var user
    if (message.mentions.users.array().length === 0) user = message.author 
    else user = message.mentions.users.first()
    const member = message.guild.member(user)
    let isbot
    if (user.bot) isbot = '봇!'
    else isbot = 'ㄴㄴ'

    embed.setTitle('유저 정보 : ' + member.displayName)
    .setTimestamp()
    .setColor(member.displayHexColor)
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setDescription('**' + member.displayName + '**의 정보!')
    .setThumbnail(user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 유저 정보')
    .addField('\u200b', '\u200b', false)
    .addField('태그', user.tag, true)
    .addField('ID', user.id, true)
    .addField('봇?', isbot, true)
    .addField('계정을 생성한 시간', user.createdAt.toISOString().split('T')[0] + ' ' + user.createdAt.toString().split(' ')[4], true)
    .addField('서버에 들어온 시간', member.joinedAt.toISOString().split('T')[0] + ' ' + member.joinedAt.toString().split(' ')[4], true)
    let roles = ""
    let arr = member.roles.cache.array()
    for(let i = 0; i < arr.length - 2; i++) {
        roles += ('<@&' + arr[i] + '>, ')
    }
    roles += ('<@&' + arr[arr.length - 2] + '>')
    embed.addField('가지고 있는 역할', roles, false)
    .addField('\u200b', '\u200b', false)

    message.channel.send(embed)
}