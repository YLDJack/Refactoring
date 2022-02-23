class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }
  get name() {
    return this._name;
  }
  get type() {
    return Employee.legalTypeCodes[this._typeCode];
  }
  static get legalTypeCodes() {
    return { E: "Engineer", M: "Manager", S: "Salesman" };
  }
}

//调用方
candidate = new Employee(document.name, document.empType);
const leadEngineer = new Employee(document.leadEngineer, "E");

//重构的第一步是创建工厂函数，其中把对象创建的责任 直接委派给构造函数。
function createEmployee(name, typeCode) {
  return new Employee(name, typeCode);
}

//然后找到构造函数的调用者，并逐一修改它们，令其使 用工厂函数。
//第一处的修改很简单
candidate = createEmployee(document.name, document.empType);
const leadEngineer = createEmployee(document.leadEngineer, "E");

//但我不喜欢这里的类型码——以字符串字面量的形式传 入类型码，一般来说都是坏味道。所以我更愿意再新建一个 工厂函数，把“员工类别”的信息嵌在函数名里体现
const leadEngineer = createEngineer(document.leadEngineer);

function createEngineer(name) {
  return new Employee(name, "E");
}
