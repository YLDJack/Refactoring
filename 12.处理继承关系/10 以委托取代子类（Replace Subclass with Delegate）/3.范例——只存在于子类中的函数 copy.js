//最后一个例子是一个只存在于子类中的函数
class PremiumBooking {
  get hasDinner() {
    return this._extras.hasOwnProperty("dinner") && !this.isPeakDay;
  }
}

//把它从子类移到委托类
class PremiumBookingDelegat {
  get hasDinner() {
    return this._extras.hasOwnProperty("dinner") && !this._host.isPeakDay;
  }
}

//然后在Booking类中添加分发逻辑
class Booking {
  get hasDinner() {
    //在JavaScript中，如果尝试访问一个没有定义的属 性，就会得到undefined，所以我在这个函数中也这样做。 （尽管我直觉认为应该抛出错误，我所熟悉的其他面向对象 动态语言就是这样做的。）
    return this._premiumDelegate ? this._premiumDelegate.hasDinner : undefined;
  }
}

function createPremiumBooking(show, date, extras) {
  const result = new PremiumBooking(show, date, extras);
  result._bePremium(extras);
  return result;
}
