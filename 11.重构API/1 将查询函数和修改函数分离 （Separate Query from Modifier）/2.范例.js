function alertForMiscreant(people) {
  for (const p of people) {
    if (p === "Don") {
      setOffAlarms();
      return "Don";
    }
    if (p === "John") {
      setOffAlarms();
      return "John";
    }
  }
  return "";
}

//首先我复制整个函数，用它的查询部分功能为其命名。
function findMiscreant(people) {
  for (const p of people) {
    if (p === "Don") {
      setOffAlarms();
      return "Don";
    }
    if (p === "John") {
      setOffAlarms();
      return "John";
    }
  }
  return "";
}

//然后在新建的查询函数中去掉副作用。
function findMiscreant(people) {
  for (const p of people) {
    if (p === "Don") {
      return "Don";
    }
    if (p === "John") {
      return "John";
    }
  }
  return "";
}

//然后找到所有原函数的调用者，将其改为调用新建的查 询函数，并在其后调用一次修改函数（也就是原函数）。于 是代码
const found = alertForMiscreant(people);
//改成
const found = findMiscreant(people);
alertForMiscreant(people);

//现在可以从修改函数中去掉所有返回值了。
function alertForMiscreant(people) {
  for (const p of people) {
    if (p === "Don") {
      setOffAlarms();
      return;
    }
    if (p === "John") {
      setOffAlarms();
      return;
    }
  }
  return;
}
