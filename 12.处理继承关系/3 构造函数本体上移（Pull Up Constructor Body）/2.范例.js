class Party {}
class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super();
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
}
// rest of class...
class Department extends Party {
  constructor(name, staff) {
    super();
    this._name = name;
    this._staff = staff;
  }
}

//Party的两个子类间存在公共代码，也即是对名字 （name）的赋值
//之后我将这行公共代码提升至超类的构造函数 中。由于其中引用了一个子类构造函数传入的参数name，于 是我将该参数一并传给超类构造函数。
class Party {
  constructor(name) {
    this._name = name;
  }
}

class Employee {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
}

class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._staff = staff;
  }
}

class Employee {
  constructor(name) {}
  get isPrivileged() {}
  assignCar() {}
}

class Manager extends Employee {
  constructor(name, grade) {
    super(name);
    this._grade = grade;
    //这里我无法简单地提升isPrivileged函数至超类，因为 调用它之前需要先为grade字段赋值，而该字段只能在子类的 构造函数中初始化。
    if (this.isPrivileged) this.assignCar();
  } // every subclass does this
  get isPrivileged() {
    return this._grade > 4;
  }
}

//在这种场景下，我可以对这部分公共代码使用提炼函数 （106）
class Manager {
  constructor(name, grade) {
    super(name);
    this._grade = grade;
    this.finishConstruction();
  }
  finishConstruction() {
    if (this.isPrivileged) this.assignCar();
  }
}

//然后再使用函数上移（350）将提炼得到的函数提升至 超类。
class Employee {
  finishConstruction() {
    if (this.isPrivileged) this.assignCar();
  }
}
