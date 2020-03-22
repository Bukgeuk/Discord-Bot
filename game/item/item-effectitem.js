const Item = require('./item')

const ex = {
    Common_Health_Potion : new Item.EffectItem('회복 물약', 20, '체력을 10 회복해준다', 1, Item.Rating.Rating_Common, 'health + 10')


}

module.exports = ex;