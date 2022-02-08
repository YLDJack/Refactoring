//有些客户端希望知道某人的经理是谁，为此，它必须先 取得Department对象。
manager = aPerson.department.manager;

class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  get department() {
    return this._department;
  }
  set department(arg) {
    this._department = arg;
  }
  //这样的编码就对客户端揭露了Department的工作原理， 于是客户知道：Department负责追踪“经理”这条信息。如 果对客户隐藏Department，可以减少耦合。为了这一目的， 我在Person中建立一个简单的委托函数
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

//现在，我得修改Person的所有客户端，让它们改用新函 数
//只要完成了对Department所有函数的修改，并相应修改 了Person的所有客户端，我就可以移除Person中的department 访问函数了。
manager = aPerson.manager;
