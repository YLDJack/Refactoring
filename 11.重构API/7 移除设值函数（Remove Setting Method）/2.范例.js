class Person {
  get name() {
    return this._name;
  }
  set name(arg) {
    this._name = arg;
  }
  get id() {
    return this._id;
  }
  set id(arg) {
    this._id = arg;
  }
}

//目前我会这样创建新对象
const martin = new Person();
martin.name = "martin";
martin.id = "1234";

//然后调整创建脚本，改为从构造函数设值id字段值。
//所有创建Person对象的地方都要如此修改，每次修改之 后要执行测试。 全部修改完成后，就可以用内联函数（115）消去设值 函数。
const martin = new Person("1234");
martin.name = "martin";


class Person {
  //对象创建之后，name字段可能会改变，但id字段不会。 为了更清晰地表达这个设计意图，我希望移除对应id字段的 设值函数。
  //但id字段还得设置初始值，所以我首先用改变函数声明 （124）在构造函数中添加对应的参数。

  constructor(id) {
    this.id = id;
  }
  get name() {
    return this._name;
  }
  set name(arg) {
    this._name = arg;
  }
  get id() {
    return this._id;
  }
}
