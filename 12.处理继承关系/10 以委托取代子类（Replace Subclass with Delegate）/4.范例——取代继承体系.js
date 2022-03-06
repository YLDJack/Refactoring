function createBird(data) {
  switch (data.type) {
    case "EuropeanSwallow":
      return new EuropeanSwallow(data);
    case "AfricanSwallow":
      return new AfricanSwallow(data);
    case "NorweigianBlueParrot":
      return new NorwegianBlueParrot(data);
    default:
      return new Bird(data);
  }
}
class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
  }
  get name() {
    return this._name;
  }
  get plumage() {
    return this._plumage || "average";
  }
  get airSpeedVelocity() {
    return null;
  }
}
class EuropeanSwallow extends Bird {
  get airSpeedVelocity() {
    return 35;
  }
}
class AfricanSwallow extends Bird {
  constructor(data) {
    super(data);
    this._numberOfCoconuts = data.numberOfCoconuts;
  }
  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts;
  }
}
class NorwegianBlueParrot extends Bird {
  constructor(data) {
    super(data);
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }
  get plumage() {
    if (this._voltage > 100) return "scorched";
    else return this._plumage || "beautiful";
  }
  get airSpeedVelocity() {
    return this._isNailed ? 0 : 10 + this._voltage / 10;
  }
}

//上面这个关于鸟儿（bird）的系统很快要有一个大变 化：有些鸟是“野生的”（wild），有些鸟是“家养 的”（captive），两者之间的行为会有很大差异。这种差 异可以建模为Bird类的两个子类：WildBird和CaptiveBird。 但继承只能用一次，所以如果想用子类来表现“野 生”和“家养”的差异，就得先去掉关于“不同品种”的继
//承关系。

//在涉及多个子类时，我会一次处理一个子类，先从简单 的开始——在这里，最简单的当属EuropeanSwallow（欧洲 燕）。我先给它建一个空的委托类。

//现在需要决定如何初始化委托字段。由于构造函数接受 的唯一参数data包含了所有的信息，我决定在构造函数中初 始化委托字段。考虑到有多个委托对象要添加，我会建一个 函数，其中根据类型码（data.type）来选择适当的委托对 象。

class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
    this._speciesDelegate = this.selectSpeciesDelegate(data);
  }
  selectSpeciesDelegate(data) {
    switch (data.type) {
      case "EuropeanSwallow":
        return new EuropeanSwallowDelegate();
      default:
        return null;
    }
  }
  //修改超类的airSpeedVelocity函数，如果发现有委托对象 存在，就调用之
  get airSpeedVelocity() {
    return this._speciesDelegate
      ? this._speciesDelegate.airSpeedVelocity
      : null;
  }
}

//结构设置完毕，我可以用搬移函数（198）把 EuropeanSwallow的airSpeedVelocity函数搬到委托对象中。

class EuropeanSwallowDelegate {
  get airSpeedVelocity() {
    return 35;
  }
}

//然后，删除子类。
class EuropeanSwallow {
  get airSpeedVelocity() {
    return this._speciesDelegate.airSpeedVelocity;
  }
}

//顶层作用域
function createBird(data) {
  switch (data.type) {
    case "AfricanSwallow":
      return new AfricanSwallow(data);
    case "NorweigianBlueParrot":
      return new NorwegianBlueParrot(data);
    default:
      return new Bird(data);
  }
}

//接下来处理AfricanSwallow（非洲燕）子类。为它创建 一个委托类，这次委托类的构造函数需要传入data参数。
class AfricanSwallowDelegate {
  constructor(data) {
    this._numberOfCoconuts = data.numberOfCoconuts;
  }
}

class Bird {
  selectSpeciesDelegate(data) {
    switch (data.type) {
      case "EuropeanSwallow":
        return new EuropeanSwallowDelegate();
      case "AfricanSwallow":
        return new AfricanSwallowDelegate(data);
      default:
        return null;
    }
  }
}

//接下来是NorwegianBlueParrot（挪威蓝鹦鹉）子类。创 建委托类和搬移airSpeed Velocity函数的步骤都跟前面一 样，所以我直接展示结果好了

class Bird {
  selectSpeciesDelegate(data) {
    switch (data.type) {
      case "EuropeanSwallow":
        return new EuropeanSwallowDelegate();
      case "AfricanSwallow":
        return new AfricanSwallowDelegate(data);
      case "NorweigianBlueParrot":
        return new NorwegianBlueParrotDelegate(data);
      default:
        return null;
    }
  }
}

