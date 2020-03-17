const config = require('../config')

exports.run = function(client, message, embed){
    const server = message.guild
    const owner = server.owner
    let count_channel = server.channels.cache.array().length
    let count_role = server.roles.cache.array().length
    let count_emoji = server.emojis.cache.array().length
    let ispartner
    if (server.partnered) ispartner = '맞아!'
    else ispartner = '아니네...'

    embed.setTitle('서버 정보 : ' + server.name)
    .setTimestamp()
    .setColor(server.roles.highest.hexColor)
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setDescription('\"**' + server.name + '**\" 서버의 정보!')
    .setThumbnail(server.iconURL(config.ImageOption))
    .setFooter('치즈덕 서버 정보')
    .addField('\u200b', '\u200b', false)
    .addField('주인', owner.user.tag, true)
    .addField('서버 ID', server.id, true)
    .addField('디스코드 파트너?', ispartner, true)
    .addField('멤버 수', server.memberCount, true)
    .addField('채널 수', count_channel, true)
    .addField('역할 수', count_role, true)
    .addField('이모지 수', count_emoji, true)
    .addField('서버 위치', server.region, true)
    .addField('서버가 만들어진 시간', server.createdAt.toISOString().split('T')[0] + ' ' + server.createdAt.toString().split(' ')[4], true)
    .addField('\u200b', '\u200b', false)

    message.channel.send(embed)
}