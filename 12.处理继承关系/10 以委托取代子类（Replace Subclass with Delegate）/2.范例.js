class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }
  //先来看一处简单的覆写。常规票在演出结束后会有“对 话创作者”环节（talkback），但只在非高峰日提供这项 服务。
  get hasTalkback() {
    return this._show.hasOwnProperty("talkback") && !this.isPeakDay;
  }
  get basePrice() {
    let result = this._show.price;
    if (this.isPeakDay) result += Math.round(result * 0.15);
    return result;
  }
}

//它有一个子类，专门用于预订高级（premium）票，这 个子类要考虑各种附加服务（extra）。\
class PremiumBooking extends Booking {
  constructor(show, date, extras) {
    super(show, date);
    this._extras = extras;
  }
  //PremiumBooking覆写了这个逻辑，任何一天都提供与创 作者的对话。
  get hasTalkback() {
    return this._show.hasOwnProperty("talkback");
  }
  //定价逻辑也是相似的覆写，不过略有不 同：PremiumBooking调用了超类中的方法。
  get basePrice() {
    return Math.round(super.basePrice + this._extras.premiumFee);
  }

  //最后一个例子是PremiumBooking提供了一个超类中没有 的行为。
  get hasDinner() {
    return this._extras.hasOwnProperty("dinner") && !this.isPeakDay;
  }
}

//PremiumBooking类在超类基础上做了好些改变。在这 种“针对差异编程”（programming-by-difference）的 风格中，子类常会覆写超类的方法，有时还会添加只对子类 有意义的新方法。我不打算讨论所有差异点，只选几处有意 思的案例来分析。
//继承在这个例子中工作良好。即使不了解子类，我同样 也可以理解超类的逻辑。子类只描述自己与超类的差异—— 既避免了重复，又清晰地表述了自己引入的差异。

//aBooking.bePremium()这样一个函数。有时我可以新建一个对 象（就好像通过HTTP请求从服务器端加载全新的数据），从 而避免“对象本身升级”的问题。但有时我需要修改数据本 身的结构，而不重建整个数据结构。如果一个Booking对象被 很多地方引用，也很难将其整个替换掉。此时，就有必要允 许在“普通预订”和“高级预订”之间来回转换。 当这样的需求积累到一定程度时，我就该使用以委托取 代子类了。现在客户端直接调用两个类的构造函数来创建不 同的预订

//进行普通预订的客户端
aBooking = new Booking(show, date);

//进行高级预订的客户端
aBooking = new PremiumBooking(show, date, extras);

//去除子类会改变对象创建的方式，所以我要先用以工厂 函数取代构造函数（334）把构造函数封装起来
function createBooking(show, date) {
  return new Booking(show, date);
}
function createPremiumBooking(show, date, extras) {
  return new PremiumBooking(show, date, extras);
}

//然后新建一个委托类。这个类的构造函数参数有两部 分：首先是指向Booking对象的反向引用，随后是只有子类才 需要的那些数据。我需要传入反向引用，是因为子类的几个 函数需要访问超类中的数据。有继承关系的时候，访问这些 数据很容易；而在委托关系中，就得通过反向引用来访问。
class PremiumBookingDelegate {
  constructor(hostBooking, extras) {
    this._host = hostBooking;
    this._extras = extras;
  }
}

//现在可以把新建的委托对象与Booking对象关联起来。 在“创建高级预订”的工厂函数中修改即可。
function createPremiumBooking(show, date, extras) {
  const result = new PremiumBooking(show, date, extras);
  result._bePremium(extras);
  return result;
}

class Booking {
  _bePremium(extras) {
    //_bePremium函数以下划线开头，表示这个函数不应该被 当作Booking类的公共接口。当然，如果最终我们希望允许普 通预订转换成高级预订，这个函数也可以成为公共接口。
    this._premiumDelegate = new PremiumBookingDelegate(this, extras);
  }
  //在超类的函数中添加适 当的分发逻辑，如果有代理对象存在就使用代理对象。这 样，这一步重构就算完成了
  get hasTalkback() {
    return this._premiumDelegate
      ? this._premiumDelegate.hasTalkback
      : this._show.hasOwnProperty("talkback") && !this.isPeakDay;
  }
}
class PremiumBooking {
  get hasTalkback() {
    return this._show.hasOwnProperty("talkback");
  }
  //测试，确保一切正常，然后把子类中的函数删掉：
  get hasTalkback() {
    return this._premiumDelegate.hasTalkback;
  }

  //下一个要处理的是basePrice函数。情况大致相同，但有一点儿小麻烦：子类中调用了超类 中的同名函数
  get basePrice() {
    return this._premiumDelegate
      ? this._premiumDelegate.basePrice
      : this._privateBasePrice;
  }
  get _privateBasePrice() {
    let result = this._show.price;
    if (this.isPeakDay) result += Math.round(result * 0.15);
    return result;
  }
}

class PremiumBookingDelegate {
  //我用搬移函数（198）把子类中的函数搬到委托类中。 为了让它适应新家，原本访问超类中数据的代码，现在要改 为调用_host对象
  get hasTalkback() {
    return this._host._show.hasOwnProperty("talkback");
  }
  //情况大致相同，但有一点儿小麻烦：子类中调用了超类 中的同名函数,把子类的代码移到委托类时，需要继续调 用超类的逻辑——但我不能直接调用this._host.basePrice， 这会导致无穷递归，因为_host对象就是PremiumBooking对象 自己
  //有两个办法来处理这个问题。一种办法是，可以用提炼 函数（106）把“基本价格”的计算逻辑提炼出来，从而把 分发逻辑与价格计算逻辑拆开。（剩下的操作就跟前面的例 子一样了。）
  get basePrice() {
    return Math.round(this._host._privateBasePrice + this._extras.premiumFee);
  }
}
//或者我也可以在Booking类的构造函数中构建它与委托 对象之间的联系。为此，我需要以某种方式告诉构造函 数“这是一个高级预订”：可以通过一个额外的参数，也 可以直接通过extras参数来表示（如果我能确定这个参数 只有高级预订才会用到的话）。不过我还是更愿意在工厂 函数中构建这层联系，因为这样可以把意图表达得更明 确。

//另一种办法是，可以重新定义委托对象中的函数，使其 成为基础函数的扩展
class Booking {
  get basePrice() {
    let result = this._show.price;
    if (this.isPeakDay) result += Math.round(result * 0.15);
    return this._premiumDelegate
      ? this._premiumDelegate.extendBasePrice(result)
      : result;
  }
}

class PremiumBookingDelegate {
  extendBasePrice(base) {
    return Math.round(base + this._extras.premiumFee);
  }
}
