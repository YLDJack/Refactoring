class Product {
  applyDiscount(arg) {
    this._price.amount -= arg;
  }
}
//=========================================>

class Product {
  applyDiscount(arg) {
    this._price = new Money(this._price.amount - arg, this._price.currency);
  }
}
