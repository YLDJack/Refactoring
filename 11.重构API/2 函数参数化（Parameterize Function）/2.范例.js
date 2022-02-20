function baseCharge(usage) {
  if (usage < 0) return usd(0);
  const amount =
    bottomBand(usage) * 0.03 + middleBand(usage) * 0.05 + topBand(usage) * 0.07;
  return usd(amount);
}
function bottomBand(usage) {
  return Math.min(usage, 100);
}
function middleBand(usage) {
  return usage > 100 ? Math.min(usage, 200) - 100 : 0;
}
function topBand(usage) {
  return usage > 200 ? usage - 200 : 0;
}

//在尝试对几个相关的函数做参数化操作时，我会先从中 挑选一个，在上面添加参数，同时留意其他几种情况。在类 似这样处理“范围”的情况下，通常从位于中间的范围开始 着手较好。所以我首先选择了middleBand函数来添加参数， 然后调整其他的调用者来适应它。

//middleBand使用了两个字面量值，即100和200，分别代 表“中间档次”的下界和上界。我首先用改变函数声明 （124）加上这两个参数，同时顺手给函数改个名，使其更 好地表述参数化之后的含义。

//在函数体内部，把一个字面量改为使用新传入的参数
function withinBand(usage, bottom, top) {
  return usage > bottom ? Math.min(usage, top) - bottom : 0;
}
function baseCharge(usage) {
  if (usage < 0) return usd(0);
  const amount =
    bottomBand(usage) * 0.03 +
    withinBand(usage, 100, 200) * 0.05 +
    topBand(usage) * 0.07;
  return usd(amount);
}

//为了替换对topBand的调用，我就得用代表“无穷大”的 Infinity作为这个范围的上界
function baseCharge(usage) {
  if (usage < 0) return usd(0);
  const amount =
    withinBand(usage, 0, 100) * 0.03 +
    withinBand(usage, 100, 200) * 0.05 +
    withinBand(usage, 200, Infinity) * 0.07;
  return usd(amount);
}
