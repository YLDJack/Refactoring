//第一步设置好一些测试 夹具（fixture），也就是测试所需要的数据和对象等（就 本例而言是一个加载好了的行省对象）

//第二步则是验证测 试夹具是否具备某些特征（就本例而言则是验证算出的缺额 应该是期望的值）

function sampleProvinceData() {
  return {
    name: "Asia",
    producers: [
      { name: "Byzantium", cost: 10, production: 9 },
      { name: "Attalia", cost: 12, production: 10 },
      { name: "Sinope", cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20,
  };
}

describe("province", function () {
  it("shortfall", function () {
    const asia = new Province(sampleProvinceData());
    //断言
    assert.equal(asia.shortfall, 5);
  });
});

//“expect”风格
describe("province", function () {
  it("shortfall", function () {
    const asia = new Province(sampleProvinceData());
    expect(asia.shortfall).equal(5);
  });
});

// DON'T DO THIS it 共享测试夹具会使测试间产生交互，这 是滋生bug的温床——还是你写测试时能遇见的最恶心的 bug之一
describe("province", function () {
  const asia = new Province(sampleProvinceData());
  "shortfall",
    function () {
      expect(asia.shortfall).equal(5);
    };
  it("profit", function () {
    expect(asia.profit).equal(230);
  });
});

//beforeEach子句会在每个测试之前运行一遍，将asia变 量清空，每次都给它赋一个新的值。这样我就能在每个测试 开始前，为它们各自构建一套新的测试夹具，这保证了测试 的独立性，避免了可能带来麻烦的不确定性
describe("province", function () {
  let asia;
  beforeEach(function () {
    asia = new Province(sampleProvinceData());
  });
  it("shortfall", function () {
    expect(asia.shortfall).equal(5);
  });
  it("profit", function () {
    expect(asia.profit).equal(230);
  });
});

//这是一个常见的测试模式。我拿到beforeEach配置好的 初始标准夹具，然后对该夹具进行必要的检查，最后验证它 是否表现出我期望的行为
it("change production", function () {
  asia.producers[0].production = 20;
  expect(asia.shortfall).equal(-6);
  expect(asia.profit).equal(292);
});


