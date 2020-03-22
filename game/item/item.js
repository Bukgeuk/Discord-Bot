var ex = {}

ex.Rating = {
    Rating_Common : {
        Name = '★',
        Color = '#DCDCDC'
    },

    Rating_UnCommon : {
        Name = '2★',
        Color = '#228B22'
    },

    Rating_Rare : {
        Name = '3★',
        Color = '#20B2AA'
    },

    Rating_Epic : {
        Name = '4★',
        Color = '#8A2BE2'
    },

    Rating_Unique : {
        Name = '5★',
        Color = '#FFD700'
    },

    Rating_Legendary : {
        Name = '6★',
        Color = '#FF8C00'
    },

    Rating_Mythic : {
        Name = '7★',
        Color = '#DC143C'
    }
}

ex.Item = class Item {
    constructor(_Name, _Cost, _Info, _Count, _Rating){
        this.Name = _Name;
        this.Cost = _Cost;
        this.Info = _Info;
        this.Count = _Count;
        this.Rating = _Rating;
    }

    get FullName() {
        return this.Rating + ' [' + this.Name + ']';
    }
}

ex.Gear = class Gear extends Item {
    constructor(_Name, _Cost, _Info, _Count, _Rating, _AddHealth, _AddPower){
        super(_Name, _Cost, _Info, _Count, _Rating);
        this.AddHealth = _AddHealth;
        this.AddPower = _AddPower;
    }
}

ex.EffectItem = class EffectItem extends Item {
    constructor(_Name, _Cost, _Info, _Count, _Rating, _Effect){
        super(_Name, _Cost, _Info, _Count, _Rating);
        this.Effect = _Effect;
    }
}

ex.SendItemInfo = function(client, message, embed, object){

}

module.exports = ex;