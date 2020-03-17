const config = require('../config')
const error = require('./error')
const request = require('request')

exports.get_langcode = function(text){
    if (text === '한국어' || text === '한국' || text === '한' || text === '한글' || text === 'ko') return 'ko'
    else if (text === '영어' || text === '영' || text === 'en') return 'en'
    else if (text === '중국어 간체' || text === '중국어간체' || text === '중국간체' || text === 'zh-CN') return 'zh-CN'
    else if (text === '중국어 번체' || text === '중국어번체' || text === '중국번체' || text === 'zh-TW') return 'zh-TW' 
    else if (text === '일본어' || text === '일본' || text === '일' || text === 'ja') return 'ja'
    else if (text === '베트남어' || text === '베트남' || text === '베' || text === 'vi') return 'vi'
    else if (text === '인도네시아어' || text === '인도네시아' || text === '인' || text === 'id') return 'id'
    else if (text === '태국어' || text === '태국' || text === '태' || text === 'th') return 'th'
    else if (text === '독일어' || text === '독일' || text === '독' || text === 'de') return 'de'
    else if (text === '러시아어' || text === '러시아' || text === '러' || text === 'ru') return 'ru'
    else if (text === '스페인어' || text === '스페인' || text === '스' || text === 'es') return 'es'
    else if (text === '이탈리아어' || text === '이탈리아' || text === '이' || text === 'it') return 'it'
    else if (text === '프랑스어' || text === '프랑스' || text === '프' || text === 'fr') return 'fr'
    else return 'unknown'
}

exports.detectlang = function(text){
    return new Promise(function(resolve){
        const options = {
            url: 'https://openapi.naver.com/v1/papago/detectLangs',
            form: {
                'query': text
            },
            headers: {
                'X-Naver-Client-Id' : config.Naver.ID,
                'X-Naver-Client-Secret' : config.Naver.SECRET
            }
        };
    
        request.post(options, function (err, response, body) {
            let json = JSON.parse(body)
       
            resolve(json.langCode)    
        });
    })   
}