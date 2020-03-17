const config = require('../config')

exports.run = function(client, message, embed){
    embed.setTitle('치즈덕?')
    .setTimestamp()
    .setColor('#1E90FF')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setDescription('**Bukgeuk_#4066**이 만들었어!')
    .setThumbnail(client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 정보')
    .addField('\u200b', '\u200b', false)
    .addField('태그', client.user.tag, true)
    .addField('ID', client.user.id, true)
    .addField('Prefix', '``덕``, ``^``', true)
    .addField('도움말', '``덕도움``, ``^help``', true)
    .addField('개발 시작 날짜', '2020-03-06', true)
    .addField('실행을 시작한 시간', client.readyAt.toISOString().replace(/T/, ' ').replace(/\..+/, ''), true)  
    .addField('\u200b', '\u200b', false)

    message.channel.send(embed)
}