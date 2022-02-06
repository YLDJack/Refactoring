//如果变量的作用域不止于单个函数，问题就会出现。代 码库的各处可能有很多地方使用它
let tpHd = "untitled";
//有些地方是在读取变量值：
result += `<h1>${tpHd}</h1>`;
//另一些地方则更新它的值：
tpHd = obj["articleTitle"];
//对于这种情况，我通常的反应是运用封装变量 （132）：
result += `<h1>${title()}</h1>`;
setTitle(obj["articleTitle"]);
function title() {
  return tpHd;
}
function setTitle(arg) {
  tpHd = arg;
}
//现在就可以给变量改名：
let _title = "untitled";
function title() {
  return _title;
}
function setTitle(arg) {
  _title = arg;
}

//给常量改名
//如果我想改名的是一个常量（或者在客户端看来就像是 常量的元素），我可以复制这个常量，这样既不需要封装， 又可以逐步完成改名。假如原来的变量声明是这样：
const cpyNm = "Acme Gooseberries";

//改名的第一步是复制这个常量：
const companyName = "Acme Gooseberries";
const cpyNm = companyName;

//有了这个副本，我就可以逐一修改引用旧常量的代码，
//使其引用新的常量。全部修改完成后，我会删掉旧的常量。 
//我喜欢先声明新的常量名，然后把新常量复制给旧的名字。 
//这样最后删除旧名字时会稍微容易一点，如果测试失败，再 把旧常量放回来也稍微容易一点。 
//这个做法不仅适用于常量，也同样适用于客户端只能读 取的变量（例如JavaScript模块中导出的变量）