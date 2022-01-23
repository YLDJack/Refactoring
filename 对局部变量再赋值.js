function printOwing(invoice) {
  let outstanding = 0;
  printBanner();
  // calculate outstanding
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}

//首先，把变量声明移动到使用处之前。
function printOwing(invoice) {
  printBanner();
  // calculate outstanding
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}

//然后把想要提炼的代码复制到目标函数中。
function printOwing(invoice) {
  printBanner();
  // calculate outstanding
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}
function calculateOutstanding(invoice) {
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  return outstanding;
}

//下一件事是修改原来的代码， 令其调用新函数。新函数返回了修改后的outstanding变量 值，我需要将其存入原来的变量中
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding(invoice);
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}
function calculateOutstanding(invoice) {
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  return outstanding;
}

//在收工之前，我还要修改返回值的名字，使其符合我一 贯的编码风格
//还顺手把原来的outstanding变量声明成const的，令其 在初始化之后不能再次被赋值
function printOwing(invoice) {
  printBanner();
  const outstanding = calculateOutstanding(invoice);
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}
function calculateOutstanding(invoice) {
  let result = 0;
  for (const o of invoice.orders) {
    result += o.amount;
  }
  return result;
}
