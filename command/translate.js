const config = require('../config')
const request = require('request')
const error = require('../function/error')
const Adult = require('../function/adult')
//const typo = require('../function/typo')
const Detect = require('../function/detectlang')

var cache_list = {}
function cache () {
    content = ''
    result = ''
    origin_lang = ''
    target_lang = ''
}

exports.run = function(client, message, embed, /*modify*/){
    var target_lang = Detect.get_langcode(message.content.split(' ', 3)[2])
    var origin_lang = Detect.get_langcode(message.content.split(' ', 2)[1])

    if (target_lang === 'unknown' || origin_lang === 'unknown') {
        error.unknownlangcode(client, message, embed, message.content.split(' ', 2)[1])
        return
    }

    var cut = 0
    for(let i = 0; i < 3; i++){
        cut = message.content.indexOf(' ', cut + 1)
    }

    var query = message.content.substr(cut + 1)

    if (query.length === 0) {
        error.notranssentence(client, message, embed)
        return
    } else if (message.content.length > 128) {
        error.toolongcommand(client, message, embed)
        return
    }

    //if (modify) query = typo.detecttypo(query)

    var content

    if (cache_list[message.author.id] === undefined) cache_list[message.author.id] = new cache();

    if (cache_list[message.author.id].content === query && cache_list[message.author.id].origin_lang === origin_lang && cache_list[message.author.id].target_lang === target_lang) {
        content = cache_list[message.author.id].result

        embed.setTitle('``' + query + '``의 변역결과')
        .setDescription(content)
        .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
        .setColor('#00BFFF')
        .setTimestamp()
        .setFooter('치즈덕 번역')
        message.channel.send(embed)

    } else {
        Adult.isAdultKeyword(query).then(function(result){
            if(result === '1' && !message.channel.nsfw) {
                error.adultkeyword(client, message, embed)
                return
            }

            var options = {
                url: 'https://openapi.naver.com/v1/papago/n2mt',
                form: {
                    'source' : origin_lang,
                    'target' : target_lang,
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
                } else if(json.errorCode === '010') {

                    options.headers["X-Naver-Client-Id"] = config.Naver2.ID
                    options.headers["X-Naver-Client-Secret"] = config.Naver2.SECRET

                    request.post(options, function (err, response, body2) {
                        let json = JSON.parse(body)
                
                        if (json.errorCode === 'N2MT07') {
                            error.unknown(client, message, embed)
                            return
                        } if(json.errorCode === '010') {
                            error.querylimitexceeded(client, message, embed)
                            return
                        } else if (json.message === undefined) {
                            error.unknown(client, message, embed)
                            return
                        }
        
                        json = JSON.parse(body2)
                    });
                } else if (json.message === undefined) {
                    error.unknown(client, message, embed)
                    return
                }

                content = json.message.result.translatedText
    
                cache_list[message.author.id].content = query;
                cache_list[message.author.id].result = content;
                cache_list[message.author.id].origin_lang = origin_lang;
                cache_list[message.author.id].target_lang = target_lang;
        
                embed.setTitle('``' + query + '``의 변역결과')
                .setDescription(content)
                .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
                .setColor('#00BFFF')
                .setTimestamp()
                .setFooter('치즈덕 번역')
                message.channel.send(embed)
            }); 
        })
    }
}