const config = require('../config')
const request = require('request')
const error = require('./error')

exports.detecttypo = function(text){
    const option = {
        headers : {
            "X-Naver-Client-Id": config.Naver.ID,
            "X-Naver-Client-Secret": config.Naver.SECRET
        },
        url : 'https://openapi.naver.com/v1/search/errata.json',
        query: text
    }

    request.get(option, function(err, res, body){
        let json = JSON.parse(body)

        if(!json.errata) {
            error.noresult(client, message, embed)
            return
        } else if (json.errorCode === 'SE01' || json.errorCode === 'SE99') {
            error.unknown(client, message, embed)
            return
        }

        return json.errata
    })
}