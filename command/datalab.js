const request = require('request')
const config = require('../config')

//const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')

exports.run = function(client, message, embed){
    let content = message.content.substr(9)
    let arr = content.split(' ')
}

var request_body = {
    "startDate": today[0],
    "endDate": today[0],
    "timeUnit": "month",
    "keywordGroups": [
        {
            "groupName": "한글",
            "keywords": [
                "한글",
                "korean"
            ]
        },
        {
            "groupName": "영어",
            "keywords": [
                "영어",
                "english"
            ]
        }
    ],
    "device": "pc",
    "ages": [
        "1",
        "2"
    ],
    "gender": "f"
};

request.post({
        url: 'https://openapi.naver.com/v1/datalab/search',
        body: JSON.stringify(request_body),
        headers: {
            'X-Naver-Client-Id': config.Naver.ID,
            'X-Naver-Client-Secret': config.Naver.SECRET,
            'Content-Type': 'application/json'
        }
    },
    function (error, response, body) {
        console.log(response.statusCode);
        console.log(body);
    });