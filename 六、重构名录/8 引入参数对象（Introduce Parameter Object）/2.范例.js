const station = {
  name: "ZB1",
  readings: [
    { temp: 47, time: "2016-11-10 09:10" },
    { temp: 53, time: "2016-11-10 09:20" },
    { temp: 58, time: "2016-11-10 09:30" },
    { temp: 53, time: "2016-11-10 09:40" },
    { temp: 51, time: "2016-11-10 09:50" },
  ],
};

//下面的函数负责找到超出指定范围的温度读数：
function readingsOutsideRange(station, min, max) {
  return station.readings.filter((r) => r.temp < min || r.temp > max);
}

//调用方
alerts = readingsOutsideRange(
  station,
  operatingPlan.temperatureFloor,
  operatingPlan.temperatureCeiling
);

//请注意，这里的调用代码从另一个对象中抽出两项数 据，转手又把这一对数据传递给readingsOutsideRange。
//代 表“运作计划”的operatingPlan对象用了另外的名字来表示 温度范围的下限和上限，
//与readingsOutsideRange中所用的名 字不同。像这样用两项各不相干的数据来表示一个范围的情 况并不少见，
//最好是将其组合成一个对象。我会首先为要组合的数据声明一个类：

class NumberRange {
  constructor(min, max) {
    this._data = { min: min, max: max };
  }
  get min() {
    return this._data.min;
  }
  get max() {
    return this._data.max;
  }
}

//我声明了一个类，而不是基本的JavaScript对象，因 为这个重构通常只是一系列重构的起点，随后我会把行为搬 移到新建的对象中。既然类更适合承载数据与行为的组合， 我就直接从声明一个类开始。同时，在这个新类中，我不会 提供任何更新数据的函数，因为我有可能将其处理成值对象 （Value Object）[mf-vo]。在使用这个重构手法时，大 多数情况下我都会创建值对象。 然后我会运用改变函数声明（124），把新的对象作为 参数传给readingsOutsideRange。
function readingsOutsideRange(station, min, max, range) {
  return station.readings.filter((r) => r.temp < min || r.temp > max);
}

//在JavaScript中，此时我不需要修改调用方代码，但 在其他语言中，我必须在调用处为新参数传入null值，就像 下面这样。
alerts = readingsOutsideRange(
  station,
  operatingPlan.temperatureFloor,
  operatingPlan.temperatureCeiling,
  null
);

//到目前为止，我还没有修改任何行为，所以测试应该仍 然能通过。随后，我会挨个找到函数的调用处，传入合适的 温度范围。
const range = new NumberRange(
  operatingPlan.temperatureFloor,
  operatingPlan.temperatureCeiling
);
alerts = readingsOutsideRange(
  station,
  operatingPlan.temperatureFloor,
  operatingPlan.temperatureCeiling,
  range
);

//这项重构手法到这儿就完成了。不过，将一堆参数替换 成一个真正的对象，这只是长征第一步。创建一个类是为了
//把行为搬移进去。在这里，我可以给“范围”类添加一个函 数，用于测试一个值是否落在范围之内。
const range = new NumberRange(
  operatingPlan.temperatureFloor,
  operatingPlan.temperatureCeiling
);
alerts = readingsOutsideRange(station, range);

function readingsOutsideRange(station, range) {
  return station.readings.filter((r) => !range.contains(r.temp));
}

contains(arg) {return (arg >= this.min && arg <= this.max);}
