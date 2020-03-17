const fs = require('fs')

exports.log = (text) => {
    var temp = new Date();
    var date = temp.toISOString().split('T')[0]
    var time = temp.toString().split(' ')[4]
    console.log(text)

    if(text[text.length - 1] === '\n') text = text.substr(0, text.length - 1)

    fs.open('./Log/' + date + '.log', 'a+', function(err, fd){
        if (err) throw error

        var buf = Buffer.from('[' + time + '] ' + text.replace(/\n/g, '\\n') + '\n')
        fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer){
            if(err) throw err;

            fs.close(fd, function(){})
        })
    })
}