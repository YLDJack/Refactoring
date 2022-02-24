class Employee extends Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Department extends Party {
  get totalAnnualCost() {
    return this.monthlyCost * 12;
  }
}

//检查两个类的函数时我发现，两个函数都引用了 monthlyCost属性，但后者并未在超类中定义，而是在两个子 类中各自定义了一份实现。因为JavaScript是动态语言， 这样做没有问题；但如果是在一门静态语言里，我就必须 将monthlyCost声明为Party类上的抽象函数，否则编译器就会 报错。

//两个函数各有不同的名字，因此第一步是用改变函数声 明（124）统一它们的函数名

class Department {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

//然后，我从其中一个子类中将annualCost函数复制到超类。
//这项重构手法至此即告完成，但还有一个遗留问题需要 解决：annualCost函数中调用了monthlyCost，但后者并未在 Party类中显式声明。
//当然代码仍能正常工作，这得益于 JavaScript是动态语言，它能自动帮你调用子类上的同名 函数。
//但若能明确传达出“继承Party类的子类需要提供一 个monthlyCost实现”这个信息，无疑也有很大的价值，特别 是对日后需要添加子类的后来者。其中一种好的传达方式是 添加一个如下的陷阱（trap）函数
class Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

//我称上述抛出的错误为一个“子类未履行职责错误”， 这是从Smalltalk借鉴来的名字。
class Party {
  get monthlyCost() {
    throw new SubclassResponsibilityError();
  }
}
