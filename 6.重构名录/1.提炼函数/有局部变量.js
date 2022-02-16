function printOwing(invoice) {
  let outstanding = 0;
  printBanner(); // calculate outstanding

  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  // record due date
  const today = Clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );
  //print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}

//以将“打印详细信息”这一部分提炼为带两个参数 的函数
function printOwing(invoice) {
  let outstanding = 0;
  printBanner();
  // calculate outstanding
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  // record due date
  const today = Clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );
  printDetails(invoice, outstanding);
}
function printDetails(invoice, outstanding) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}

//如果局部变量是一个数据结构（例如数组、记录或者对象），
//而被提炼代码段又修改了这个结构中的数据，
//也可以 如法炮制。所以，“设置到期日”的逻辑也可以用同样的方 式提炼出来
function printOwing(invoice) {
  let outstanding = 0;
  printBanner(); // calculate outstanding
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}
function recordDueDate(invoice) {
  const today = Clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );
}
