var Rating = {
    Rating_Common : function(){
        this.Name = '일반'
        this.Color = '#DCDCDC'
    },

    Rating_UnCommon : function(){
        this.Name = '고급'
        this.Color = '#228B22'
    },

    Rating_Rare : function(){
        this.Name = '레어'
        this.Color = '#20B2AA'
    },

    Rating_Epic : function(){
        this.Name = '에픽'
        this.Color = '#8A2BE2'
    },

    Rating_Unique : function(){
        this.Name = '유니크'
        this.Color = '#FFD700'
    },

    Rating_Legendary : function(){
        this.Name = '전설'
        this.Color = '#FF8C00'
    },

    Rating_Mythic : function(){
        this.Name = '신화'
        this.Color = '#DC143C'
    }
}

function Item(){}
Item.prototype.Name = ''
Item.prototype.Cost = 0
Item.prototype.Info = ''
Item.prototype.Count = 0

function Gear(){}
Gear.prototype = new Item()
Gear.prototype.AddHealth = 0
Gear.prototype.AddPower = 0
Gear.prototype.Type = 'Gear'

function EffectItem(){}
EffectItem.prototype = new Item()
EffectItem.prototype.Effect = ''
EffectItem.prototype.Type = 'EffectItem'

function Common_Health_Potion(){
    this.Rating = new Rating.Rating_Common()
    this.Effect = 'health + 10'
    this.Name = '[일반] 회복 물약'
    this.Cost = 20
    this.Info = '체력을 10 회복해준다'
    this.Count = 1
}
Common_Health_Potion.prototype = new EffectItem()