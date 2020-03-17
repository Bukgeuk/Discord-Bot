const config = require('../config')

exports.run = function(client, message, embed){
    let arr = message.content.split(' ', 3)
    if (arr[1] > arr[2]) {
        let temp = arr[1]
        arr[1] = arr[2]
        arr[2] = temp
    }

    let result = Math.floor(Math.random() * (Number(arr[2]) - Number(arr[1]) + 1)) + Number(arr[1])
    embed.setTitle('``' + arr[1] + ' ~ ' + arr[2] + '``의 랜덤 결과')
    .setDescription('**' + result + '**')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 랜덤')
    .setColor('#00FF00')
    .setTimestamp()
    message.channel.send(embed)
}