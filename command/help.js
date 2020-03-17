const config = require('../config')
const hbotinfo = require('../help/botinfo')
const huserinfo = require('../help/userinfo')
const htransk = require('../help/k2e-translate')
const htranse = require('../help/e2k-translate')
const hping = require('../help/ping')
const hsearch = require('../help/search')
const hdict = require('../help/dictionary')
const error = require('../function/error')

exports.run = function(client, message, embed){
    if(message.content.indexOf(' ') === -1) {
        embed.setTitle('도움말')
        .setTimestamp()
        .setColor('#FF7F50')
        .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
        .setDescription('도움말 명령어 뒤에 명령어를 붙이면\n그 명령어의 **자세한 도움말**을 볼 수 있어!')
        .setThumbnail(client.user.avatarURL(config.ImageOption))
        .setFooter('치즈덕 도움말')
        .addField('\u200b', '\u200b', false)
        .addField('Prefix', '``덕``, ``^``', true)
        .addField('도움말', '``덕정보``, ``^help``', true)
        .addField('기타', '``덕핑``, ``^ping``', true)  
        .addField('번역', '``덕한영번역``, ``^k2etrans``, ``덕영한번역``, ``^e2ktrans``', true)
        .addField('정보', '``덕유저``, ``^userinfo``, ``덕정보``, ``^botinfo``', true)
        .addField('검색', '``덕사전``, ``^dict``, ``덕검색``, ``^search``', true)
        .addField('\u200b', '\u200b', false)
        message.channel.send(embed)
    } else {
        let content = message.content.substr(message.content.indexOf(' ') + 1)
        
        switch(content) {
            case '^botinfo':
            case '덕정보':
                hbotinfo.run(client, message, embed)
                break;
            case '^userinfo':
            case '덕유저':
                huserinfo.run(client, message, embed)
                break;
            case '^k2etrans':
            case '덕한영번역':
                htransk.run(client, message, embed)
                break;
            case '^e2ktrans':
            case '덕영한번역':
                htranse.run(client, message, embed)
                break;
            case '^ping':
            case '덕핑':
                hping.run(client, message, embed)
                break;
            case '^search':
            case '덕검색':
                hsearch.run(client, message, embed)
                break;
            case '^dict':
            case '덕사전':
                hdict.run(client, message, embed)
                break;
            default:
                error.unknownargument(client, message, embed)
        }
    }
}