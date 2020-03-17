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

    var cmd_arr = message.content.split(' ', 3)
    var guild_arr = client.guilds.cache.array()

    var cut = 0
    for(let i = 0; i < 3; i++) {
        cut = message.content.indexOf(' ', cut + 1)
    }

    var content = message.content.substr(cut + 1)

    if(cmd_arr.length !== 3) {
        embed.setTitle('명령어가 이상한걸?')
        .setDescription('명령어를 확인해줘!')
        .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
        .setColor('#FF0000')
        .setTimestamp()
        message.channel.send(embed)

        return
    }

    //console.log(client.guilds.cache)

    for (let i = 0; i < guild_arr.length; i++) {

        if (guild_arr[i].id === cmd_arr[1]) {
            
            var channel_arr = guild_arr[i].channels.cache.array()

            for(let j = 0; j < channel_arr.length; j++) {

                if(channel_arr[j].id === cmd_arr[2]) {
                    
                    channel_arr[j].send(content)

                    embed.setTitle('챗 명령어 실행 완료!')
                    .setDescription('메세지를 **' + guild_arr[i].name + '** 서버의 **' + channel_arr[j].name + '** 채널에 전송했어!')
                    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
                    .setColor('#00FF00')
                    .setTimestamp()
                    message.channel.send(embed)

                    return
                }

            }

            embed.setTitle('그런 채널은 없는데?')
            .setDescription('채널 ID를 확인해줘!')
            .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
            .setColor('#FF0000')
            .setTimestamp()
            message.channel.send(embed)
            return
        }
    }  

    embed.setTitle('그런 서버는 없는데?')
    .setDescription('서버 ID를 확인해줘!')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setColor('#FF0000')
    .setTimestamp()
    message.channel.send(embed)
    return
}