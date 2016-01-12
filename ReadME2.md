# Mixin Pattern(混合模式)
  - 可以轻松被一类或者一组子类继承的类，目的是函数复用
  <pre>
  var Person = function(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = "male";
  };
  
  var Superhero = function(firstName, lastName, powers) {
    Person.call(this, firstName, lastName); //继承属性
    //特有属性
    this.powers = powers;
  }
  //继承方法
  Superhero.prototype = Object.create(Person.prototype);
  </pre>

# Decorate Pattern(装饰者模式)
  - 根据单一的基本对象，扩展自己的功能，也可以覆盖基本对象的功能
# Flyweight Pattern(享元模式)
  - 共享尽可能多的数据来减少应用程序内存的使用
  - 应用方式有两种: 数据层和DOM层
