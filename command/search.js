const request = require('request')
const config = require('../config')
const Adult = require('../function/adult')
const entry = require('../function/html-entry')
const error = require('../function/error')

exports.run = function(client, message, embed){
    if(message.content.length > 128) {
        error.toolongcommand(client, message, embed)
        return
    }

    let cut = message.content.lastIndexOf(" ")
    let num = Math.floor(Number(message.content.substr(cut + 1)))
    let content

    if (isNaN(num)) {
        num = 1

        if (message.content.startsWith('search')) content = message.content.substr(7)
        else if (message.content.startsWith('검색')) content = message.content.substr(3)
        
    } else {
        if (message.content.startsWith('search')) content = message.content.substr(7, cut - 7 + 1)
        else if (message.content.startsWith('검색')) content = message.content.substr(3, cut - 3 + 1)
    }

    if (content.length === 0) {
        error.nosearchkeyword(client, message, embed)
        return
    } else if (num > 10) {
        error.toomuchoutput(client, message, embed)
        return
    }

    Adult.isAdultKeyword(content).then(function(result){
        if(result === '1' && !message.channel.nsfw) {
            error.adultkeyword(client, message, embed)
            return
        }

        const option = {
            headers : {
                "X-Naver-Client-Id": config.Naver.ID,
                "X-Naver-Client-Secret": config.Naver.SECRET
            },
            url : 'https://openapi.naver.com/v1/search/webkr.json',
            qs : {
                query : content,
                display : num
            }
        }
    
        request.get(option, function(err, res, body){
            let json = JSON.parse(body)
    
            if(json.total === 0) {
                error.noresult(client, message, embed)
                return
            }

            if (json.errorCode === 'SE01' || json.errorCode === 'SE02' || json.errorCode === 'SE99') {
                error.unknown(client, message, embed)
                return
            }

            for(let i = 0; i < num; i++) {
                if(i > json.total) return
                embed.setTitle(entry.run(json.items[i].title))
                .setDescription(entry.run(json.items[i].description))
                .setURL(json.items[i].link)
                .setImage(json.items[i].thumbnail)
                .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
                .setFooter('치즈덕 검색')
                .setColor('#00FF00')
                .setTimestamp()
                message.channel.send(embed)
            }
        })
    }) 
}