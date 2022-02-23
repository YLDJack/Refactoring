class Order {
  get finalPrice() {
    const basePrice = this.quantity * this.itemPrice;
    let discountLevel;
    if (this.quantity > 100) discountLevel = 2;
    else discountLevel = 1;
    return this.discountedPrice(basePrice, discountLevel);
  }
  discountedPrice(basePrice, discountLevel) {
    switch (discountLevel) {
      case 1:
        return basePrice * 0.95;
      case 2:
        return basePrice * 0.9;
    }
  }
}
//=========================================>
availableVacation(anEmployee);
function availableVacation(anEmployee) {
  const grade = anEmployee.grade;
}

//在简化函数逻辑时，我总是热衷于使用以查询取代临时 变量（178），于是就得到了如下代码。

//到这一步，已经不需要再把discountLevel的计算结果传 给discountedPrice了，后者可以自己调用discountLevel函 数，不会增加任何难度。 因此，我把discountedPrice函数中用到这个参数的地方 全都改为直接调用discountLevel函数
class Order {
  get finalPrice() {
    const basePrice = this.quantity * this.itemPrice;
    return this.discountedPrice(basePrice, this.discountLevel);
  }
  get discountLevel() {
    return this.quantity > 100 ? 2 : 1;
  }
  //然后用改变函数声明（124）手法移除该参数。
  get finalPrice() {
    const basePrice = this.quantity * this.itemPrice;
    return this.discountedPrice(basePrice);
  }
  discountedPrice(basePrice) {
    switch (this.discountLevel) {
      case 1:
        return basePrice * 0.95;
      case 2:
        return basePrice * 0.9;
    }
  }
}