class NorwegianBlueParrotDelegate {
  //一切正常。但NorwegianBlueParrot还覆写了plumage属 性，前面两个例子则没有。首先我还是用搬移函数（198） 把plumage函数搬到委托类中，这一步不难，不过需要修改构 造函数，放入对Bird对象的反向引用
  get airSpeedVelocity() {
    return this._isNailed ? 0 : 10 + this._voltage / 10;
  }
  get plumage() {
    if (this._voltage > 100) return "scorched";
    else return this._bird._plumage || "beautiful";
  }
  constructor(data, bird) {
    this._bird = bird;
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }
}

class Bird {
  selectSpeciesDelegate(data) {
    switch (data.type) {
      case "EuropeanSwallow":
        return new EuropeanSwallowDelegate();
      case "AfricanSwallow":
        return new AfricanSwallowDelegate(data);
      case "NorweigianBlueParrot":
        return new NorwegianBlueParrotDelegate(data, this);
      default:
        return null;
    }
  }
  //麻烦之处在于如何去掉子类中的plumage函数。如果我像 下面这么干就会得到一大堆错误，因为其他品种的委托类没 有plumage这个属性。
  get plumage() {
    if (this._speciesDelegate) return this._speciesDelegate.plumage;
    else return this._plumage || "average";
  }
  //我可以做一个更明确的条件分发：
  get plumage() {
    if (this._speciesDelegate instanceof NorwegianBlueParrotDelegate)
      return this._speciesDelegate.plumage;
    else return this._plumage || "average";
  }
  //另一个办法是在其他委托类中实现默认的行为。
  get plumage() {
    if (this._speciesDelegate) return this._speciesDelegate.plumage;
    else return this._plumage || "average";
  }
}
class EuropeanSwallowDelegate {
  get plumage() {
    return this._bird._plumage || "average";
  }
}

class AfricanSwallowDelegate {
  get plumage() {
    return this._bird._plumage || "average";
  }
}

//解决重复的办法，很自然，就是继承——用提炼超类 （375）从各个代理类中提炼出一个共同继承的超类
//有了共同的超类以后，就可以把SpeciesDelegate字段默 认设置为这个超类的实例，并把Bird类中的默认行为搬移 到SpeciesDelegate超类中

class Bird {
  selectSpeciesDelegate(data) {
    switch (data.type) {
      case "EuropeanSwallow":
        return new EuropeanSwallowDelegate(data, this);
      case "AfricanSwallow":
        return new AfricanSwallowDelegate(data, this);
      case "NorweigianBlueParrot":
        return new NorwegianBlueParrotDelegate(data, this);
      default:
        return new SpeciesDelegate(data, this);
    }
  } // rest of bird’s code...
  get plumage() {
    return this._speciesDelegate.plumage;
  }
  get airSpeedVelocity() {
    return this._speciesDelegate.airSpeedVelocity;
  }
}

//我喜欢这种办法，因为它简化了Bird类中的委托函数。 我可以一目了然地看到哪些行为已经被委托给 SpeciesDelegate，哪些行为还留在Bird类中。
//几个类最终的状态如下

function createBird(data) {
  return new Bird(data);
}
class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
    this._speciesDelegate = this.selectSpeciesDelegate(data);
  }
  get name() {
    return this._name;
  }
  get plumage() {
    return this._speciesDelegate.plumage;
  }
  get airSpeedVelocity() {
    return this._speciesDelegate.airSpeedVelocity;
  }
  selectSpeciesDelegate(data) {
    switch (data.type) {
      case "EuropeanSwallow":
        return new EuropeanSwallowDelegate(data, this);
      case "AfricanSwallow":
        return new AfricanSwallowDelegate(data, this);
      case "NorweigianBlueParrot":
        return new NorwegianBlueParrotDelegate(data, this);
      default:
        return new SpeciesDelegate(data, this);
    }
  } // rest of bird’s code...
}
class SpeciesDelegate {
  constructor(data, bird) {
    this._bird = bird;
  }
  get plumage() {
    return this._bird._plumage || "average";
  }
  get airSpeedVelocity() {
    return null;
  }
}
class EuropeanSwallowDelegate extends SpeciesDelegate {
  get airSpeedVelocity() {
    return 35;
  }
}
class AfricanSwallowDelegate extends SpeciesDelegate {
  constructor(data, bird) {
    super(data, bird);
    this._numberOfCoconuts = data.numberOfCoconuts;
  }
  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts;
  }
}
class NorwegianBlueParrotDelegate extends SpeciesDelegate {
  constructor(data, bird) {
    super(data, bird);
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }
  get airSpeedVelocity() {
    return this._isNailed ? 0 : 10 + this._voltage / 10;
  }
  get plumage() {
    if (this._voltage > 100) return "scorched";
    else return this._bird._plumage || "beautiful";
  }
}
