function statement(invoice, plays) {
  return renderPlainText(invoice, plays);
}
function renderPlainText(invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    } s eats)\n`;
  }
  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  // function totalAmount() {...}
  // function totalVolumeCredits() {...}
  // function usd(aNumber) {...}
  // function volumeCreditsFor(aPerformance) {...}
  // function playFor(aPerformance) {...}
  // function amountFor(aPerformance) {...}
}

//编译、测试、提交，接着创建一个对象，作为在两个阶 段间传递的中转数据结构，
//然后将它作为第一个参数传递给 renderPlainText（然后编译、测试、提交）。
function statement(invoice, plays) {
  const statementData = {};
  return renderPlainText(statementData, invoice, plays);
}
function renderPlainText(data, invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    } s eats)\n`;
  }
  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  // function totalAmount() {...}
  // function totalVolumeCredits() {...}
  // function usd(aNumber) {...}
  // function volumeCreditsFor(aPerformance) {...}
  // function playFor(aPerformance) {...}
  // function amountFor(aPerformance) {...}
}

//第一步是将顾客（customer）字段添加到中转对象里 （编译、测试、提交）。
function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  return renderPlainText(statementData, invoice, plays);
}
function renderPlainText(data, invoice, plays) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    } s eats)\n`;
  }
  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;
}

//我将performances字段也搬移过去，这样我就可以移除 掉renderPlainText的invoice参数（编译、测试、提交）。
function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances;
  return renderPlainText(statementData, invoice, plays);
}
function renderPlainText(data, plays) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    } s eats)\n`;
  }
  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;
}

function totalAmount() {
  let result = 0;
  for (let perf of data.performances) {
    result += amountFor(perf);
  }
  return result;
}
function totalVolumeCredits() {
  let result = 0;
  for (let perf of data.performances) {
    result += volumeCreditsFor(perf);
  }
  return result;
}

//现在，我希望“剧目名称”信息也从中转数据中获得。
//为此，需要使用play中的数据填充aPerformance对象（记得编 译、测试、提交）。
function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  return renderPlainText(statementData, plays);
  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance);
    return result;
  }
}

//现在我们已经有了安放play字段的地方，可以把数据放 进去。
//我需要对playFor和statement函数应用搬移函数
function enrichPerformance(aPerformance) {
  const result = Object.assign({}, aPerformance);
  result.play = playFor(result);
  return result;
}
function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

//然后替换renderPlainText中对playFor的所有引用点，让 它们使用新数据（编译、测试、提交）。
let result = `Statement for ${data.customer}\n`;
for (let perf of data.performances) {
  result += ` ${perf.play.name}: ${usd(amountFor(perf))} (${
    perf.audience
  } seats)\ n`;
}
result += `Amount owed is ${usd(totalAmount())}\n`;
result += `You earned ${totalVolumeCredits()} credits\n`;
return result;
function volumeCreditsFor(aPerformance) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  if ("comedy" === aPerformance.play.type)
    result += Math.floor(aPerformance.audience / 5);
  return result;
}
function amountFor(aPerformance) {
  let result = 0;
  switch (aPerformance.play.type) {
    case "tragedy":
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`unknown type: ${aPerformance.play.type}`);
  }
  return result;
}
