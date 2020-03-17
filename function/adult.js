const request = require('request')
const config = require('../config')

exports.isAdultKeyword = function(keyword){
    return new Promise(function(resolve){
        const option = {
            headers : {
                "X-Naver-Client-Id": config.Naver.ID,
                "X-Naver-Client-Secret": config.Naver.SECRET
            },
            url : 'https://openapi.naver.com/v1/search/adult.json',
            qs : {
                query : keyword
            }
        }
        request.get(option, function(err, res, body){
            if(body.startsWith('<')) {
                console.log('Unknown Error : body is startWith \"<\"\n')
                console.log(body)
                return
            }
            
            let json = JSON.parse(body)    
            resolve(json.adult)
        })
    })
}