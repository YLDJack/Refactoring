//下面范例中我要计算一个苏格兰布丁运动的距离。在起 点处，静止的苏格兰布丁会受到一个初始力的作用而开始运 动。一段时间后，第二个力作用于布丁，让它再次加速。根 据牛顿第二定律，我可以这样计算布丁运动的距离：

function distanceTravelled(scenario, time) {
  let result;
  let acc = scenario.primaryForce / scenario.mass;
  let primaryTime = Math.min(time, scenario.delay);
  result = 0.5 * acc * primaryTime * primaryTime;
  let secondaryTime = time - scenario.delay;
  if (secondaryTime > 0) {
    let primaryVelocity = acc * scenario.delay;
    //真是个丑陋的小东西。注意观察此例中的acc变量是如 何被赋值两次的。acc变量有两个责任：第一是保存第一个 力造成的初始加速度；第二是保存两个力共同造成的加速 度。这就是我想要分解的东西。
    //在尝试理解变量被如何使用时，如果编辑器能高亮显 示一个符号（symbol）在函数内或文件内出现的所有位 置，会相当便利。大部分现代编辑器都可以轻松做到这一 点
    acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
    result +=
      primaryVelocity * secondaryTime +
      0.5 * acc * secondaryTime * secondaryTime;
  }
  return result;
}

//新变量的名称指出，它只承担原先acc变量的第一个责 任。我将它声明为const，确保它只被赋值一次。然后，我在 原先acc变量第二次被赋值处重新声明acc。现在，重新编译并测试，一切都应该没有问题
function distanceTravelled(scenario, time) {
  let result;
  const primaryAcceleration = scenario.primaryForce / scenario.mass;
  let primaryTime = Math.min(time, scenario.delay);
  result = 0.5 * primaryAcceleration * primaryTime * primaryTime;
  let secondaryTime = time - scenario.delay;
  if (secondaryTime > 0) {
    let primaryVelocity = primaryAcceleration * scenario.delay;
    let acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
    result +=
      primaryVelocity * secondaryTime +
      0.5 * acc * secondaryTime * secondaryTime;
  }
  return result;
}

//然后，我继续处理acc变量的第二次赋值。这次我把原 先的变量完全删掉，代之以一个新变量。新变量的名称指 出，它只承担原先acc变量的第二个责任：
function distanceTravelled(scenario, time) {
  let result;
  const primaryAcceleration = scenario.primaryForce / scenario.mass;
  let primaryTime = Math.min(time, scenario.delay);
  result = 0.5 * primaryAcceleration * primaryTime * primaryTime;
  let secondaryTime = time - scenario.delay;
  if (secondaryTime > 0) {
    let primaryVelocity = primaryAcceleration * scenario.delay;
    const secondaryAcceleration =
      (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
    result +=
      primaryVelocity * secondaryTime +
      0.5 * secondaryAcceleration * secondaryTime * secondaryTime;
  }
  return result;
}
