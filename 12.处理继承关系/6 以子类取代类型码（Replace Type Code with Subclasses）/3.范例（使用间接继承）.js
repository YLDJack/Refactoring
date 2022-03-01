//还是前面这个例子，我们回到最起初的状态，不过这次 我已经有了“全职员工”和“兼职员工”两个子类，所以不 能再根据员工类别代码创建子类了。另外，我可能需要允许 员工类别动态调整，这也会导致不能使用直接继承的方案。
class Employee {
  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this._type = type;
  }
  validateType(arg) {
    if (!["engineer", "manager", "salesman"].includes(arg))
      throw new Error(`Employee cannot be of type ${arg}`);
  }
  get type() {
    return this._type;
  }
  set type(arg) {
    this._type = arg;
  }
  get capitalizedType() {
    return (
      this._type.charAt(0).toUpperCase() + this._type.substr(1).toLowerCase()
    );
  }
  toString() {
    return `${this._name} (${this.capitalizedType})`;
  }
}

//首先，我用以对象取代基本类型（174）包装类型码。
class EmployeeType {
  constructor(aString) {
    this._value = aString;
  }
  toString() {
    return this._value;
  }
}

class Employee {
  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this.type = type;
  }
  validateType(arg) {
    if (!["engineer", "manager", "salesman"].includes(arg))
      throw new Error(`Employee cannot be of type ${arg}`);
  }
  get typeString() {
    return this._type.toString();
  }
  get type() {
    return this._type;
  }
  set type(arg) {
    this._type = new EmployeeType(arg);
  }
  get capitalizedType() {
    return (
      this.typeString.charAt(0).toUpperCase() +
      this.typeString.substr(1).toLowerCase()
    );
  }
  toString() {
    return `${this._name} (${this.capitalizedType})`;
  }
}

//然后使用以子类取代类型码（362）的老套路，把员工 类别代码变成子类。
class Employee {
  set type(arg) {
    this._type = Employee.createEmployeeType(arg);
  }
  static createEmployeeType(aString) {
    switch (aString) {
      case "engineer":
        return new Engineer();
      case "manager":
        return new Manager();
      case "salesman":
        return new Salesman();
      default:
        throw new Error(`Employee cannot be of type ${aString}`);
    }
  }
}

//如果重构到此为止的话，空的EmployeeType类可以去 掉。但我更愿意留着它，用来明确表达各个子类之间的关 系。并且有一个超类，也方便把其他行为搬移进去，例如我 专门放在toString函数里的“名字大写”逻辑，就可以搬到超类。
class EmployeeType {
  toString() {
    return `${this._name} (${this.type.capitalizedName})`;
  }
  get capitalizedName() {
    return (
      this.toString().charAt(0).toUpperCase() +
      this.toString().substr(1).toLowerCase()
    );
  }
}
class Engineer extends EmployeeType {
  toString() {
    return "engineer";
  }
}
class Manager extends EmployeeType {
  toString() {
    return "manager";
  }
}
class Salesman extends EmployeeType {
  toString() {
    return "salesman";
  }
}
