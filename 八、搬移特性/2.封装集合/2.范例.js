class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }
  get name() {
    return this._name;
  }
  get courses() {
    return this._courses;
  }
  set courses(aList) {
    this._courses = aList;
  }
}
//有些开发者可能觉得这个类已经得到了恰当的封装，毕 竟，所有的字段都被访问函数保护到了。
//但我要指出，对课 程列表的封装还不完整。诚然，对列表整体的任何更新操 作，都能通过设值函数得到控制。
class Course {
  constructor(name, isAdvanced) {
    this._name = name;
    this._isAdvanced = isAdvanced;
  }
  get name() {
    return this._name;
  }
  get isAdvanced() {
    return this._isAdvanced;
  }
  addCourse(aCourse) {
    this._courses.push(aCourse);
  }
  // 现在我来对类实施真正恰当的封装，首先要为类添加两 个方法，为客户端提供“添加课程”和“移除课程”的接 口
  removeCourse(
    aCourse,
    fnIfAbsent = () => {
      throw new RangeError();
    }
  ) {
    const index = this._courses.indexOf(aCourse);
    if (index === -1) fnIfAbsent();
    else this._courses.splice(index, 1);
  }
  //有了单独的添加和移除方法，通常setCourse设值函数就 没必要存在了。若果真如此，我就会使用移除设值函数 （331）移除它。如果出于其他原因，必须提供一个设值方 法作为API，我至少要确保用一份副本给字段赋值，不去修 改通过参数传入的集合。
  set courses(aList) {
    this._courses = aList.slice();
  }
  //这套设施让客户端能够使用正确的修改方法，同时我还 希望能确保所有修改都通过这些方法进行。为达此目的，我 会让取值函数返回一份副本。
  get courses() {
    return this._courses.slice();
  }
}

const basicCourseNames = readBasicCourseNames(filename);
aPerson.courses = basicCourseNames.map((name) => new Course(name, false));

//这就破坏了封装性，因为以此种方式更新列表Person类 根本无从得知。这里仅仅封装了字段引用，而未真正封装字 段的内容。
// 现在我来对类实施真正恰当的封装，首先要为类添加两 个方法，为客户端提供“添加课程”和“移除课程”的接 口
for (const name of readBasicCourseNames(filename)) {
  aPerson.courses.push(new Course(name, false));
}
