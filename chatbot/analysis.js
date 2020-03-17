const Dialogflow = require('./dialogflow')
const Log = require('../function/log')
const search = require('../command/search')
const dict = require('../command/dictionary')
const image = require('../command/image')
const config = require('../config')
const ping = require('../command/ping')
const pattern = require('./pattern')
const trans = require('../command/translate')
const help = require('../command/help')
const userinfo = require('../command/userinfo')
const botinfo = require('../command/botinfo')
const serverinfo = require('../command/serverinfo')
const channelinfo = require('../command/channelinfo')
const detectlang = require('../function/detectlang')

function log(content, fulfillmentText){
    return new Promise(function(resolve, reject){
        Log.log('\"' + content + '\" 라는 명령에\nDialogflow 에서 \"' + fulfillmentText + '\" 라는 결과를 받아왔어!\n')
        resolve()
    })
}

exports.run = function(client, message, embed, attachment, keynum){
    var content = message.content.replace(config.InteractiveSystem.Keyword[keynum], '')

    if(content[0] === ' ') content = content.substr(1)

    /*var split_arr = message.content.split(' ')
    for(let i = split_arr.length - 1; i >= 0; i--) {
        if (split_arr[i].indexOf('번역') !== -1){

        } else if (split_arr[i].indexOf('검색') !== -1) {

        } else if (split_arr[i].indexOf('검색') !== -1) {

        }
    }*/

    if (pattern.detail_test.test(content)) var content__ = content.replace(pattern.detail_test, 'content')
    else var content__ = content
    
    if (pattern.translate.test(content__)) {
        if (pattern.detail.test(content)) var sentence = content.replace(pattern.detail, '$1')
        else var sentence = content.replace(pattern.translate, '$1')
        var origin_lang = content.replace(pattern.translate, '$2')
        var target_lang = content.replace(pattern.translate, '$3')
        
        if (sentence[sentence.length - 1] === ' ') sentence = sentence.substr(0, keyword.length - 1)

        message.content = 'trans ' + origin_lang + ' ' + target_lang + ' ' + sentence

        trans.run(client, message, embed)

        return
    } else if (pattern.autotranslate.test(content__)) {
        if (pattern.detail.test(content)) var sentence = content.replace(pattern.detail, '$1')
        else var sentence = content.replace(pattern.autotranslate, '$1')
        var target_lang = content.replace(pattern.autotranslate, '$2')

        detectlang.detectlang(sentence).then(function(origin_lang){
            if (sentence[sentence.length - 1] === ' ') sentence = sentence.substr(0, keyword.length - 1)

        message.content = 'trans ' + origin_lang + ' ' + target_lang + ' ' + sentence

        trans.run(client, message, embed)
        })
        return
    } else if (pattern.image.test(content__)) {
        if (pattern.detail.test(content)) var keyword = content.replace(pattern.detail, '$1')
        else var keyword = content.replace(pattern.image, '$1')
        var temparr = content.match(pattern.count)
        if (pattern.count.test(content)) var count = temparr[temparr.length - 1].substr(0, temparr[temparr.length - 1].length - 1)
        else var count = 1
        
        if (keyword[keyword.length - 1] === ' ') keyword = keyword.substr(0, keyword.length - 1)

        message.content = 'image ' + keyword + ' ' + count

        image.run(client, message, embed, attachment)

        return
    } else if (pattern.dict.test(content__)) {
        if (pattern.detail.test(content)) var keyword = content.replace(pattern.detail, '$1')
        else var keyword = content.replace(pattern.dict, '$1')
        var temparr = content.match(pattern.count)
        if (pattern.count.test(content)) var count = temparr[temparr.length - 1].substr(0, temparr[temparr.length - 1].length - 1)
        else var count = 1
        
        if (keyword[keyword.length - 1] === ' ') keyword = keyword.substr(0, keyword.length - 1)

        message.content = 'dict ' + keyword + ' ' + count

        dict.run(client, message, embed)

        return
    } else if (pattern.search.test(content__)) {
        if (pattern.detail.test(content)) var keyword = content.replace(pattern.detail, '$1')
        else var keyword = content.replace(pattern.search, '$1')
        var temparr = content.match(pattern.count)
        if (pattern.count.test(content)) var count = temparr[temparr.length - 1].substr(0, temparr[temparr.length - 1].length - 1)
        else var count = 1
        
        if (keyword[keyword.length - 1] === ' ') keyword = keyword.substr(0, keyword.length - 1)

        message.content = 'search ' + keyword + ' ' + count

        search.run(client, message, embed)

        return
    }

    const dialog = new Dialogflow(config.InteractiveSystem.Dialogflow.ProjectID, './discord-bot-270504-89b4caeb77df.json')
    dialog.sendToDialogflow(content, 'session-' + message.author.id).then(function(value){
        var fulfillmentText = value[0].queryResult.fulfillmentText;

        log(content, fulfillmentText).then(()=>{

            switch (fulfillmentText.split(' ', 1)[0]) {
                case 'hello':
                    message.channel.send(fulfillmentText.split(' ', 2)[1])
                    return;
                case 'bored':
                    if (fulfillmentText === 'bored null') message.channel.send('어쩌라구 ㅎㅎ')
                    else message.channel.send('나 바쁜데?')
                    return;
                case 'dict':
                    var cut_front = fulfillmentText.indexOf(' ')
                    var cut_back = fulfillmentText.lastIndexOf(' ')
                    var num = fulfillmentText.substr(cut_back + 1)
                    num = num.substr(0, num.length - 1)
                    var keyword = fulfillmentText.substr(cut_front + 1, cut_back - cut_front)
                    keyword = keyword.replace(pattern.dict, '')
                    message.content = 'dict ' + keyword + ' ' + num
                    dict.run(client, message, embed)
                    return;
                case 'image':
                    var cut_front = fulfillmentText.indexOf(' ')
                    var cut_back = fulfillmentText.lastIndexOf(' ')
                    var num = fulfillmentText.substr(cut_back + 1)
                    num = num.substr(0, num.length - 1)
                    var keyword = fulfillmentText.substr(cut_front + 1, cut_back - cut_front)
                    keyword = keyword.replace(pattern.image, '')
                    message.content = 'image ' + keyword + ' ' + num
                    image.run(client, message, embed, attachment)
                    return;
                case 'ping':
                    if(pattern.ping.test(fulfillmentText)) message.content = 'ping'
                    else message.content = '핑'
                    ping.run(client, message, embed)
                    return;
                case 'k2etrans':
                    var cut_front = fulfillmentText.indexOf(' ')
                    var keyword = fulfillmentText.substr(cut_front + 1)
                    keyword = keyword.replace(pattern.k2e, '')
                    message.content = 'k2etrans ' + keyword
                    k2etrans.run(client, message, embed)
                    return;
                case 'e2ktrans':
                    var cut_front = fulfillmentText.indexOf(' ')
                    var keyword = fulfillmentText.substr(cut_front + 1)
                    keyword = keyword.replace(pattern.e2k, '')
                    message.content = 'e2ktrans ' + keyword
                    k2etrans.run(client, message, embed)
                    return;
                case 'trans':
                    var arr = config.Translate.Entity.exec(fulfillmentText)
                    console.log(arr)
                    var entity = arr[arr.length - 1]
                    console.log(entity)

                    var target_lang = config.Translate.Target.exec(entity)
                    console.log(target_lang, config.Translate.Target)
                    var origin_lang = config.Translate.Origin.exec(entity)
                    console.log(origin_lang)

                    var content = fulfillmentText.substr(0, fulfillmentText.length - fulfillmentText.lastIndexOf(entity))
                    if(content[content.length - 1] === ' ') content = content.substr(0, content.length - 1)

                    message.content = 'trans ' + origin_lang + ' ' + target_lang + ' ' + content

                    console.log(message.content)
                    trans.run(client, message, embed)
                    return;
                case 'help':
                    message.content = 'help'
                    help.run(client, message, embed)
                    return;
                case '':
                    message.channel.send('문장을 이해하지 못했어...')
                    return;
                default:
                    message.channel.send(fulfillmentText)
                    return;
            }
        })
        
        
        
    
        //message.content = '^search' + keyword + ' ' + num;
    }).catch(function(e){
        //return e;
    })

    //search.run(client, message, embed)
}