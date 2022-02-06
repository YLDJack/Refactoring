function price(order) {
  //price is base price - quantity discount + shipping
  return (
    order.quantity * order.itemPrice -
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
    Math.min(order.quantity * order.itemPrice * 0.1, 100)
  );
}

//提炼后
function price(order) {
  //price is base price - quantity discount + shipping
  const basePrice = order.quantity * order.itemPrice;
  return (
    basePrice -
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
    Math.min(basePrice * 0.1, 100)
  );
}

//提炼计算批发折扣（quantity discount）的逻 辑
function price(order) {
  //price is base price - quantity discount + shipping
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount =
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  return basePrice - quantityDiscount + Math.min(basePrice * 0.1, 100);
}

//再把运费（shipping）计算提炼出来,同时 我还可以删掉代码中的注释，因为现在代码已经可以完美表 达自己的意义了
function price(order) {
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount =
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const shipping = Math.min(basePrice * 0.1, 100);
  return basePrice - quantityDiscount + shipping;
}
