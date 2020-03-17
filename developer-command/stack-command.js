const stack = require('../function/stack')
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
            embed.setTitle('STACK LIST')
            .setDescription(stack.list())
            .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
            .setFooter('치즈덕 STACK LIST')
            .setColor('#FF8C00')
            .setTimestamp()
            message.channel.send(embed)
            return
        case 'add':
            stack.add(arr[3], arr[4], arr[2])
            embed.setTitle('STACK ADD')
            .setDescription('**\"' + arr[4] + '\"**의 스택을 **' + arr[2] + '** 증가시켰어!')
            .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
            .setFooter('치즈덕 STACK ADD')
            .setColor('#FF8C00')
            .setTimestamp()
            message.channel.send(embed)
            return
        case 'sub':
            stack.sub(arr[3], arr[2])
            embed.setTitle('STACK SUB')
            .setDescription('**\"' + arr[3] + '\"**의 스택을 **' + arr[2] + '** 감소시켰어!')
            .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
            .setFooter('치즈덕 STACK SUB')
            .setColor('#FF8C00')
            .setTimestamp()
            message.channel.send(embed)
            return
        case 'set':
            stack.set(arr[3], arr[4], arr[2])
            embed.setTitle('STACK SET')
            .setDescription('**\"' + arr[4] + '\"**의 스택을 **' + arr[2] + '** 으로 설정했어!')
            .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
            .setFooter('치즈덕 STACK SET')
            .setColor('#FF8C00')
            .setTimestamp()
            message.channel.send(embed)
            return
        case 'clear':
            stack.clear()
            embed.setTitle('STACK CLEAR')
            .setDescription('스택을 초기화 했어!')
            .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
            .setFooter('치즈덕 STACK CLEAR')
            .setColor('#FF8C00')
            .setTimestamp()
            message.channel.send(embed)
            return
        default:
            error.unknown()
    }
}