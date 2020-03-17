const config = require('../config')

exports.run = function(client, message, embed){
    let content = message.content.substr(message.content.indexOf(' ') + 1)
    embed.setTitle('도움말 : **' + content + '**')
    .setTimestamp()
    .setColor('#FF7F50')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setDescription('다른 유저의 정보를 보여주는 명령어야!')
    .setThumbnail(client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 도움말')
    .addField('\u200b', '\u200b', false)
    .addField('보여주는 정보', '``태그``, ``ID``, ``봇?``, ``계정 생성 시간``, ``서버 참여 시간``, ``역할``', true)
    .addField('사용법', '``덕유저 <@유저>``, ``^userinfo <@유저>``', false)
    .addField('\u200b', '\u200b', false)

    message.channel.send(embed)
}