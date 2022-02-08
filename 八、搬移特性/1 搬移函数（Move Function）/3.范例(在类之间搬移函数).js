class Account {
  get bankCharge() {
    let result = 4.5;
    if (this._daysOverdrawn > 0) result += this.overdraftCharge;
    return result;
  }
  get overdraftCharge() {
    if (this.type.isPremium) {
      const baseCharge = 10;
      if (this.daysOverdrawn <= 7) return baseCharge;
      else return baseCharge + (this.daysOverdrawn - 7) * 0.85;
    } else return this.daysOverdrawn * 1.75;
  }
}

//上面的代码会根据账户类型（account type）的不 同，决定不同的“透支金额计费”算法。因此，很自然会想 到将overdraftCharge函数搬移到AccountType类去
//第一步要做的是：观察被overdraftCharge使用的每一项 特性，考虑是否值得将它们与overdraftCharge函数一起移 动。此例中我需要让daysOverdrawn字段留在Account类中，因 为它会随不同种类的账户而变化。

//然后，我将overdraftCharge函数主体复制到AccountType 类中，并做相应调整。
class AccountType {
  overdraftCharge(daysOverdrawn) {
    if (this.isPremium) {
      const baseCharge = 10;
      if (daysOverdrawn <= 7) return baseCharge;
      else return baseCharge + (daysOverdrawn - 7) * 0.85;
    } else return daysOverdrawn * 1.75;
  }
}

class Account {
  get bankCharge() {
    let result = 4.5;
    if (this._daysOverdrawn > 0) result += this.overdraftCharge;
    return result;
  }

  get overdraftCharge() {
    //完成函数复制后，我会将原来的方法代之以一个委托调 用。
    return this.type.overdraftCharge(this.daysOverdrawn);
  }

  //然后下一件需要决定的事情是，是保留overdraftCharge 这个委托函数，还是直接内联它？内联的话，代码会变成下 面这样。
  get bankCharge() {
    let result = 4.5;
    if (this._daysOverdrawn > 0) result += this.overdraftCharge;
    return result;
  }
  //在早先的步骤中，我将daysOverdrawn作为参数直接传递 给overdraftCharge函数，但如若账户（account）对象上有 很多数据需要传递，那我就比较倾向于直接将整个对象作为 参数传递过去
  get overdraftCharge() {
    return this.type.overdraftCharge(this);
  }
}

class AccountType {
  overdraftCharge(account) {
    if (this.isPremium) {
      const baseCharge = 10;
      if (account.daysOverdrawn <= 7) return baseCharge;
      else return baseCharge + (account.daysOverdrawn - 7) * 0.85;
    } else return account.daysOverdrawn * 1.75;
  }
}
