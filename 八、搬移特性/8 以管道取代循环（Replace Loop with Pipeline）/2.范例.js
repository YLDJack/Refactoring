//在这个例子中，我们有一个CSV文件，里面存有各个办公室（office）的一些数据。下面这个acquireData函数的作用是从数据中筛选出印度 的所有办公室，并返回办公室所在的城市（city）信息和联 系电话（telephone number）。
function acquireData(input) {
  const lines = input.split("\n");
  let firstLine = true;
  const result = [];
  for (const line of lines) {
    if (firstLine) {
      firstLine = false;
      continue;
    }
    if (line.trim() === "") continue;
    const record = line.split(",");
    if (record[1].trim() === "India") {
      result.push({ city: record[0].trim(), phone: record[2].trim() });
    }
  }
  return result;
}

//用管道取代后
function acquireData(input) {
  const lines = input.split("\n");
  return lines
    .slice(1)
    .filter((line) => line.trim() !== "")
    .map((line) => line.split(","))
    .filter((fields) => fields[1].trim() === "India")
    .map((fields) => ({ city: fields[0].trim(), phone: fields[2].trim() }));
}
