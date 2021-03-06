class Order {
  constructor(aRecord) {
    this._data = aRecord;
  }
  get quantity() {
    return this._data.quantity;
  }
  get itemPrice() {
    return this._data.itemPrice;
  }
  get price() {
    return (
      this.quantity * this.itemPrice -
      Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 +
      Math.min(this.quantity * this.itemPrice * 0.1, 100)
    );
  }
}

//这些变量名 所代表的概念，适用于整个Order类，而不仅仅是“计算价 格”的上下文。既然如此，我更愿意将它们提炼成方法，而不是变量
//这是对象带来的一大好处：它们提供了合适的上下文， 方便分享相关的逻辑和数据。
//在如此简单的情况下，这方面 的好处还不太明显；但在一个更大的类当中，如果能找出可 以共用的行为，赋予它独立的概念抽象，给它起一个好名字，对于使用对象的人会很有帮助。

class Order {
  constructor(aRecord) {
    this._data = aRecord;
  }
  get quantity() {
    return this._data.quantity;
  }
  get itemPrice() {
    return this._data.itemPrice;
  }
  get price() {
    return this.basePrice - this.quantityDiscount + this.shipping;
  }
  get basePrice() {
    return this.quantity * this.itemPrice;
  }
  get quantityDiscount() {
    return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05;
  }
  get shipping() {
    return Math.min(this.basePrice * 0.1, 100);
  }
}
