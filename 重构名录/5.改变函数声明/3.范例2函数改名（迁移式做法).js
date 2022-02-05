function circum(radius) {
  return 2 * Math.PI * radius;
}

//按照迁移式做法，我首先要对整个函数体使用提炼函数
function circum(radius) {
  //此时我要执行测试，然后对旧函数使用内联函数 （115）:
  //找出所有调用旧函数的地方，将其改为调用新函数。
  //每次修改之后都可以执行测试，这样我就可以小步前进，
  //每次修改一处调用者。所有调用者都修改完之后，我就可以删除旧函数
  return circumference(radius);
}
function circumference(radius) {
  return 2 * Math.PI * radius;
}
