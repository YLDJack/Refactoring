//以下代码会生成一些 关于相片（photo）的HTML
function renderPerson(outStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
  //这个例子中的emitPhotoData函数有两个调用点，每个调 用点的前面都有一行类似的重复代码，用于打印与标题 （title）相关的信息。
  result.push(`<p>title: ${person.photo.title}</p>`);
  result.push(emitPhotoData(person.photo));
  return result.join("\n");
}
function photoDiv(p) {
  //这个例子中的emitPhotoData函数有两个调用点，每个调 用点的前面都有一行类似的重复代码，用于打印与标题 （title）相关的信息。
  return ["<div>", `<p>title: ${p.title}</p>`, emitPhotoData(p), "</div>"].join(
    "\n"
  );
}
function emitPhotoData(aPhoto) {
  const result = [];
  result.push(`<p>location: ${aPhoto.location}</p>`);
  result.push(`<p>date: ${aPhoto.date.toDateString()}</p>`);
  return result.join("\n");
}

//我希望能消除重复，把打印标题的 那行代码搬移到emitPhotoData函数里去
//如果emitPhotoData 只有一个调用点，那我大可直接把代码复制并粘贴过去就完 事，但若调用点不止一个，那我就更倾向于用更安全的手法 小步前进

//1.我先选择其中一个调用点，对其应用提炼函数 （106）。除了我想搬移的语句，我还把emitPhotoData函数 也一起提炼到新函数中
function photoDiv(p) {
  return ["<div>", zznew(p), "</div>"].join("\n");
}
function zznew(p) {
  return [`<p>title: ${p.title}</p>`, emitPhotoData(p)].join("\n");
}

//完成提炼后，我会逐一查看emitPhotoData的其他调用 点，找到该函数与其前面的重复语句，一并换成对新函数的 调用
function renderPerson(outStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
  result.push(zznew(person.photo));
  return result.join("\n");
}

//替换完emitPhotoData函数的所有调用点后，我紧接着应 用内联函数（115）将emitPhotoData函数内联到新函数中
function zznew(p) {
  return [
    `<p>title: ${p.title}</p>`,
    `<p>location: ${p.location}</p>`,
    `<p>date: ${p.date.toDateString()}</p>`,
  ].join("\n");
}

//最后，再对新提炼的函数应用函数改名（124），就大 功告成了。
//同时我会记得调整函数参数的命名，使之与我的编程风 格保持一致
function renderPerson(outStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
  result.push(emitPhotoData(person.photo));
  return result.join("\n");
}
function photoDiv(aPhoto) {
  return ["<div>", emitPhotoData(aPhoto), "</div>"].join("\n");
}
function emitPhotoData(aPhoto) {
  return [
    `<p>title: ${aPhoto.title}</p>`,
    `<p>location: ${aPhoto.location}</p>`,
    `<p>date: ${aPhoto.date.toDateString()}</p>`,
  ].join("\n");
}
