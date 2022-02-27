class Employee {} // Java
class Salesman extends Employee {
private String name;
}
class Engineer extends Employee {
private String name;
}
//=========================================>

class Employee {
  protected String name;
  }
  class Salesman extends Employee {}
  class Engineer extends Employee {}