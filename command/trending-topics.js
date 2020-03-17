const axios = require('axios')
const cheerio = require('cheerio');
const config = require('../config')

const getHtml = async () => {
  try {
    return await axios.get("https://datalab.naver.com/keyword/realtimeList.naver?where=main");
  } catch (error) {
    console.error(error);
  }
};

exports.run = function (client, message, embed) {
  getHtml().then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.list_group ul").children("li.ranking_item");

    $bodyList.each(function(i, elem) {
       ulList[i] = {
          title: $(this).find('span.item_title').text(),
       };
    });

    const data = ulList.filter(n => n.title);
    return data;
  }).then(function(res){
      var str = ''
      for(let i = 0; i < res.length; i++){
          str += ((i + 1) + ' ``' + res[i].title + '``\n')
      }
      embed.setTitle('실시간 검색어')
      .setDescription(str)
      .setURL('https://datalab.naver.com/keyword/realtimeList.naver?where=main')
      .setAuthor('치즈덕', client.user.avatarURL(config.ImageOption))
      .setFooter('치즈덕 실시간 검색어')
      .setColor('#00FF00')
      .setTimestamp()
      message.channel.send(embed)
  });

}