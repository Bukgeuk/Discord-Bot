const config = require('../config')
const request = require('request')
const error = require('../function/error')
const Adult = require('../function/adult')

var cache = {
    content: '',
    result: ''
}

exports.run = function(client, message, embed){
    var query
    if (message.content.startsWith('k2etrans')) query = message.content.substr(9)
    else if (message.content.startsWith('한영번역')) query = message.content.substr(5)

    if (query.length === 0) {
        error.notranssentence(client, message, embed)
        return
    } else if (message.content.length > 128) {
        error.toolongcommand(client, message, embed)
        return
    }

    var content    

    if (cache.content === query) {
        content = cache.result

        embed.setTitle('``' + query + '``의 변역결과')
        .setDescription(content)
        .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
        .setColor('#00BFFF')
        .setTimestamp()
        .setFooter('치즈덕 한영번역')
        message.channel.send(embed)

    } else {
        Adult.isAdultKeyword(query).then(function(result){
            if(result === '1' && !message.channel.nsfw) {
                error.adultkeyword(client, message, embed)
                return
            }

            const options = {
                url: 'https://openapi.naver.com/v1/papago/n2mt',
                form: {
                    'source' : 'ko',
                    'target' : 'en',
                    'text' : query
                },
                headers: {
                    'X-Naver-Client-Id' : config.Naver.ID,
                    'X-Naver-Client-Secret' : config.Naver.SECRET
                }
            };
        
            request.post(options, function (err, response, body) {
                let json = JSON.parse(body)
        
                if (json.errorCode === 'N2MT07') {
                    error.unknown(client, message, embed)
                    return
                }

                if(json.errorCode === '010') {
                    error.querylimitexceeded(client, message, embed)
                    return
                }
        
                content = json.message.result.translatedText
    
                cache.content = query;
                cache.result = content;
    
                embed.setTitle('``' + query + '``의 변역결과')
                .setDescription(content)
                .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
                .setColor('#00BFFF')
                .setTimestamp()
                .setFooter('치즈덕 한영번역')
                message.channel.send(embed)
            });
        })
    }
}