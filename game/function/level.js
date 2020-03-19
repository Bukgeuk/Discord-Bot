exports.detectLevelUp = function(Data){
    if(Data.NowExp >= Data.MaxExp){
        Data.NowExp -= Data.MaxExp
        Data.MaxExp = Math.floor(Data.MaxExp * 1.3)
        Data.UpExp = Math.floor(Data.UpExp * 1.1)

        Data.UpMoney = Math.floor(Data.UpMoney * 1.5)

        Data.MaxHealth = Math.floor(Data.MaxHealth * 1.3)
        Data.NowHealth = Data.MaxHealth

        Data.Power = Math.floor(Data.Power * 1.3)

        Data.Level += 1

        return Data
    } else return false
}