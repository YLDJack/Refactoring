const organization = { name: "Acme Gooseberries", country: "GB" };

//我想把name改名为title。这个对象被很多地方使用，有 些代码会更新name字段。所以我首先要用封装记录（162） 把这个记录封装起来
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() {
    return this._name;
  }
  set name(aString) {
    this._name = aString;
  }
  get country() {
    return this._country;
  }
  set country(aCountryCode) {
    this._country = aCountryCode;
  }
}
const organization = new Organization({
  name: "Acme Gooseberries",
  country: "GB",
});

//由于已经把输入数据复制到内部数据结构中，现在我需 要将这两个数据结构区分开，以便各自单独处理。我可以另 外定义一个字段，修改构造函数和访问函数，令其使用新字 段。
class Organization {
  constructor(data) {
    this._title = data.name;
    this._country = data.country;
  }
  get name() {
    return this._title;
  }
  set name(aString) {
    this._title = aString;
  }
  get country() {
    return this._country;
  }
  set country(aCountryCode) {
    this._country = aCountryCode;
  }
}

//接下来我就可以在构造函数中使用title字段。
class Organization {
  constructor(data) {
    this._title = data.title !== undefined ? data.title : data.name;
    this._country = data.country;
  }
  get name() {
    return this._title;
  }
  set name(aString) {
    this._title = aString;
  }
  get country() {
    return this._country;
  }
  set country(aCountryCode) {
    this._country = aCountryCode;
  }
}

//现在，构造函数的调用者既可以使用name也可以使 用title（后者的优先级更高）。我会逐一查看所有调用构造 函数的地方，将它们改为使用新名字。
const organization = new Organization({
  title: "Acme Gooseberries",
  country: "GB",
});

//全部修改完成后，就可以在构造函数中去掉对name的支 持，只使用title
class Organization {
  constructor(data) {
    this._title = data.title;
    this._country = data.country;
  }
  get name() {
    return this._title;
  }
  set name(aString) {
    this._title = aString;
  }
  //现在构造函数和内部数据结构都已经在使用新名字了， 接下来我就可以给访问函数改名。这一步很简单，只要对每 个访问函数运用函数改名（124）就行了。
  get title() {
    return this._title;
  }
  set title(aString) {
    this._title = aString;
  }
  get country() {
    return this._country;
  }
  set country(aCountryCode) {
    this._country = aCountryCode;
  }
}
//有些编程语言允许将数据结构声明为不可变。在这种情 况下，我可以把旧字段的值复制到新名字下，逐一修改使用 方代码，然后删除旧字段。对于可变的数据结构，重复数据 会招致灾难；而不可变的数据结构则没有这些麻烦。这也是 大家愿意使用不可变数据的原因
