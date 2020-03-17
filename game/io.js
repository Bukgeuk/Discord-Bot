const fs = require('fs')

exports.read = function(server, filename){
    if (!fs.existsSync('./Data/' + server)) fs.mkdirSync('./Data/' + server);
    try {
        return fs.readFileSync('./Data/' + server + '/' + filename + '.json', 'utf8')    
    } catch (e) {
        return 'error'
    }
}

exports.write = function(object, server, filename){
    if (!fs.existsSync('./Data/' + server)) fs.mkdirSync('./Data/' + server);
    var fd = fs.openSync('./Data/' + server + '/' + filename + '.json', 'w')
    fs.writeSync(fd, JSON.stringify(object), null, 'utf8')
    fs.closeSync(fd)
}

exports.delete = function(server, filename){
    fs.unlinkSync('./Data/' + server + '/' + filename + '.json')
}