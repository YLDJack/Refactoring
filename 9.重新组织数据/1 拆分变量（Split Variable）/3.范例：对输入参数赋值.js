//另一种情况是，变量是以输入参数的形式声明又在函数 内部被再次赋值，此时也可以考虑拆分变量。例如，下列代码：

function discount(inputValue, quantity) {
  if (inputValue > 50) inputValue = inputValue - 2;
  if (quantity > 100) inputValue = inputValue - 1;
  return inputValue;
}

//这里的inputValue有两个用途：它既是函数的输入，也 负责把结果带回给调用方。（由于JavaScript的参数是按 值传递的，所以函数内部对inputValue的修改不会影响调用 方。）
function discount(inputValue, quantity) {
  let result = inputValue;
  if (inputValue > 50) result = result - 2;
  if (quantity > 100) result = result - 1;
  return result;
}

//我修改了第二行代码，把inputValue作为判断条件的基 准数据。虽说这里用inputValue还是result效果都一样，但在 我看来，这行代码的含义是“根据原始输入值做判断，然后 修改结果值”，而不是“根据当前结果值做判断”——尽管 两者的效果恰好一样。