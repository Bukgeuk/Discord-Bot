const config = require('../config')

exports.run = function(client, message, embed){
    let content = message.content.substr(message.content.indexOf(' ') + 1)
    embed.setTitle('도움말 : **' + content + '**')
    .setTimestamp()
    .setColor('#FF7F50')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setDescription('네이버 백과사전에서 검색할수 있는 명령어야!')
    .setThumbnail(client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 도움말')
    .addField('\u200b', '\u200b', false)
    .addField('사용법', '``덕사전 <키워드> <항목 개수>``, ``^dict <키워드> <항목 개수>``', false)
    .addField('참고', '``<항목 개수>``를 지정하지 않으면 **1**로 설정돼!', false)
    .addField('\u200b', '\u200b', false)

    message.channel.send(embed)
}