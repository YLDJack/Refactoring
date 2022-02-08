class Person {
  get name() {
    return this._name;
  }
  set name(arg) {
    this._name = arg;
  }
  get telephoneNumber() {
    return `(${this.officeAreaCode}) ${this.officeNumber}`;
  }
  get officeAreaCode() {
    return this._officeAreaCode;
  }
  set officeAreaCode(arg) {
    this._officeAreaCode = arg;
  }
  get officeNumber() {
    return this._officeNumber;
  }
  set officeNumber(arg) {
    this._officeNumber = arg;
  }
}

//这里，我可以将与电话号码相关的行为分离到一个独立 的类中。首先，我要定义一个空的TelephoneNumber类来表 示“电话号码”这个概念：
class TelephoneNumber {
  get officeAreaCode() {
    return this._officeAreaCode;
  }
  set officeAreaCode(arg) {
    this._officeAreaCode = arg;
  }
  //现在我需要做些清理工作。“电话号码”显然不该拥 有“办公室”（office）的概念，因此我得重命名一下变 量
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
  //TelephoneNumber类上有一个对自己（telephone number）的取值函数也没什么道理，因此我又对它应用函 数改名（124）。
  toString() {
    return `(${this.areaCode}) ${this.number}`;
  }
}

//易如反掌！接着，我要在构造Person类时创建 TelephoneNumber类的一个实例
class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }
  ////TelephoneNumber类上有一个对自己（telephone number）的取值函数也没什么道理，因此我又对它应用函 数改名（124）。
  get telephoneNumber() {
    return this._telephoneNumber.toString();
  }
  get name() {
    return this._name;
  }
  set name(arg) {
    this._name = arg;
  }
  get telephoneNumber() {
    return this._telephoneNumber.telephoneNumber;
  }
  //我运用搬移字段（207）搬移一个字段。
  get officeAreaCode() {
    return this._telephoneNumber.officeAreaCode;
  }
  set officeAreaCode(arg) {
    this._telephoneNumber.officeAreaCode = arg;
  }
  get officeNumber() {
    return this._officeNumber;
  }
  set officeNumber(arg) {
    this._officeNumber = arg;
  }
  //现在我需要做些清理工作。“电话号码”显然不该拥 有“办公室”（office）的概念，因此我得重命名一下变 量
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
