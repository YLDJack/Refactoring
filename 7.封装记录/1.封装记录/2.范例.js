const organization = { name: "Acme Gooseberries", country: "GB" };

result += `<h1>${organization.name}</h1>`;
organization.name = newName;

//重构的第一步很简单，先施展一下封装变量（132）。
function getRawDataOfOrganization() {
  return organization;
}

result += `<h1>${getRawDataOfOrganization().name}`;
getRawDataOfOrganization().name = newName;

//这里施展的不全是标准的封装变量（132）手法，我刻 意为设值函数取了一个又丑又长、容易搜索的名字，因为我有意不让它在这次重构中活得太久。
//封装记录意味着，仅仅替换变量还不够，我还想控制它 的使用方式。我可以用类来替换记录，从而达到这一目的。

class Organization {
  constructor(data) {
    this._data = data;
  }
}

const organization = new Organization({
  name: "Acme Gooseberries",
  country: "GB",
});
function getRawDataOfOrganization() {
  return organization._data;
}
function getOrganization() {
  return organization;
}
//创建完对象后，我就能开始寻找该记录的使用点了。
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() {
    return this._name;
  }
  //所 有更新记录的地方，用一个设值函数来替换它
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
//这样做有一个好处，能够使外界无须再引用原始的数据 记录。直接持有原始的记录会破坏封装的完整性。但有时也
//可能不适合将对象展开到独立的字段里，此时我就会先 将_data复制一份，再进行赋值。