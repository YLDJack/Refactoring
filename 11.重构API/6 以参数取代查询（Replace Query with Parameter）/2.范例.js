class HeatingPlan {
  get targetTemperature() {
    if (thermostat.selectedTemperature > this._max) return this._max;
    else if (thermostat.selectedTemperature < this._min) return this._min;
    else return thermostat.selectedTemperature;
  }
}
//调用方...
if (thePlan.targetTemperature > thermostat.currentTemperature) setToHeat();
else if (thePlan.targetTemperature < thermostat.currentTemperature) setToCool();
else setOff();

//系统的温控计划规则抑制了我的要求，作为这样一个系 统的用户，我可能会感到很烦恼。不过作为程序员，我更担 心的是targetTemperature函数依赖于全局的thermostat对象。 我可以把需要这个对象提供的信息作为参数传入，从而打破 对该对象的依赖。

class HeatingPlan {
  get targetTemperature() {
    ////首先，我要用提炼变量（119）把“希望作为参数传入 的信息”提炼出来。
    const selectedTemperature = thermostat.selectedTemperature;
    if (selectedTemperature > this._max) return this._max;
    else if (selectedTemperature < this._min) return this._min;
    else return selectedTemperature;
  }
  //这样可以比较容易地用提炼函数（106）把整个函数体 提炼出来，只剩“计算参数值”的逻辑还在原地
  xxNEWtargetTemperature(selectedTemperature) {
    if (selectedTemperature > this._max) return this._max;
    else if (selectedTemperature < this._min) return this._min;
    else return selectedTemperature;
  }

  //然后把刚才提炼出来的变量内联回去，于是旧函数就只 剩一个简单的调用
  get targetTemperature() {
    return this.xxNEWtargetTemperature(thermostat.selectedTemperature);
  }
}

//现在可以对其使用内联函数（115）。
if (
  thePlan.xxNEWtargetTemperature(thermostat.selectedTemperature) >
  thermostat.currentTemperature
)
  setToHeat();
else if (
  thePlan.xxNEWtargetTemperature(thermostat.selectedTemperature) <
  thermostat.currentTemperature
)
  setToCool();
else setOff();

//再把新函数改名，用回旧函数的名字。得益于之前给它 起了一个容易搜索的名字，现在只要把前缀去掉就行。

if (
  thePlan.targetTemperature(thermostat.selectedTemperature) >
  thermostat.currentTemperature
)
  setToHeat();
else if (
  thePlan.targetTemperature(thermostat.selectedTemperature) <
  thermostat.currentTemperature
)
  setToCool();
else setOff();

class HeatingPlan {
  targetTemperature(selectedTemperature) {
    if (selectedTemperature > this._max) return this._max;
    else if (selectedTemperature < this._min) return this._min;
    else return selectedTemperature;
  }
}

