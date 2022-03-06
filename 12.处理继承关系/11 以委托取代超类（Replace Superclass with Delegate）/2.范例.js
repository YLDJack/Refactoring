class CatalogItem {
  constructor(id, title, tags) {
    this._id = id;
    this._title = title;
    this._tags = tags;
  }
  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  hasTag(arg) {
    return this._tags.includes(arg);
  }
}

//这些古老的卷轴需要日常清扫，因此代表卷轴的Scroll 类继承了代表目录项的CatalogItem类，并扩展出与“需要清 扫”相关的数据

class Scroll extends CatalogItem {
  constructor(id, title, tags, dateLastCleaned) {
    super(id, title, tags);
    this._lastCleaned = dateLastCleaned;
  }
  needsCleaning(targetDate) {
    const threshold = this.hasTag("revered") ? 700 : 1500;
    return this.daysSinceLastCleaning(targetDate) > threshold;
  }
  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}

//把“目录项”作为“卷轴”的超类很可能会把未 来的程序员搞迷糊，因此这是一个糟糕的模型。
//我首先在Scroll类中创建一个属性，令其指向一个新建 的CatalogItem实例。

class Scroll extends CatalogItem {
  constructor(id, title, tags, dateLastCleaned) {
    super(id, title, tags);
    this._catalogItem = new CatalogItem(id, title, tags);
    this._lastCleaned = dateLastCleaned;
  }
}

//然后对于子类中用到所有属于超类的函数，我要逐一为 它们创建转发函数
//最后去除Scroll与CatalogItem之间的继承关系。
class Scroll {
  get id() {
    return this._catalogItem.id;
  }
  get title() {
    return this._catalogItem.title;
  }
  hasTag(aString) {
    return this._catalogItem.hasTag(aString);
  }
  constructor(id, title, tags, dateLastCleaned) {
    this._catalogItem = new CatalogItem(id, title, tags);
    this._lastCleaned = dateLastCleaned;
  }
}

//前面的重构把CatalogItem变成了Scroll的一个组件：每 个Scroll对象包含一个独一无二的CatalogItem对象。在使用 本重构的很多情况下，这样处理就够了。但在这个例子中， 更好的建模方式应该是：关于灰鳞病的一个目录项，对应于 图书馆中的6份卷轴，因为这6份卷轴都是同一个标题。这实 际上是要运用将值对象改为引用对象（256）。 不过在使用将值对象改为引用对象（256）之前，还有 一个问题需要先修好。在原来的继承结构中，Scroll类使用 了CatalogItem类的id字段来保存自己的ID。但如果我把 CatalogItem当作引用来处理，那么透过这个引用获得的ID就 应该是目录项的ID，而不是卷轴的ID。也就是说，我需要
//在Scroll类上添加id字段，在创建Scroll对象时使用这个字 段，而不是使用来自CatalogItem类的id字段。这一步既可以 说是搬移，也可以说是拆分。
class Scroll {
  constructor(id, title, tags, dateLastCleaned) {
    this._id = id;
    //用null作为ID值创建目录项，这种操作一般而言应该触 发警报了，不过这只是我在重构过程中的临时状态，可以暂 时忍受。等我重构完成，多个卷轴会指向一个共享的目录 项，而后者也会有合适的ID。
    this._catalogItem = new CatalogItem(null, title, tags);
    this._lastCleaned = dateLastCleaned;
  }
  get id() {
    return this._id;
  }
}

//当前Scroll对象是从一个加载程序中加载
const scrolls = aDocument.map(
  (record) =>
    new Scroll(
      record.id,
      record.catalogData.title,
      record.catalogData.tags,
      LocalDate.parse(record.lastCleaned)
    )
);

//将值对象改为引用对象（256）的第一步是要找到或者 创建一个仓库对象（repository）。我发现有一个仓库对 象可以很容易地导入加载程序中，这个仓库对象负责提供 CatalogItem对象，并用ID作为索引。我的下一项任务就是要 想办法把这个ID值放进Scroll对象的构造函数。还好，输入 数据中有这个值，不过之前一直被无视了，因为在使用继承 的时候用不着。把这些信息都理清楚，我就可以运用改变函 数声明（124），把整个目录对象以及目录项的ID都作为参 数传给Scroll的构造函数。

const scrolls1 = aDocument.map(
  (record) =>
    new Scroll(
      record.id,
      record.catalogData.title,
      record.catalogData.tags,
      LocalDate.parse(record.lastCleaned),
      record.catalogData.id,
      catalog
    )
);

class Scroll {
  constructor(id, title, tags, dateLastCleaned, catalogID, catalog) {
    this._id = id;
    this._catalogItem = new CatalogItem(null, title, tags);
    this._lastCleaned = dateLastCleaned;
  }
}

//然后修改Scroll的构造函数，用传入的catalogID来查找 对应的CatalogItem对象，并引用这个对象（而不再新建 CatalogItem对象）。
class Scroll {
  constructor(id, title, tags, dateLastCleaned, catalogID, catalog) {
    this._id = id;
    this._catalogItem = catalog.get(catalogID);
    this._lastCleaned = dateLastCleaned;
  }
}

//Scroll的构造函数已经不再需要传入title和tags这两个 参数了，所以我用改变函数声明（124）把它们去掉
const scrolls2 = aDocument.map(
  (record) =>
    new Scroll(
      record.id,
      LocalDate.parse(record.lastCleaned),
      record.catalogData.id,
      catalog
    )
);

class Scroll {
  constructor(id, dateLastCleaned, catalogID, catalog) {
    this._id = id;
    this._catalogItem = catalog.get(catalogID);
    this._lastCleaned = dateLastCleaned;
  }
}
