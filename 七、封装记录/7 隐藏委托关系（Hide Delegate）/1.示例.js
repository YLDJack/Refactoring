manager = aPerson.department.manager;
//=========================================>
manager = aPerson.manager;
class Person {
  get manager() {
    return this.department.manager;
  }
}
