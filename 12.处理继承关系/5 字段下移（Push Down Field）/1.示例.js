class Employee { // Java 
  private String quota; }
  class Engineer extends Employee {} 
  class Salesman extends Employee {}
//=========================================>
class Employee {} 
class Engineer extends Employee {} 
class Salesman extends Employee { protected String quota; }