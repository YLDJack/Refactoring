//设想一个代表“人”的Person类，其中包含一个代 表“电话号码”的Telephone Number对象。
class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  set officeAreaCode(arg) {
    this._telephoneNumber.areaCode = arg;
  }
  get officeNumber() {
    return this._telephoneNumber.number;
  }
  set officeNumber(arg) {
    this._telephoneNumber.number = arg;
  }
}

class TelephoneNumber {
  get areaCode() {
    return this._areaCode;
  }
  set areaCode(arg) {
    this._areaCode = arg;
  }
  get number() {
    return this._number;
  }
  set number(arg) {
    this._number = arg;
  }
}

class TelephoneNumber {
  ////我需要做的第一件事是把TelephoneNumber类变成不可变 的。对它的字段运用移除设值函数（331）。移除设值函数 （331）的第一步是，用改变函数声明（124）把这两个字 段的初始值加到构造函数中，并迫使构造函数调用设值函 数
  constructor(areaCode, number) {
    this._areaCode = areaCode;
    this._number = number;
  }
  get areaCode() {
    return this._areaCode;
  }
  set areaCode(arg) {
    this._areaCode = arg;
  }
  get number() {
    return this._number;
  }
  set number(arg) {
    this._number = arg;
  }
}

class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }

  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  set officeAreaCode(arg) {
    //然后我会逐一查看设值函数的调用者，并将其改为重新 赋值整个对象。先从“地区代码”（area code）开始。
    this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
  }
  //对于其他字段，重复上述步骤。
  get officeNumber() {
    return this._telephoneNumber.number;
  }
  set officeNumber(arg) {
    this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg);
  }
}

//现在，TelephoneNumber已经是不可变的类，可以将其变 成真正的值对象了。是不是真正的值对象，要看是否基于值 判断相等性。在这个领域中，JavaScript做得不好：语言 和核心库都不支持将“基于引用的相等性判断”换成“基于 值的相等性判断”。我唯一能做的就是创建自己的equals函 数。
class TelephoneNumber {
  ////我需要做的第一件事是把TelephoneNumber类变成不可变 的。对它的字段运用移除设值函数（331）。移除设值函数 （331）的第一步是，用改变函数声明（124）把这两个字 段的初始值加到构造函数中，并迫使构造函数调用设值函 数
  constructor(areaCode, number) {
    this._areaCode = areaCode;
    this._number = number;
  }
  equals(other) {
    if (!(other instanceof TelephoneNumber)) return false;
    return this.areaCode === other.areaCode && this.number === other.number;
  }
  get areaCode() {
    return this._areaCode;
  }
  set areaCode(arg) {
    this._areaCode = arg;
  }
  get number() {
    return this._number;
  }
  set number(arg) {
    this._number = arg;
  }
}
//这段测试代码用了不寻常的格式，是为了帮助读者一眼 看出上下两次构造函数调用完全一样。 我在这个测试中创建了两个各自独立的对象，并验证它 们相等。
it("telephone equals", function () {
  assert(
    new TelephoneNumber("312", "555-0142").equals(
      new TelephoneNumber("312", "555-0142")
    )
  );
});
