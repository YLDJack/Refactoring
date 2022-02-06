class order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }
  get price() {
    var basePrice = this._quantity * this._item.price;
    var discountFactor = 0.98;
    if (basePrice > 1000) discountFactor -= 0.03;
    return basePrice * discountFactor;
  }
}

//我希望把basePrice和discountFactor两个临时变量变成 函数。
//先从basePrice开始，我先把它声明成const并运行测 试。
//这可以很好地防止我遗漏了对变量的其他赋值点——对 于这么个小函数是不太可能的，但当我处理更大的函数时就 不一定了。

class order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }
  get price() {
    //
    const basePrice = this._quantity * this._item.price;
    var discountFactor = 0.98;
    if (basePrice > 1000) discountFactor -= 0.03;
    return basePrice * discountFactor;
  }
  //然后我把赋值操作的右边提炼成一个取值函数。
  get basePrice() {
    return this._quantity * this._item.price;
  }
}

class order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }
  get price() {
    //测试，然后应用内联变量（123）。。
    var discountFactor = 0.98;
    if (this.basePrice > 1000) discountFactor -= 0.03;
    return this.basePrice * discountFactor;
  }

  get basePrice() {
    return this._quantity * this._item.price;
  }
  //接下来我对discountFactor重复同样的步骤，先是应用提炼函数（106）。
  //这里我需要将对discountFactor的两处赋值一起搬移到 新提炼的函数中，之后就可以将原变量一起声明为const。

  get discountFactor() {
    var discountFactor = 0.98;
    if (this.basePrice > 1000) discountFactor -= 0.03;
    return discountFactor;
  }
  //然后，内联变量：
  get price() {
    return this.basePrice * this.discountFactor;
  }
}
