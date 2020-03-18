const ban = require('./ban')
const config = require('../config')

var ex = {}
var stack = {}

function index(n, e){
    if (n === undefined) this.num = 0
    else this.num = n
    this.tag = e
}

ex.add = function(id, tag, size){
    if (stack[id] === undefined) {
        stack[id] = new index(Number(size), tag)
    } 
    else stack[id].num = Number(stack[id].num) + Number(size)
}

ex.sub = function(id, size){
    if (stack[id] === undefined) return;
    else if (stack[id].num < size) stack[id].num = 0
    else stack[id].num = Number(stack[id].num) - Number(size)
}

ex.set = function(id, tag, size){
    if (stack[id] === undefined) {
        stack[id] = new index(size, tag)
    }
    stack[id].num = Number(size)
}

ex.clear = () => {
    stack = {}
}

ex.list = () => {
    let str = ''
    for(let key in stack){
        str += ('**\"' + stack[key].tag + '\"** : **' + stack[key].num + 'p**\n')
    }
    return str
}

ex.auto = function(client, message, embed, isusingAI){
    var length = message.content.length
    if (isusingAI) length -= 5

    if (length <= 20) ex.add(message.author.id, message.author.tag, 2)
    else ex.add(message.author.id, message.author.tag, length / 10)

    console.log(stack[message.author.id])

    if(stack[message.author.id].num > 30){
        stack[message.author.id].num = 0
        ban.add(message.author.id, message.author.tag)

        embed.setTitle('나 너무 갈구지 마...')
        .setDescription('2분 후에 명령어를 입력해줘')
        .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
        .setFooter('치즈덕 사전 검색')
        .setColor('#FF0000')
        .setTimestamp()
        message.author.send(embed)
    }
}

module.exports = ex