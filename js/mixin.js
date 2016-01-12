/**
 * Created by hansneil on 12/1/16.
 */
/*
 * Mixin模式,混合模式
 */
var Person = function (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = "male";
};
Person.prototype.getName = function () {
    console.log("Name: " + this.firstName + " " + this.lastName);
};

var clark = new Person("Clark", "Kent");
//定义子类
var SuperHero = function (firstName, lastName, powers) {
    //继承属性
    Person.call(this, firstName, lastName);
    this.powes = powers;
};

//继承方法
/*SuperHero.prototype = Object.create(Person.prototype);
var superman = new SuperHero("Clark", "Kent", ["flight", "heat-vision"]);
console.log(SuperHero.prototype.getName);
superman.getName();*/
SuperHero.prototype = new Person();
var superman = new SuperHero("Clark", "Kent", ["flight", "heat-vision"]);
console.log(SuperHero.prototype.getName);
superman.getName();

//方法赋值时其实是增加一个引用
var myFunc = Person.prototype.getName;
console.log(myFunc);
console.log(myFunc == Person.prototype.getName);
