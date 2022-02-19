class ProductionPlan {
  get production() {
    return this._production;
  }
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._production += anAdjustment.amount;
  }
}

//“可以即时计算”只是我的猜想 ——我可以用引入断言（302）来验证这个猜想

class ProductionPlan {
  get production() {
    //然后用内联函数（115）把计算逻辑内联到production函 数内
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
    //放上这个断言之后，我会运行测试。如果断言没有失 败，我就可以不再返回该字段，改为返回即时计算的结果。
    assert(this._production === this.calculatedProduction);
    return this._production;
  }
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
  }
  get calculatedProduction() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
  }
}
