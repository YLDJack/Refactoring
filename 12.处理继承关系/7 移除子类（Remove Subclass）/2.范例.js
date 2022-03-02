class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  get genderCode() {
    return "X";
  }
}

class Male extends Person {
  get genderCode() {
    return "M";
  }
}
class Female extends Person {
  get genderCode() {
    return "F";
  }
}

//如果子类就干这点儿事，那真的没必要存在。不过，在 移除子类之前，通常有必要检查使用方代码是否有依赖于特 定子类的行为，这样的行为需要被搬移到子类中。在这个例 子里，我找到一些客户端代码基于子类的类型做判断，不过 这也不足以成为保留子类的理由。
const numberOfMales = people.filter((p) => p instanceof Male).length;

//每当想要改变某个东西的表现形式时，我会先将当下的 表现形式封装起来，从而尽量减小对客户端代码的影响。对 于“创建子类对象”而言，封装的方式就是以工厂函数取代 构造函数（334）。在这里，实现工厂有两种方式。

//最直接的方式是为每个构造函数分别创建一个工厂函 数
function createPerson(name) {
  return new Person(name);
}
function createMale(name) {
  return new Male(name);
}
function createFemale(name) {
  return new Female(name);
}

//虽然这是最直接的选择，但这样的对象经常是从输入源 加载出来，直接根据性别代码创建对象。
function loadFromInput(data) {
  const result = [];
  data.forEach((aRecord) => {
    let p;
    switch (aRecord.gender) {
      case "M":
        p = new Male(aRecord.name);
        break;
      case "F":
        p = new Female(aRecord.name);
        break;
      default:
        p = new Person(aRecord.name);
    }
    result.push(p);
  });
  return result;
}

//有鉴于此，我觉得更好的办法是先用提炼函数（106） 把“选择哪个类来实例化”的逻辑提炼成工厂函数
function createPerson(aRecord) {
  let p;
  switch (aRecord.gender) {
    case "M":
      p = new Male(aRecord.name);
      break;
    case "F":
      p = new Female(aRecord.name);
      break;
    default:
      p = new Person(aRecord.name);
  }
  return p;
}
function loadFromInput(data) {
  const result = [];
  data.forEach((aRecord) => {
    result.push(createPerson(aRecord));
  });
  return result;
}

//提炼完工厂函数后，我会对这两个函数做些清理。先用 内联变量（123）简化createPerson函数：
function createPerson(aRecord) {
  switch (aRecord.gender) {
    case "M":
      return new Male(aRecord.name);
    case "F":
      return new Female(aRecord.name);
    default:
      return new Person(aRecord.name);
  }
}

//再用以管道取代循环（231）简化loadFromInput函数：
function loadFromInput(data) {
  return data.map((aRecord) => createPerson(aRecord));
}

//工厂函数封装了子类的创建逻辑，但代码中还有一处用 到instanceof运算符——这从来不会是什么好味道。我用提 炼函数（106）把这个类型检查逻辑提炼出来。
const numberOfMales = people.filter((p) => isMale(p)).length;
function isMale(aPerson) {
  return aPerson instanceof Male;
}

//然后用搬移函数（198）将其移到Person类。

class Person {
  //现在，添加一个字段来表示子类之间的差异。既然有来 自别处的一个类型代码，直接用它也无妨。

  constructor(name, genderCode) {
    this._name = name;
    this._genderCode = genderCode || "X";
  }
  get genderCode() {
    return this._genderCode;
  }
  get isMale() {
    return this instanceof Male;
  }
  //首先从“男性”的情况开始，将相关逻辑折叠到超类 中。为此，首先要修改工厂函数，令其返回一个Person对 象，然后修改所有instanceof检查逻辑，改为使用性别代码 字段。
  //此时我可以测试，删除Male子类，再次测试，然后对Female子类也如法炮制
  get isMale() {
    return "M" === this._genderCode;
  }
}

function createPerson(aRecord) {
  switch (aRecord.gender) {
    case "M":
      return new Person(aRecord.name, "M");
    case "F":
      return new Person(aRecord.name, "F");
    default:
      return new Person(aRecord.name, "X");
  }
}

const numberOfMales = people.filter((p) => p.isMale).length;
