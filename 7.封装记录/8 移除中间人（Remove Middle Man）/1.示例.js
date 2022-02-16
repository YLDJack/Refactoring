manager = aPerson.manager;
class Person {
  get manager() {
    return this.department.manager;
  }
}
//=========================================>
manager = aPerson.department.manager;
