const config = require('../config')

exports.run = function(client, message, embed){
    let content = message.content.substr(message.content.indexOf(' ') + 1)
    embed.setTitle('도움말 : **' + content + '**')
    .setTimestamp()
    .setColor('#FF7F50')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setDescription('지연 시간을 보여주는 명령어야!')
    .setThumbnail(client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 도움말')
    .addField('\u200b', '\u200b', false)
    .addField('보여주는 정보', '``메세지 지연 시간``, ``API 지연 시간``', true)
    .addField('\u200b', '\u200b', false)

    message.channel.send(embed)
}