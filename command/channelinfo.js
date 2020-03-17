const config = require('../config')

exports.run = function(client, message, embed){
    var channel
    if (message.mentions.channels.size === 0) channel = message.channel
    else channel = message.mentions.channels.first()

    embed.setTitle('채널 정보 : ' + channel.name)
    .setTimestamp()
    .setColor(channel.guild.roles.highest.hexColor)
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setDescription('\"**' + channel.name + '**\" 채널의 정보!')
    .setThumbnail(channel.guild.iconURL(config.ImageOption))
    .setFooter('치즈덕 채널 정보')
    .addField('\u200b', '\u200b', false)
    .addField('이름', channel.name, true)
    if (channel.type !== 'category') {
        embed.addField('카테고리', channel.parent.name, true)
    }   
    embed.addField('ID', channel.id, true)
    .addField('위치', channel.position + 1, true)
    .addField('타입', channel.type, true)
    .addField('볼 수 있는 멤버 수', channel.members.array().length, true)

    if (channel.type === 'text') {
        if (!channel.topic) embed.addField('주제', '없음', true)
        else embed.addField('주제', channel.topic, true)

        if(channel.nsfw) embed.addField('NSFW', ':thinking: 맞네?', true)
        else embed.addField('NSFW', '아니다!', true)
    } else if (channel.type === 'voice') {
        if(channel.userLimit === 0) embed.addField('접속 가능한 유저 수', '∞', true)
        else embed.addField('접속 가능한 유저 수', channel.userLimit, true)

        if(channel.full) embed.addField('Full?', 'YES', true)
        else embed.addField('Full?', 'NO', true)

        embed.addField('비트레이트', channel.bitrate, true)
    }
    embed.addField('채널이 만들어진 시간', channel.createdAt.toISOString().replace(/T/, ' ').replace(/\..+/, ''), true)
    .addField('\u200b', '\u200b', false)

    message.channel.send(embed)
}