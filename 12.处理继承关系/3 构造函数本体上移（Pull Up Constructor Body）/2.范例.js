//在浏览代码时，我发现多处代码在调用一个函数计算物 流（shipment）的到货日期（delivery date）。一些调 用代码类似这样
aShipment.deliveryDate = deliveryDate(anOrder, true);

aShipment.deliveryDate = deliveryDate(anOrder, false);

//面对这样的代码，我立即开始好奇：参数里这个布尔值 是什么意思？是用来干什么的？

function deliveryDate(anOrder, isRush) {
  if (isRush) {
    let deliveryTime;
    if (["MA", "CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
    else if (["NY", "NH"].includes(anOrder.deliveryState)) deliveryTime = 2;
    else deliveryTime = 3;
    return anOrder.placedOn.plusDays(1 + deliveryTime);
  } else {
    let deliveryTime;
    if (["MA", "CT", "NY"].includes(anOrder.deliveryState)) deliveryTime = 2;
    else if (["ME", "NH"].includes(anOrder.deliveryState)) deliveryTime = 3;
    else deliveryTime = 4;
    return anOrder.placedOn.plusDays(2 + deliveryTime);
  }
}

//原来调用者用这个布尔型字面量来判断应该运行哪个分 支的代码——典型的标记参数。然而函数的重点就在于要遵 循调用者的指令，所以最好是用明确函数的形式明确说出调 用者的意图。

//对于这个例子，我可以使用分解条件表达式（260）， 得到下列代码：
//这两个函数能更好地表达调用者的意图，现在我可以修 改调用方代码了

aShipment.deliveryDate = deliveryDate(anOrder, true);

aShipment.deliveryDate = rushDeliveryDate(anOrder);

function deliveryDate(anOrder, isRush) {
  if (isRush) return rushDeliveryDate(anOrder);
  else return regularDeliveryDate(anOrder);
}
function rushDeliveryDate(anOrder) {
  let deliveryTime;
  if (["MA", "CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
  else if (["NY", "NH"].includes(anOrder.deliveryState)) deliveryTime = 2;
  else deliveryTime = 3;
  return anOrder.placedOn.plusDays(1 + deliveryTime);
}
function regularDeliveryDate(anOrder) {
  let deliveryTime;
  if (["MA", "CT", "NY"].includes(anOrder.deliveryState)) deliveryTime = 2;
  else if (["ME", "NH"].includes(anOrder.deliveryState)) deliveryTime = 3;
  else deliveryTime = 4;
  return anOrder.placedOn.plusDays(2 + deliveryTime);
}

//可能有一些调用者给这个参数传入的是字面量，将其作 为标记参数使用；另一些调用者则传入正常的数据。若果真 如此，我还是会使用移除标记参数（314），但不修改传入 正常数据的调用者，重构结束时也不删除deliveryDate函 数。这样我就提供了两套接口，分别支持不同的用途。

//直接拆分条件逻辑是实施本重构的好方法，但只有 当“根据参数值做分发”的逻辑发生在函数最外层（或者可 以比较容易地将其重构至函数最外层）的时候，这一招才好 用。函数内部也有可能以一种更纠结的方式使用标记参数， 例如下面这个版本的deliveryDate函数：

function deliveryDate(anOrder, isRush) {
  let result;
  let deliveryTime;
  if (anOrder.deliveryState === "MA" || anOrder.deliveryState === "CT")
    deliveryTime = isRush ? 1 : 2;
  else if (anOrder.deliveryState === "NY" || anOrder.deliveryState === "NH") {
    deliveryTime = 2;
    if (anOrder.deliveryState === "NH" && !isRush) deliveryTime = 3;
  } else if (isRush) deliveryTime = 3;
  else if (anOrder.deliveryState === "ME") deliveryTime = 3;
  elsedeliveryTime = 4;
  result = anOrder.placedOn.plusDays(2 + deliveryTime);
  if (isRush) result = result.minusDays(1);
  return result;
}

//这种情况下，想把围绕isRush的分发逻辑剥离到顶层， 需要的工作量可能会很大。所以我选择退而求其次， 在deliveryDate之上添加两个函数：
function rushDeliveryDate(anOrder) {
  return deliveryDate(anOrder, true);
}
function regularDeliveryDate(anOrder) {
  return deliveryDate(anOrder, false);
}
