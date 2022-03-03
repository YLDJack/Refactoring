class Employee {
  constructor(name, id, monthlyCost) {
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
  get monthlyCost() {
    return this._monthlyCost;
  }
  get name() {
    return this._name;
  }
  get id() {
    return this._id;
  }
  get annualCost() {
    return this.monthlyCost * 12;
  }
}
class Department {
  constructor(name, staff) {
    this._name = name;
    this._staff = staff;
  }
  get staff() {
    return this._staff.slice();
  }
  get name() {
    return this._name;
  }
  get totalMonthlyCost() {
    return this.staff
      .map((e) => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }
  get headCount() {
    return this.staff.length;
  }
  get totalAnnualCost() {
    return this.totalMonthlyCost * 12;
  }
}

//可以为它们提炼一个共同的超类，更明显地表达出它们 之间的共同行为。 首先创建一个空的超类，让原来的两个类都继承这个新 的类。

class Party {
  //在提炼超类时，我喜欢先从数据开始搬移，在 JavaScript中就需要修改构造函数。我先用字段上移（353）把name字段搬到超类中。
  constructor(name) {
    this._name = name;
  }
  //把数据搬到超类的同时，可以用函数上移（350）把相 关的函数也一起搬移。首先是name函数：
  get name() {
    return this._name;
  }
  //现在可以用函数上移（350）把这个函数搬到超类了。
  get annualCost() {
    return this.monthlyCost * 12;
  }
}
class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  get name() {
    return this._name;
  }
  get annualCost() {
    return this.monthlyCost * 12;
  }
  get monthlyCost() {}
}
class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._staff = staff;
  }
  get name() {
    return this._name;
  }
  //有两个函数实现非常相似
  //它们各自使用的函数monthlyCost和totalMonthlyCost名字 和实现都不同，但意图却是一致。我可以用改变函数声明 （124）将它们的名字统一
  get totalAnnualCost() {
    return this.totalMonthlyCost * 12;
  }
  get monthlyCost() {}
}
