//更新数据
customerData[customerID].usages[year][month] = amount;
//读取数据
function compareUsage(customerID, laterYear, month) {
  const later = customerData[customerID].usages[laterYear][month];
  const earlier = customerData[customerID].usages[laterYear - 1][month];
  return { laterAmount: later, change: later - earlier };
}

//对这样的数据施行封装，第一步仍是封装变量 （132）
function getRawDataOfCustomers() {
  return customerData;
}
function setRawDataOfCustomers(arg) {
  customerData = arg;
}

//封装大型的数据结构时，我会更多关注更新操作。凸显 更新操作，并将它们集中到一处地方，是此次封装过程最重 要的一部分
//一通替换过后，我可能认为修改已经告一段落，但如何 确认替换是否真正完成了呢？检查的办法有很多，比如可以 修改getRawDataOfCustomers函数，让其返回一份数据的深复 制的副本。如果测试覆盖足够全面，那么当我真的遗漏了一 些更新点时，测试就会报错。
get rawData() { return _.cloneDeep(this._data); }
//如果客户端想拿到一份数据结构，我大可以直接将实际 的数据交出去。但这样做的问题在于，我将无从阻止用户直 接对数据进行修改，进而使我们封装所有更新操作的良苦用 心失去意义。最简单的应对办法是返回原始数据的一份副 本，这可以用到我前面写的rawData方法
