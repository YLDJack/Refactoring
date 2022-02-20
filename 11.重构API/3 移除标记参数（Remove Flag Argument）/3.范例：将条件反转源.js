function adjustedCapital(anInstrument) {
  let result = 0;
  if (anInstrument.capital > 0) {
    if (anInstrument.interestRate > 0 && anInstrument.duration > 0) {
      result =
        (anInstrument.income / anInstrument.duration) *
        anInstrument.adjustmentFactor;
    }
  }
  return result;
}

//同样地，我逐一进行替换。不过这次在插入卫语句时， 我需要将相应的条件反转过来：
function adjustedCapital(anInstrument) {
  let result = 0;
  if (anInstrument.capital <= 0) return result;
  //下一个条件稍微复杂一点，所以我分两步进行反转。首 先加入一个逻辑非操作
  if (anInstrument.interestRate > 0 && anInstrument.duration > 0) {
    result =
      (anInstrument.income / anInstrument.duration) *
      anInstrument.adjustmentFactor;
  }
  return result;
}

function adjustedCapital(anInstrument) {
  let result = 0;
  if (
    anInstrument.capital <= 0 ||
    anInstrument.interestRate <= 0 ||
    anInstrument.duration <= 0
  )
    return result;
  result =
    (anInstrument.income / anInstrument.duration) *
    anInstrument.adjustmentFactor;
  return result;
}
//此时result变量做了两件事：一开始我把它设为0，代表 卫语句被触发时的返回值；然后又用最终计算的结果给它赋 值。我可以彻底移除这个变量，避免用一个变量承担两重责 任，而且又减少了一个可变变量
function adjustedCapital(anInstrument) {
  if (
    anInstrument.capital <= 0 ||
    anInstrument.interestRate <= 0 ||
    anInstrument.duration <= 0
  )
    return 0;
  return (
    (anInstrument.income / anInstrument.duration) *
    anInstrument.adjustmentFactor
  );
}
