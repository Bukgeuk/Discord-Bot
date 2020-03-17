const config = require('../config')

exports.run = function(client, message, embed){
    let content = message.content.substr(message.content.indexOf(' ') + 1)
    embed.setTitle('도움말 : **' + content + '**')
    .setTimestamp()
    .setColor('#FF7F50')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setDescription('영어를 한글로 번역해줘!\n네이버 파파고 API를 이용하지!')
    .setThumbnail(client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 도움말')
    .addField('\u200b', '\u200b', false)
    .addField('사용법', '``덕영한번역 <변역할 문장>``, ``^e2ktrans <번역할 문장>``', true)
    .addField('\u200b', '\u200b', false)

    message.channel.send(embed)
}