const tag = {
    b : /<\/?b>/g,
    quot : /&quot;/g,
    lt : /&lt;/g,
    gt : /&gt;/g,
    nbsp : /&nbsp;/g,
    amp : /&amp;/g
}

exports.run = function(text) {
    let res = text.replace(tag.b, '')
    .replace(tag.quot, '\"')
    .replace(tag.lt, '<')
    .replace(tag.gt, '>')
    .replace(tag.nbsp, ' ')
    .replace(tag.amp, '&')
    return res
}