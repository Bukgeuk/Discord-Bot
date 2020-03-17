const Log = require('./log')

var ex = {}
var list = {}

function index(t, e){
    if (t === undefined) this.time = 0
    else this.time = t
    this.tag = e
}

ex.clear = () => {
    list = {}
}

ex.add = function(id, tag){
    Log.log('\"' + tag + '\"가 BAN 목록에 추가됐어!\n')
    list[id] = new index(12, tag)
}

ex.sub = () => {
    for(let key in list){
        if (list[key].time === 0) delete list[key]
        list[key].time -= 1
    }
}

ex.remove = function(id){
    if (list[id] === undefined) return;
    else delete list[id]
}

ex.get = () => {
    let str = ''
    for(let key in list){
        str += ('**\"' + list[key].tag + '\"** : **' + Number(list[key].num) * 10 + 's**\n')
    }
    return str
}

ex.check = function(id) {
    if (list[id] === undefined || list[id].time === 0) return false
    else return true
}

module.exports = ex