//有一个函数，用于判断顾客（customer）是不 是来自新英格兰（New England）地区
function inNewEngland(aCustomer) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(aCustomer.address.state);
}

const newEnglanders = someCustomers.filter((c) => inNewEngland(c));

//inNewEngland函数只用到了顾客所在的州（state）这项 信息，基于这个信息来判断顾客是否来自新英格兰地区。我 希望重构这个函数，使其接受州代码（state code）作为 参数，这样就能去掉对“顾客”概念的依赖，
//使这个函数能 在更多的上下文中使用

//在使用改变函数声明时，我通常会先运用提炼函数 （106），但在这里我会先对函数体做一点重构，使后面的 重构步骤更简单。
//我先用提炼变量（119）提炼出我想要的 新参数：

function inNewEngland(aCustomer) {
  const stateCode = aCustomer.address.state;
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

//然后再用提炼函数（106）创建新函数
function inNewEngland(aCustomer) {
  const stateCode = aCustomer.address.state;
  return xxNEWinNewEngland(stateCode);
}
//给新函数起一个好记又独特的临时名字，这样回头 要改回原来的名字时也会简单一些。
function xxNEWinNewEngland(stateCode) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

//在源函数中使用内联变量（123），把刚才提炼出 来的参数内联回去
function inNewEngland(aCustomer) {
  return xxNEWinNewEngland(aCustomer.address.state);
}

//然后我会用内联函数（115）把旧函数内联到调用处， 其效果就是把旧函数的调用处改为调用新函数。我可以每次 修改一个调用处
const newEnglanders = someCustomers.filter(c => xxNEWinNewEngland(c.address.state) );

//旧函数被内联到各调用处之后，我就再次使用改变函数 声明，把新函数改回旧名字：
const newEnglanders = someCustomers.filter(c => inNewEngland(c.address.state));

//顶层作用域
function inNewEngland(stateCode) { return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode); }

//自动化重构工具减少了迁移式做法的用武之地，同时也 使迁移式做法更加高效。自动化重构工具可以安全地处理相 当复杂的改名、参数变更等情况，所以迁移式做法的用武之 地就变少了，因为自动化重构工具经常能提供足够的支持。 如果遇到类似这里的例子，尽管工具无法自动完成整个重 构，还是可以更快、更安全地完成关键的提炼和内联步骤， 从而简化整个重构过程。