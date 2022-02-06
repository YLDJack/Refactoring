reading = { customer: "ivan", quantity: 10, month: 5, year: 2017 };

//浏览处理这些数据记录的代码，我发现有很多地方在做 着相似的计算，于是我找到了一处计算“基础费用”（base charge）的逻辑。
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;
const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year)); //计税

//：计算基础费用的公式被重复了两 遍。如果你跟我有一样的习惯，现在大概已经在着手提炼函 数（106）了。有趣的是，好像别人已经动过这个脑筋了。
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);
function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }
  get customer() {
    return this._customer;
  }
  get quantity() {
    return this._quantity;
  }
  get month() {
    return this._month;
  }
  get year() {
    return this._year;
  }
  //搬移的同时，我会顺便运用函数改名（124），按照我 喜欢的风格对这个函数改名。
  // get calculateBaseCharge() {
  //   return baseRate(this.month, this.year) * this.quantity;
  // }

  //用这个名字，Reading类的客户端将不知道baseCharge究 竟是一个字段还是推演计算出的值。这是好事，它符合“统 一访问原则”（Uniform Access Principle）[mf-ua]。
  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }

  //运用提炼函数（106）将计算应税费用（taxable charge）的逻辑提炼成函数
  //然后我运用搬移函数（198）将其移入Reading
  get taxableChargeFn(aReading) { return Math.max(0, aReading.baseCharge - taxThreshold(aReading.year)); }
}

const rawReading = acquireReading(); const aReading = new Reading(rawReading); const taxableCharge = aReading.taxableCharge;