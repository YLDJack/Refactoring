//全局变量中保存了一些有用的数据
let defaultOwner = { firstName: "Martin", lastName: "Fowler" };
//使用它的代码平淡无奇
spaceship.owner = defaultOwner;
//更新这段数据的代码
defaultOwner = { firstName: "Rebecca", lastName: "Parsons" };

//首先我要定义读取和写入这段数据的函数，给它做个基 础的封装。
function getDefaultOwner() {
  return defaultOwner;
}
function setDefaultOwner(arg) {
  defaultOwner = arg;
}

//然后就开始处理使用defaultOwner的代码。每看见一处 引用该数据的代码，就将其改为调用取值函数
spaceship.owner = getDefaultOwner();

//每看见一处给变量赋值的代码，就将其改为调用设值函 数。
setDefaultOwner({ firstName: "Rebecca", lastName: "Parsons" });

//每次替换之后，执行测试。 处理完所有使用该变量的代码之后，我就可以限制它的 可见性。这一步的用意有两个，一来是检查是否遗漏了变量 的引用，二来可以保证以后的代码也不会直接访问该变量。
//在JavaScript中，我可以把变量和访问函数搬移到单独一 个文件中，并且只导出访问函数，这样就限制了变量的可见 性。
//defaultOwner.js...
let defaultOwner = { firstName: "Martin", lastName: "Fowler" };
export function getDefaultOwner() {
  return defaultOwner;
}
export function setDefaultOwner(arg) {
  defaultOwner = arg;
}

//如果条件不允许限制对变量的访问，可以将变量改名， 然后再次执行测试，检查是否仍有代码在直接使用该变量。 这阻止不了未来的代码直接访问变量，不过可以给变量起个
//有意义又难看的名字（例如__privateOnly_defaultOwner）， 提醒后来的客户端。 我不喜欢给取值函数加上get前缀，所以我对这个函数 改名。
//我不喜欢给取值函数加上get前缀，所以我对这个函数 改名
let defaultOwnerData = { firstName: "Martin", lastName: "Fowler" };
export function getDefaultOwner() {
  return defaultOwnerData;
}
export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}

//前面的基本重构手法只封装了对最外层数据的引用。很 多时候这已经足够了。但也有很多时候，我需要把封装做得 更深入，不仅控制对变量引用的修改，还要控制对变量内容 的修改。这有两个办法可以做到。
//最简单的办法是禁止对数据结 构内部的数值做任何修改。

let defaultOwnerData = { firstName: "Martin", lastName: "Fowler" };
export function defaultOwner() {
  ////我最喜欢的一种做法是修改取值函数，使其返回该数据的一份副本。
  return Object.assign({}, defaultOwnerData);
}
export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}
//对于列表数据，我尤其常用这一招。如果我在取值函数 中返回数据的一份副本，客户端可以随便修改它，
//但不会影 响到共享的这份数据。但在使用副本的做法时，我必须格外小心：
//有些代码可能希望能修改共享的数据。若果真如此， 我就只能依赖测试来发现问题了。
//另一种做法是阻止对数据的修改，比如通过封装记录（162）就能很好地实现这一效果
let defaultOwnerData = {firstName: "Martin", lastName: "Fowler"}; 
export function defaultOwner() {return new Person(defaultOwnerData);} 
export function setDefaultOwner(arg) {defaultOwnerData = arg;} 
class Person { constructor(data) { this._lastName = data.lastName; this._firstName = data.firstName }
get lastName() {return this._lastName;} 
get firstName() {return this._firstName;} 
// and so on for other properties