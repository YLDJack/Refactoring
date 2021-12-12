//创建演出计算器

//enrichPerformance函数是关键所在，因为正是它用每场
//演出的数据来填充中转数据结构。
//目前它直接调用了计算价 格和观众量积分的函数，
//我需要创建一个类，通过这个类来 调用这些函数。由于这个类存放了与每场演出相关数据的计 算函数，于是我把它称为演出计算器（performance calculator）。
function enrichPerformance(aPerformance) {
  const calculator = new PerformanceCalculator(aPerformance);
  const result = Object.assign({}, aPerformance);
  result.play = playFor(result);
  result.amount = amountFor(result);
  result.volumeCredits = volumeCreditsFor(result);
  return result;
}

class PerformanceCalculator {
  constructor(aPerformance) {
    this.performance = aPerformance;
  }
}

//到目前为止，这个新对象还没做什么事。我希望将函数 行为搬移进来，这可以从最容易搬移的东西——play字段开 始
//严格来讲，我不需要搬移这个字段，因为它并未体现出多态性，但这样可以把所有数据转换集中到一处地方，保证 了代码的一致性和清晰度

//为此，我将使用改变函数声明（124）手法 将performance的play字段传给计算器
function enrichPerformance(aPerformance) {
  const calculator = new PerformanceCalculator(
    aPerformance,
    playFor(aPerformance)
  );
  const result = Object.assign({}, aPerformance);
  result.play = calculator.play;
  result.amount = amountFor(result);
  result.volumeCredits = volumeCreditsFor(result);
  return result;
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  //将函数搬移进计算器

  //我要搬移的下一块逻辑，对计算一场演出的价格 （amount）来说就尤为重要了。
  //在调整嵌套函数的层级 时，我经常将函数挪来挪去，
  //但接下来需要改动到更深入的 函数上下文，因此我将小心使用搬移函数（198）来重构 它。
  //首先，将amount函数的逻辑复制一份到新的上下文中， 也就是PerformanceCalculator类中。
  //然后微调一下代码， 将aPerformance改为this.performance， 将playFor(aPerformance)改为this.play，使代码适应这个新家。

  get amount() {
    let result = 0;
    switch (this.play.type) {
      case "tragedy":
        result = 40000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (this.performance.audience > 20) {
          result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;
      default:
        throw new Error(`unknown type: ${this.play.type}`);
    }
    return result;
  }

  // //搬移观众量积分计算也遵循同样的流程
  // get volumeCredits() {
  //   let result = 0;
  //   result += Math.max(this.performance.audience - 30, 0);
  //   if ("comedy" === this.play.type)
  //     result += Math.floor(this.performance.audience / 5);
  //   return result;
  // }

  //下一个要替换的条件表达式是观众量积分的计算。
  //我回 顾了一下前面关于未来戏剧类型的讨论，发现大多数剧类在 计算积分时都会检查观众数是否达到30，
  //仅一小部分品类有 所不同。因此，将更为通用的逻辑放到超类作为默认条件，
  //出现特殊场景时按需覆盖它，听起来十分合理。于是我将一 部分喜剧的逻辑下移到子类
  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

//使新函数适应新家后，我会将原来的函数改造成一个委 托函数，让它直接调用新函数
function amountFor(aPerformance) {
  return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
}

//搬移观众量积分计算也遵循同样的流程
function enrichPerformance(aPerformance) {
  const calculator = createPerformanceCalculator(
    aPerformance,
    playFor(aPerformance)
  );
  const result = Object.assign({}, aPerformance);
  result.play = calculator.play;
  result.amount = calculator.amount;
  result.volumeCredits = calculator.volumeCredits;
  return result;
}

function createPerformanceCalculator(aPerformance, aPlay) {
  //return new PerformanceCalculator(aPerformance, aPlay);

  //改造成普通函数后，我就可以在里面创建演出计算器的 子类，然后由创建函数决定返回哪一个子类的实例。
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`unknown type: ${aPlay.type}`);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}
class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  //下一个要替换的条件表达式是观众量积分的计算。
  //我回 顾了一下前面关于未来戏剧类型的讨论，发现大多数剧类在 计算积分时都会检查观众数是否达到30，
  //仅一小部分品类有 所不同。因此，将更为通用的逻辑放到超类作为默认条件，
  //出现特殊场景时按需覆盖它，听起来十分合理。于是我将一 部分喜剧的逻辑下移到子类

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}
