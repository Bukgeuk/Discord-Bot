const io = require('../io')

var isjoined = {}

var funcs = {}

funcs.read = (server) => {
    try {
        let list = io.read(server, 'joinlist')
        if (list === 'error') return;
        isjoined[server] = JSON.parse(list)
    } catch (e) {
        if (e.code !== 'ENOENT') throw e
        return;
    }
}

funcs.isjoin = (server, id) => {
    if (isjoined[server] === undefined) return false
    else if (isjoined[server][id] === undefined) return false
    else return isjoined[server][id]
}

funcs.join = (server, id) => {
    if (isjoined[server] === undefined) isjoined[server] = {}
    isjoined[server][id] = true
    io.write(isjoined[server], server, 'joinlist')
}

funcs.leave = (server, id) => {
    if (isjoined[server] === undefined) isjoined[server] = {}
    isjoined[server][id] = false
    io.write(isjoined[server], server, 'joinlist')
}

module.exports = funcs;
