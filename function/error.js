const config = require('../config')

var list = {}

list.unknown = function(client, message, embed){
    embed.setTitle('오류?!???!!?!')
    .setDescription('알 수 없는 오류가 났는데?')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setColor('#FF0000')
    .setTimestamp()
    message.channel.send(embed)
}

list.noresult = function(client, message, embed){
    embed.setTitle('이런....')
    .setDescription('검색 결과가 없어!')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setColor('#FF0000')
    .setTimestamp()
    message.channel.send(embed)
}

list.adultkeyword = function(client, message, embed){
    embed.setTitle('그런걸? ㄷㄷ')
    .setDescription('그런건 NSFW 채널에서 처리해줄게')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setColor('#FF69B4')
    .setTimestamp()
    message.channel.send(embed)
    message.delete()
}

list.nosearchkeyword = function(client, message, embed){
    embed.setTitle('흠....')
    .setDescription('검색어가 없는데?')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setColor('#FF0000')
    .setTimestamp()
    message.channel.send(embed)
}

list.toomuchoutput = function(client, message, embed){
    embed.setTitle('어....')
    .setDescription('출력 항목의 개수가 너무 많아!')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setColor('#FF0000')
    .setTimestamp()
    message.channel.send(embed)
}

list.toolongcommand = function(client, message, embed){
    embed.setTitle('워워;;')
    .setDescription('명령어가 너무 길어 ㅡㅡ')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setColor('#FF0000')
    .setTimestamp()
    message.channel.send(embed)
}

list.notranssentence = function(client, message, embed){
    embed.setTitle('흠....')
    .setDescription('변역할 문장이 없는데?')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setColor('#FF0000')
    .setTimestamp()
    message.channel.send(embed)
}

list.unknownlangcode = function(client, message, embed){
    embed.setTitle('저기....')
    .setDescription('그런 언어는 지원하지 않아 ㅜㅅㅜ')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setColor('#FF0000')
    .setTimestamp()
    message.channel.send(embed)
}

list.querylimitexceeded = function(client, message, embed){
    embed.setTitle('ㅜㅅㅜ')
    .setDescription('API 사용률을 초과했어....')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setColor('#FF0000')
    .setTimestamp()
    message.channel.send(embed)
}

list.developing = function(client, message, embed){
    embed.setTitle('미안...')
    .setDescription('아직 개발중이라 명령을 처리해 줄 수가 없어')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setColor('#FF0000')
    .setTimestamp()
    message.channel.send(embed)
}

list.unknowncommand = function(client, message, embed){
    embed.setTitle('????????')
    .setTimestamp()
    .setColor('#FF0000')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setDescription('명령어 도움말을 보려면 **덕도움**을 입력해줘!')
    message.channel.send(embed)
}

list.infinity = function(client, message, embed){
    embed.setTitle('흐음?')
    .setDescription('0으로 나눌 수 없어!')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 나눗셈')
    .setColor('#FF0000')
    .setTimestamp()
    message.channel.send(embed)
}

list.nan = function(client, message, embed){
    embed.setTitle('흐음?')
    .setDescription('0을 0으로 나눌 수 없어!')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 나눗셈')
    .setColor('#FF0000')
    .setTimestamp()
    message.channel.send(embed)
}

list.unknownargument = function(client, message, embed){
    embed.setTitle('????????')
    .setTimestamp()
    .setColor('#FF0000')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setDescription('인자가 이상해!')
    message.channel.send(embed)
}

list.createaccountplz = function(client, message, embed){
    embed.setTitle('잠깐만!')
    .setTimestamp()
    .setColor('#FF0000')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setDescription('게임을 시작하려면\n**\"덕참여\"** 명령어로 계정을 만들어줘!')
    message.channel.send(embed)
}

module.exports = list