const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (!aPlan.withinRange(low, high))
  alerts.push("room temperature went outside range");

//我要先对代码做一些整理，以便用提炼函数（106）来 创建新函数。目前的调用者代码还不具备可提炼的函数雏 形，不过我可以先做几次提炼变量（119），使其轮廓显现 出来。首先，我要把对旧函数的调用从条件判断中解放出来
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
const isWithinRange = aPlan.withinRange(low, high);
if (!isWithinRange) alerts.push("room temperature went outside range");

//然后把输入参数也提炼出来
const tempRange = aRoom.daysTempRange;
const low = tempRange.low;
const high = tempRange.high;
const isWithinRange = aPlan.withinRange(low, high);
if (!isWithinRange) alerts.push("room temperature went outside range");

//完成这一步之后，就可以用提炼函数（106）来创建新 函数。
const tempRange = aRoom.daysTempRange;
const isWithinRange = xxNEWwithinRange(aPlan, tempRange);
if (!isWithinRange) alerts.push("room temperature went outside range");

//顶层作用域
function xxNEWwithinRange(aPlan, tempRange) {
  const low = tempRange.low;
  const high = tempRange.high;
  const isWithinRange = aPlan.withinRange(low, high);
  return isWithinRange;
}

//由于旧函数属于另一个上下文（HeatingPlan类），我需 要用搬移函数（198）把新函数也搬过去。

const tempRange = aRoom.daysTempRange;
const isWithinRange = aPlan.xxNEWwithinRange(tempRange);
if (!isWithinRange) alerts.push("room temperature went outside range");

class HeatingPlan {
  xxNEWwithinRange(tempRange) {
    const low = tempRange.low;
    const high = tempRange.high;
    const isWithinRange = this.withinRange(low, high);
    return isWithinRange;
  }
}

//剩下的过程就跟前面一样了：替换其他调用者，然后把 旧函数内联到新函数中。重构刚开始的时候，为了清晰分离 函数调用，以便提炼出新函数，我提炼了几个变量出来，现 在可以把这些变量也内联回去。