//我们在上面处理的其实是一些很简单的值，却要创建一 个这样的类，未免有点儿大动干戈。但在上面这个例子中， 我必须创建这样一个类，因为Customer类是允许使用者更新 其内容的。但如果面对一个只读的数据结构，我就可以改用 字面量对象（literal object）

class Site {
  //修改Site类和做条件判断的isUnknown函数，开始使用特 例对象。
  get customer() {
    return this._customer === "unknown"
      ? createUnknownCustomer()
      : this._customer;
  }
  get name() {}
  get billingPlan() {}
  set billingPlan(arg) {}
  get paymentHistory() {}

  get isUnknown() {
    return false;
  }
}
//和前面的例子一样，我首先在Customer中添加isUnknown 属性，并创建一个包含同名字段的特例对象。这次的区别在 于，特例对象是一个字面量。
function createUnknownCustomer() {
  return { isUnknown: true };
}
//然后我对检查特例的条件逻辑运用提炼函数（106）
function isUnknown(arg) {
  return arg === "unknown";
}

function isUnknown(arg) {
  return arg.isUnknown;
}
