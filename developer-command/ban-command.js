const ban = require('../function/ban')
const error = require('../function/error')
const config = require('../config')

exports.run = function(client, message, embed){
    if(message.author.id !== config.Developer.ID[0]){
        embed.setTitle('흐음?')
        .setDescription('넌 개발자가 아니라서 권한이 없는걸?')
        .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
        .setColor('#FF0000')
        .setTimestamp()
        message.channel.send(embed)

        return
    }

    let arr = message.content.split(' ')

    switch(arr[1]){
        case 'list':
            embed.setTitle('BAN LIST')
            .setDescription(ban.get())
            .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
            .setFooter('치즈덕 BAN LIST')
            .setColor('#FF8C00')
            .setTimestamp()
            message.channel.send(embed)
            return
        case 'add':
            ban.add(arr[3], arr[4], arr[2])
            embed.setTitle('BAN ADD')
            .setDescription('**\"' + arr[4] + '\"**을 BAN 목록에 추가했어!')
            .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
            .setFooter('치즈덕 BAN ADD')
            .setColor('#FF8C00')
            .setTimestamp()
            message.channel.send(embed)
            return
        case 'remove':
            ban.remove(arr[3], arr[2])
            embed.setTitle('BAN REMOVE')
            .setDescription('**\"' + arr[3] + '\"**을 BAN 목록에서 삭제했어!')
            .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
            .setFooter('치즈덕 BAN REMOVE')
            .setColor('#FF8C00')
            .setTimestamp()
            message.channel.send(embed)
            return
        case 'clear':
            ban.clear()
            embed.setTitle('BAN CLEAR')
            .setDescription('BAN 목록을 초기화 했어!')
            .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
            .setFooter('치즈덕 BAN CLEAR')
            .setColor('#FF8C00')
            .setTimestamp()
            message.channel.send(embed)
            return
        default:
            error.unknown()
    }
}