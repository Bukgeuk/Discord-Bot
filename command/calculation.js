const error = require('../function/error')
const config = require('../config')

var list = {}

list.add = function(client, message, embed){
    let arr = message.content.split(' ')
    let res = 0;
    let str = '';
    for(let i = 2; i < arr.length; i++){
        if (i === 2) {
            str = arr[i]
            res = Number(arr[i])
        }
        else {
            str += ('＋' + arr[i])
            res += Number(arr[i])
        }  
    }

    embed.setTitle('``' + str + '``의 결과')
    .setDescription('**' + res + '**')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 덧셈')
    .setColor('#00FF00')
    .setTimestamp()
    message.channel.send(embed)
}

list.sub = function(client, message, embed){
    let arr = message.content.split(' ')
    let res = 0;
    let str = '';
    for(let i = 2; i < arr.length; i++){
        if (i === 2) {
            str = arr[i]
            res = Number(arr[i])
        }
        else {
            str += ('－' + arr[i])
            res -= Number(arr[i])
        }    
    }

    embed.setTitle('```' + str + '``의 결과')
    .setDescription('**' + res + '**')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 뺄셈')
    .setColor('#00FF00')
    .setTimestamp()
    message.channel.send(embed)
}

list.mul = function(client, message, embed){
    let arr = message.content.split(' ')
    let res = 0;
    let str = '';
    for(let i = 2; i < arr.length; i++){
        if (i === 2) {
            str = arr[i]
            res = Number(arr[i])
        }
        else {
            str += ('×' + arr[i])
            res *= Number(arr[i])
        }  
    }

    embed.setTitle('``' + str + '``의 결과')
    .setDescription('**' + res + '**')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 곱셈')
    .setColor('#00FF00')
    .setTimestamp()
    message.channel.send(embed)
}

list.div = function(client, message, embed){
    let arr = message.content.split(' ')
    let res = 0;
    let str = '';
    for(let i = 2; i < arr.length; i++){
        if (i === 2) {
            str = arr[i]
            res = Number(arr[i])
        }
        else {
            str += ('÷' + arr[i])
            res /= Number(arr[i])
        } 
    }

    if (isNaN(res)) {
        error.nan(client, message, embed)
        return;
    } else if (!isFinite(res)) {
        error.infinity(client, message, embed)
        return;
    } 

    embed.setTitle('``' + str + '``의 결과')
    .setDescription('**' + res + '**')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 나눗셈')
    .setColor('#00FF00')
    .setTimestamp()
    message.channel.send(embed)
}

list.mod = function(client, message, embed){
    let arr = message.content.split(' ')
    let res = 0;
    let str = '';
    for(let i = 2; i < arr.length; i++){
        if (i === 2) {
            str = arr[i]
            res = Number(arr[i])
        }
        else {
            str += ('%' + arr[i])
            res %= Number(arr[i])
        }  
    }

    embed.setTitle('``' + str + '``의 결과')
    .setDescription('**' + res + '**')
    .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
    .setFooter('치즈덕 나머지 연산')
    .setColor('#00FF00')
    .setTimestamp()
    message.channel.send(embed)
}

list.run = function(client, message, embed){
    let arr = message.content.split(' ', 2)
    switch(arr[1]){
        case '+':
            list.add(client, message, embed)
            return;
        case '-':
            list.sub(client, message, embed)
            return;
        case '*':
            list.mul(client, message, embed)
            return;
        case '/':
            list.div(client, message, embed)
            return;
        case '%':
            list.mod(client, message, embed)
            return;
        default:
            error.unknowncommand(client, message, embed)
            return;
    }
}

module.exports = list;