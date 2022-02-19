class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = new Customer(data.customer); // load other data
    //以这种方式创建的Customer对象是值对象。如果有5个订 单都属于ID为123的顾客，就会有5个各自独立的Customer对 象。对其中一个所做的修改，不会反映在其他几个对象身 上。如果我想增强Customer对象，例如从客户服务获取到了 更多关于顾客的信息，我必须用同样的数据更新所有5个对 象。重复的对象总是会让我紧张——用多个对象代表同一个 实体（例如一名顾客），这会招致混乱。如果Customer对象 是可变的，问题就更加严重，因为各个对象之间的数据可能 不一致。
  }
  get customer() {
    return this._customer;
  }
}

class Customer {
  constructor(id) {
    this._id = id;
  }
  get id() {
    return this._id;
  }
}

//如果我想每次都使用同一个Customer对象，那么就需要 有一个地方存储这个对象。每个应用程序中，存储实体的地 方会各有不同，在最简单的情况下，我会使用一个仓库对象
let _repositoryData;
export function initialize() {
  _repositoryData = {};
  _repositoryData.customers = new Map();
}
export function registerCustomer(id) {
  if (!_repositoryData.customers.has(id))
    _repositoryData.customers.set(id, new Customer(id));
  return findCustomer(id);
}
export function findCustomer(id) {
  return _repositoryData.customers.get(id);
}

//仓库对象允许根据ID注册顾客，并且对于一个ID只会创 建一个Customer对象。有了仓库对象，我就可以修改Order对 象的构造函数来使用它。 在使用本重构手法时，可能仓库对象已经存在了，那么 就可以直接使用它。 下一步是要弄清楚，Order的构造函数如何获得正确的 Customer对象。在这个例子里，这一步很简单，因为输入数 据流中已经包含了顾客的ID。
class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = registerCustomer(data.customer); // load other data
  }
  get customer() {
    return this._customer;
  }
}

//现在，如果我在一条订单中修改了顾客信息，就会同步 反映在该顾客拥有的所有订单中。
//在这个例子里，我在第一个引用该顾客信息的Order对象 中新建了Customer对象。另一个常见的做法是：首先获取一 份包含所有Customer对象的列表，将其填入仓库对象，然后 在读取Order对象时关联到对应的Customer对象。如果这样 做，那么Order对象包含的顾客ID必须指向一个仓库中已有 的Customer对象，否则就表示程序中有错误。 上面的代码还有一个问题：构造函数与一个全局的仓库 对象耦合。全局对象必须小心对待：它们就像强力的药物， 少用一点儿大有益处，用过量就是毒药。如果想解决这个问 题，可以将仓库对象作为参数传递给构造函数。