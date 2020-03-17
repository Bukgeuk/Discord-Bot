var list = {}

list.ping = /레이턴시/

//list.k2e = /\s?((한\s?)|(한글\s?))?(에서\s?)?영((어로?)|(으로))?\s?(번역)?/

//list.e2k = /\s?((영\s?)|(영어\s?))?(에서\s?)?한((글로?)|(으로))?\s?(번역)?/

list.image = /([^\v]+)((이미지)|(사진))[^\v]*/g

list.dict = /([^\v]+)사전[^\v]*/g

list.search = /([^\v]+)검색[^\v]*/g

list.translate = /([^\v]+)\s([^\v]+)에서\s?([^\v]+)으?로[^\v]*/g

list.autotranslate = /([^\v]+)\s([^\v]+)으?로[^\v]*/g

list.count = /(\d+)\s?개/g

list.detail = /[^\v]*"([^\v]+)"[^\v]+/g

list.detail_test = /"([^\v]+)"/g

module.exports = list