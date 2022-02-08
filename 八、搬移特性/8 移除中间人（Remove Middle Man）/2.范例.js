//像这样，使用和封装Department都很简单。但如果大量 函数都这么做，我就不得不在Person之中安置大量委托行 为。这就该是移除中间人的时候了。首先在Person中建立一 个函数，用于获取受托对象
manager = aPerson.manager;

class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  //首先在Person中建立一 个函数，用于获取受托对象
  get department() {
    return this._department;
  }
  set department(arg) {
    this._department = arg;
  }
  get manager() {
    return this._department.manager;
  }
}

class Department {
  get chargeCode() {
    return this._chargeCode;
  }
  set chargeCode(arg) {
    this._chargeCode = arg;
  }
  get manager() {
    return this._manager;
  }
  set manager(arg) {
    this._manager = arg;
  }
}

//然后逐一处理每个客户端，使它们直接通过受托对象完 成工作
//完成对客户端引用点的替换后，我就可以从Person中移 除manager方法了。我可以重复此法，移除Person中其他类似 的简单委托函数。
manager = aPerson.department.manager;