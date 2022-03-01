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
  toString() {
    return `${this._name} (${this._type})`;
  }
}

//第一步是用封装变量（132）将类型码自封装起来。
class Employee {
  get type() {
    return this._type;
  }
  //请注意，toString函数的实现中去掉了this._type的下划 线，改用新建的取值函数了。
  toString() {
    return `${this._name} (${this.type})`;
  }
}

//我选择从工程师（"engineer"）这个类型码开始重构。 我打算采用直接继承的方案，也就是继承Employee类。子类 很简单，只要覆写类型码的取值函数，返回适当的字面量值 就行了。
class Engineer extends Employee {
  get type() {
    return "engineer";
  }
}
//虽然JavaScript的构造函数也可以返回其他对象，但 如果把选择器逻辑放在这儿，它会与字段初始化逻辑相互纠 缠，搞得一团混乱。所以我会先运用以工厂函数取代构造函 数（334），新建一个工厂函数以便安放选择器逻辑
function createEmployee(name, type) {
  return new Employee(name, type);
}

//然后我把选择器逻辑放在工厂函数中，从而开始使用新 的子类。

function createEmployee(name, type) {
  switch (type) {
    case "engineer":
      return new Engineer(name, type);
  }
  return new Employee(name, type);
}

//测试，确保一切运转正常。不过由于我的偏执，我随后 会修改Engineer类中覆写的type函数，让它返回另外一个 值，再次执行测试，确保会有测试失败，这样我才能肯定： 新建的子类真的被用到了。然后我把type函数的返回值改回 正确的状态，继续处理别的类型。我一次处理一个类型，每 次修改后都执行测试。
class Salesman extends Employee {
  get type() {
    return "salesman";
  }
}
class Manager extends Employee {
  get type() {
    return "manager";
  }
}
function createEmployee(name, type) {
  switch (type) {
    case "engineer":
      return new Engineer(name, type);
    case "salesman":
      return new Salesman(name, type);
    case "manager":
      return new Manager(name, type);
  }
  return new Employee(name, type);
}

//全部修改完成后，我就可以去掉类型码字段及其在超类 中的取值函数（子类中的取值函数仍然保留）。
//测试，确保一切工作正常，我就可以移除验证逻辑，因 为分发逻辑做的是同一回事。

//现在，构造函数的类型参数已经没用了，用改变函数声 明（124）把它干掉。
class Employee{
  constructor(name){ this._name = name; }
  function createEmployee(name) { 
    switch (type) { case "engineer": return new Engineer(name, ); case "salesman": return new Salesman(name, ); case "manager": return new Manager (name, ); default: throw new Error(`Employee cannot be of type ${type}`); 
  } }
}
