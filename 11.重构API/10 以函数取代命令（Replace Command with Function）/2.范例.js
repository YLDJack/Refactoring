class ChargeCalculator {
  constructor(customer, usage, provider) {
    this._customer = customer;
    this._usage = usage;
    this._provider = provider;
  }
  get baseCharge() {
    return this._customer.baseRate * this._usage;
  }
  get charge() {
    return this.baseCharge + this._provider.connectionCharge;
  }
}

//调用方

monthCharge = new ChargeCalculator(customer, usage, provider).charge;

//命令类足够小、足够简单，变成函数更合适
//首先，我用提炼函数（106）把命令对象的创建与调用 过程包装到一个函数中。

monthCharge = charge(customer, usage, provider);

function charge(customer, usage, provider) {
  return new ChargeCalculator(customer, usage, provider).charge;
}

//接下来要考虑如何处理支持函数（也就是这里的 baseCharge函数）。对于有返回值的函数，我一般会先用提 炼变量（119）把返回值提炼出来

class ChargeCalculator {
  get baseCharge() {
    return this._customer.baseRate * this._usage;
  }
  //然后对支持函数使用内联函数（115）。
  get charge() {
    const baseCharge = this._customer.baseRate * this._usage;
    return baseCharge + this._provider.connectionCharge;
  }
  //现在所有逻辑处理都集中到一个函数了，下一步是把构 造函数传入的数据移到主函数。首先用改变函数声明 （124）把构造函数的参数逐一添加到charge函数上。
  constructor(customer, usage, provider) {
    this._customer = customer;
    this._usage = usage;
    this._provider = provider;
  }
  charge(customer, usage, provider) {
    const baseCharge = this._customer.baseRate * this._usage;
    return baseCharge + this._provider.connectionCharge;
  }
}

//现在我就可以把所有逻辑都内联到顶层的charge函数 中。这是内联函数（115）的一种特殊情况，我需要把构造函数和执行函数一并内联。
//现在命令类已经是死代码了，可以用移除死代码 （237）给它一个体面的葬礼
function charge(customer, usage, provider) {
  const baseCharge = customer.baseRate * usage;
  return baseCharge + provider.connectionCharge;
}
