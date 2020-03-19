const UPTIME = Date.now();

const config = require('./config')
const time = require('./function/time')
const Log = require('./function/log')
const Discord = require('discord.js')
const fs = require('fs')
const help = require('./command/help')
const ping = require('./command/ping')
const dict = require('./command/dictionary')
const search = require('./command/search')
const userinfo = require('./command/userinfo')
const botinfo = require('./command/botinfo')
const transe = require('./command/e2k-translate')
const transk = require('./command/k2e-translate')
const trans = require('./command/translate') 
const image = require('./command/image')
const serverinfo = require('./command/serverinfo')
const trending_topics = require('./command/trending-topics')
const chat = require('./developer-command/chat')
const exit = require('./developer-command/exit')
const presencecommand = require('./developer-command/presence')
const channelinfo = require('./command/channelinfo')
const analysis = require('./chatbot/analysis')
const error = require('./function/error')
const stack = require('./function/stack')
const ban = require('./function/ban')
const stack_command = require('./developer-command/stack-command')
const ban_command = require('./developer-command/ban-command')
const calculation = require('./command/calculation')
const random = require('./command/random')
const game = require('./game/main')

if (!fs.existsSync('./Log')) fs.mkdirSync('./Log');
if (!fs.existsSync('./Data')) fs.mkdirSync('./Data');

const client = new Discord.Client()

const Presence = new config.Presence()

var TIMER, TIMER_I = 0

client.on('ready', () => {
    game.start(client)
    Log.log(client.user.tag + ' 시작!\n')
    client.user.setPresence(Presence)

    TIMER = setInterval(() => {
        ban.sub()

        if (TIMER_I === 6) {
            TIMER_I = 1
            stack.clear()
        } else TIMER_I++
    }, 10000)
})

client.on('message', message => {
    var flag = false
    for(var i = 0; i < config.InteractiveSystem.Keyword.length; i++) {
        if (config.InteractiveSystem.Keyword[i].test(message.content)) {
            flag = true
            break;
        }
    }

    if ((!message.content.startsWith(config.Discord.prefix[0]) && !message.content.startsWith(config.Discord.prefix[1])) && !flag) return

    if (ban.check(message.author.id)) return

    if (message.author.bot) {
        if(message.author.id === '685283553277247491')
            return
        if (message.channel.type === 'dm') Log.log('\"' + message.author.tag + '\"봇이 \"DM 채널\" 에서 커맨드를 사용했어!\n')
        else Log.log('\"' + message.author.tag + '\"봇이 \"' + message.guild.name + '\" 에서 커맨드를 사용했어!\n')
        return
    }

    /*if(message.author.id === '473327037327736834') {
        message.channel.send('응 싫어~')
        return
    }*/

    var chname
    if (message.channel.type === 'dm') {
        if(message.author.id !== config.Developer.ID[0]) return
        else chname = 'DM 채널'
    } else {
        chname = message.guild.name
    }

    Log.log('\"' + message.author.tag + '\"이 \"' + chname + '\" 에서 이런 명령을 내렸어!\n' + message.content + '\n')
    if(!flag) message.content = message.content.substr(1)

    /*if (message.author.id !== config.Developer.ID[0]) {
        error.developing(client, message, embed)
        return
    }*/

    if (message.author.id !== config.Developer.ID[0]) stack.auto(client, message, new Discord.MessageEmbed(), flag)

    if (message.content.startsWith('help') || message.content.startsWith('도움')) {
        help.run(client, message, new Discord.MessageEmbed())
    } else if (message.content === 'ping' || message.content === '핑') {  
        ping.run(client, message, new Discord.MessageEmbed())
    } else if (message.content.startsWith('dict') || message.content.startsWith('사전')) {
        dict.run(client, message, new Discord.MessageEmbed())
    } else if (message.content.startsWith('search') || message.content.startsWith('검색')) { 
        search.run(client, message, new Discord.MessageEmbed())
    } else if (message.content.startsWith('userinfo') || message.content.startsWith('유저')) {    
        userinfo.run(client, message, new Discord.MessageEmbed())
    } else if (message.content.startsWith('botinfo') || message.content.startsWith('정보')) {     
        botinfo.run(client, message, new Discord.MessageEmbed())
    } else if (message.content.startsWith('e2ktrans') || message.content.startsWith('영한번역')) {       
        transe.run(client, message, new Discord.MessageEmbed())
    } else if (message.content.startsWith('k2etrans') || message.content.startsWith('한영번역')) {        
        transk.run(client, message, new Discord.MessageEmbed())
    } else if (message.content.startsWith('trans') || message.content.startsWith('번역')) {   
        trans.run(client, message, new Discord.MessageEmbed())
    } else if (message.content.startsWith('image') || message.content.startsWith('이미지')) {
        image.run(client, message, new Discord.MessageEmbed(), Discord.MessageAttachment)
    } else if (message.content.startsWith('serverinfo') || message.content.startsWith('서버')) {
        serverinfo.run(client, message, new Discord.MessageEmbed())
    } else if (message.content.startsWith('channelinfo') || message.content.startsWith('채널')) {
        channelinfo.run(client, message, new Discord.MessageEmbed())
    } else if (message.content === 'trending-topics' || message.content === '실검') {
        trending_topics.run(client, message, new Discord.MessageEmbed())
    } else if (message.content.startsWith('calc') || message.content.startsWith('연산')) {
        calculation.run(client, message, new Discord.MessageEmbed())
    } else if ((message.content.startsWith('random') || message.content.startsWith('랜덤'))) {
        random.run(client, message, new Discord.MessageEmbed())
    } else if ((message.content.startsWith('chat') || message.content.startsWith('챗'))) {
        chat.run(client, message, new Discord.MessageEmbed())
    } else if ((message.content.startsWith('exit') || message.content.startsWith('종료'))) {
        exit.run(client, message, new Discord.MessageEmbed())
    } else if ((message.content.startsWith('setpresence') || message.content.startsWith('상태'))) {
        presencecommand.run(client, message, new Discord.MessageEmbed())
    } else if ((message.content.startsWith('stack') || message.content.startsWith('스택'))) {
        stack_command.run(client, message, new Discord.MessageEmbed())
    } else if ((message.content.startsWith('ban') || message.content.startsWith('밴'))) {
        ban_command.run(client, message, new Discord.MessageEmbed())
    } else if ((message.content.startsWith('join') || message.content.startsWith('참여'))) {
        game.join(client, message, new Discord.MessageEmbed())
    } else if ((message.content.startsWith('leave') || message.content.startsWith('탈퇴'))) {
        game.leave(client, message, new Discord.MessageEmbed())
    } else if ((message.content.startsWith('game') || message.content.startsWith('게임'))) {
        game.main(client, message, Discord.MessageEmbed)
    } else if ((message.content.startsWith('uptime') || message.content.startsWith('업타임'))) {
        let now = Date.now()
        let str = time.MsToTime(now - UPTIME)
        let embed = new Discord.MessageEmbed()
        embed.setTitle('업타임')
        .setDescription(str)
        .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
        .setFooter('치즈덕 업타임')
        .setColor('#FF8C00')
        .setTimestamp()

        message.channel.send(embed)
    } else if (flag) {
        for(var i = 0; i < config.InteractiveSystem.Keyword.length; i++) {
            message.content = message.content.replace(config.InteractiveSystem.Keyword[i], '')
        }
        analysis.run(client, message, new Discord.MessageEmbed(), Discord.MessageAttachment, i)
    } else {
        error.unknowncommand(client, message, new Discord.MessageEmbed())
    }
})

client.login(config.Discord.token)