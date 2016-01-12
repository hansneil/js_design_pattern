/**
 * Created by hansneil on 12/1/16.
 */
/*
 * Decorator模式:
 * 关注扩展额外功能, 仅使用一个单一的基本对象, 向基本对象添加属性或方法,而不是进行子类化
 */
function Vehicle(vehicleType) {
    this.vehicleType = vehicleType;
    this.model = "default";
    this.license = "000-0010-00012";
}

var testInstance = new Vehicle("car");
console.log(testInstance);

//接下来创建一个Vehicle实例并进行Decorate,
var truck = new Vehicle("truck");

truck.setModel = function(model) {
    this.model = model;
};

truck.setColor = function(color) {
    this.color = color;
};

truck.setModel("CAT");
truck.setColor("blue");

console.log(truck);

//接下来测试基本对象有没有受影响
var secondInstance = new Vehicle("car");
console.log(secondInstance);