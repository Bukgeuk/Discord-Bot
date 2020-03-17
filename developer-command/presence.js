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

    let Presence = new config.Presence();

    var temp = message.content.split(' ', 2)

    if(temp[1] === '초기화' || temp[1] === 'reset') {
        Presence.activity.name = '\"덕도움\"을 입력해봐!'
        Presence.status = 'online'
        Presence.activity.type = 'PLAYING'

        client.user.setPresence(Presence)
        
        embed.setTitle('상태 설정 명령어 실행 완료!')
        .setDescription('상태를 **\"초기화\"** 시켰어!')
        .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
        .setColor('#00FF00')
        .setTimestamp()
        message.channel.send(embed)
    } else {
        const presence_now = client.user.presence
        
        var arr = message.content.split(' ', 3)
        if (arr[1] === '-') arr[1] = presence_now.status
        if (arr[2] === '-') arr[2] = presence_now.activities[0].type
    
        var cut = 0
        for (let i = 0; i < 3; i++) {
            cut = message.content.indexOf(' ', cut + 1)
        }
    
        var content
        if(cut === -1) content = presence_now.activities[0].name
        else content = message.content.substr(cut + 1)

        Presence.activity.name = content
        Presence.status = arr[1]
        Presence.activity.type = arr[2]

        client.user.setPresence(Presence)

        embed.setTitle('상태 설정 명령어 실행 완료!')
        .setDescription('Status를 **\"' + arr[1] + '\"**으로, Type을 **\"' + arr[2] + '\"**으로,\n상태메세지를 ``' + content + '``로 설정했어!')
        .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
        .setColor('#00FF00')
        .setTimestamp()
        message.channel.send(embed)
    }
}