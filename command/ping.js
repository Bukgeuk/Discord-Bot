const config = require('../config')

exports.run = async function(client, message, embed){
    const msg = await message.channel.send('측정중 ㅇㅅㅇ');
    if (message.content.startsWith('ping')) {
        embed.setTitle('Ping!')
        .setTimestamp()
        .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
        .addField('Message Latency', (msg.createdTimestamp - message.createdTimestamp) + 'ms', true)
        .addField('API Latency', client.ws.ping + 'ms', true)
        .setColor('#FF8C00')
        .setFooter('치즈덕 핑')
    } else if (message.content.startsWith('핑')) {
        embed.setTitle('핑!')
        .setTimestamp()
        .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
        .addField('메세지 지연 시간', (msg.createdTimestamp - message.createdTimestamp) + 'ms', true)
        .addField('API 지연 시간', client.ws.ping + 'ms', true)
        .setColor('#FF8C00')
        .setFooter('치즈덕 핑')
    }
    
    msg.delete()
    message.channel.send(embed)
}