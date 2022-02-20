//一家提供公共事业服务的公司将自己的服务安装在各个场所（site）

class Site {
  get customer() {
    return this._customer;
  }
  get name() {}
  get billingPlan() {}
  set billingPlan(arg) {}
  get paymentHistory() {}

  //我首先给Customer添加一个函数，用于指示“这个顾客 是否未知”。
  get isUnknown() {
    return false;
  }
}

//浏览整个代码库，我看到有很多使用Site对象的客户端 在处理“顾客未知”的情况，大多数都用了同样的应对方 式
//用"occupant"（居民）作为顾客名，使用基本的计价套 餐，并认为这家顾客没有欠费。到处都在检查这种特例，再
//加上对特例的处理方式高度一致，这些现象告诉我：是时候 使用特例对象（Special Case Object）模式了。

//然后我给“未知的顾客”专门创建一个类。
class UnknownCustomer {
  get isUnknown() {
    return true;
  }
}

//如果有一段代码需要在很多地方做修改（例如我们这里 的“与特例做比对”的代码），我会先对其使用提炼函数 （106）。
function isUnknown(arg) {
  if (!(arg instanceof Customer || arg === "unknown"))
    //我会放一个陷阱，捕捉意料之外的值。如果在重构过 程中我犯了错误，引入了奇怪的行为，这个陷阱会帮我发 现。
    throw new Error(`investigate bad value: <${arg}>`);
  return arg === "unknown";
}

//
let customerName;
if (isUnknown(aCustomer)) customerName = "occupant";
else customerName = aCustomer.name;

//将所有调用处都改为使用isUnknown函数之后，就可以修 改Site类，令其在顾客未知时返回UnknownCustomer对象
class a {
  get customer() {
    return this._customer === "unknown"
      ? new UnknownCustomer()
      : this._customer;
  }
}
