const pricingPlan = retrievePricingPlan();
const order = retreiveOrder();
const baseCharge = pricingPlan.base;
let charge;
const chargePerUnit = pricingPlan.unit;
const units = order.units;
let discount;
charge = baseCharge + units * chargePerUnit;
let discountableUnits = Math.max(units - pricingPlan.discountThreshold, 0);
discount = discountableUnits * pricingPlan.discountFactor;
if (order.isRepeat) discount += 20;
charge = charge - discount;
chargeOrder(charge);

//移动代码时，最容易遵守的一条规则是，如果待移动代 码片段中引用的变量在另一个代码片段中被修改了，那我就 不能安全地将前者移动到后者之后；同样，如果前者会修改 后者中引用的变量，也一样不能安全地进行上述移动。但这 条规则仅仅作为参考，它也不是绝对的，比如下面这个例 子，虽然两个语句都修改了彼此之间的变量，但我仍能安全 地调整它们的先后顺序。

//对于拥有条件逻辑的代码，移动手法同样适用。当从条
//件分支中移走代码时，通常是要消除重复逻辑；将代码移入 条件分支时，通常是反过来，有意添加一些重复逻辑。 在下面这个例子中，两个条件分支里都有一个相同的语 句：
let result;
if (availableResources.length === 0) {
  result = createResource();
  allocatedResources.push(result);
} else {
  result = availableResources.pop();
  allocatedResources.push(result);
}
return result;

//我可以将这两句重复代码从条件分支中移走，只在if- else块的末尾保留一句。

let result;
if (availableResources.length === 0) {
  result = createResource();
} else {
  result = availableResources.pop();
}
allocatedResources.push(result);
return result;

//这个手法同样可以反过来用，也就是把一个语句分别搬 移到不同的条件分支里，这样会在每个条件分支里留下同一 段重复的代码

