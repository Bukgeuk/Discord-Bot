const request = require('request')
const config = require('../config')
const Adult = require('../function/adult')
const error = require('../function/error')

exports.run = function(client, message, embed, attachment){
    if(message.content.length > 128) {
        error.toolongcommand(client, message, embed)
        return
    }

    let cut = message.content.lastIndexOf(" ")
    let num = Number(message.content.substr(cut + 1))
    let content

    if (isNaN(num)) {
        num = 1

        if (message.content.startsWith('image')) content = message.content.substr(6)
        else if (message.content.startsWith('이미지')) content = message.content.substr(4)
        
    } else {
        if (typeof num === 'float') num = Math.floor(num)

        if (message.content.startsWith('image')) content = message.content.substr(6, cut - 6 + 1)
        else if (message.content.startsWith('이미지')) content = message.content.substr(4, cut - 4 + 1)
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
            url : 'https://openapi.naver.com/v1/search/image',
            qs : {
                query : content,
                display : num,
                sort : 'sim'
            }
        }
    
        request.get(option, function(err, res, body){
            let json = JSON.parse(body)
    
            if(json.total === 0) {
                error.noresult(client, message, embed)
                return
            }

            if (json.errorCode === 'SE01' || json.errorCode === 'SE99') {
                error.unknown(client, message, embed)
                return
            } else if (!json.items[0].title) {
                error.unknown(client, message, embed)
                return
            }
    
            for(let i = 0; i < num; i++) {
                if(i > json.total) return
                attachment_send = new attachment(json.items[i].link)
                message.channel.send(attachment_send)
            }
        })
    }) 
}

