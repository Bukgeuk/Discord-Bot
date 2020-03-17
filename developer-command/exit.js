const config = require('../config')

exports.run = async function (client, message, embed) {
    if(message.author.id !== config.Developer.ID[0]){
        embed.setTitle('흐음?')
        .setDescription('넌 개발자가 아니라서 권한이 없는걸?')
        .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
        .setColor('#FF0000')
        .setTimestamp()
        message.channel.send(embed)

        return
    }

    var arr = message.content.split(' ')

    embed.setTitle('process.exit(**' + arr[1] + '**)')
    .setDescription('**' + client.user.tag + '** 를 종료할게!')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setColor('#708090')
    .setTimestamp()
    await message.channel.send(embed)
    
    process.exit(arr[1]) 
}