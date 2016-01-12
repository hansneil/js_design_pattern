/**
 * Created by hansneil on 11/1/16.
 */
/*
 * Factory模式: 创建型模式
 *     即: 涉及创建对象的概念
 */
function Car(options) {
    this.doors = options.doors || 4;
    this.state = options.state || "brand new";
    this.color = options.color || "silve"
}

function Truck(options) {
    this.state = options.state || "used";
    this.wheelSize = options.wheelSize || "large";
    this.color = options.color || "blue";
}

function VehicleFactory() {}

VehicleFactory.prototype.vehicleClass = Car;
VehicleFactory.prototype.createVehicle = function(options) {
    if (options.vehicleType == "car") {
        this.vehicleClass = Car;
    } else {
        this.vehicleClass = Truck;
    }

    return new this.vehicleClass(options);
};

var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
    vehicleType: "car",
    color: "yellow",
    doors: 6
});
console.log('-------------------my car info------------------');
console.log(car instanceof Car);
console.log(car);
console.log('-------------------my car end-------------------');
/*
 * 方法一:修改了VehicleFactory的实例来使用Truck类
 * var movingTruck = carFactory.createVehicle({
 *     vehicleType: "truck",
 *     state: "like new",
 *     color: "red",
 *     wheelSize: "small"
 * });
 *
 * 方法二:把vehicleFactory归入子类创建一个Truck工厂
 * function TruckFactory() {}
 * TruckFactory.prototype = new VehicleFactory();
 * TruckFactory.prototype.vehicleClass = Truck;
 *
 * var truckFactory = new TruckFactory();
 * var myBigTruck = truckFactory.createVehicle({
 *     state: "omg...so bad",
 *     color: "pink",
 *     wheelSize: "so big";
 * })
 */
var movingTruck = carFactory.createVehicle({
        vehicleType: "truck",
        state: "like new",
        color: "red",
        wheelSize: "small"
});
console.log(movingTruck instanceof Truck);
console.log(movingTruck);
console.log('-------------------my truck end-----------------');
function TruckFactory() {}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

var truckFactory = new TruckFactory();
var myBigTruck = truckFactory.createVehicle({
        state: "omg...so bad",
        color: "pink",
        wheelSize: "so big"
});
console.log(myBigTruck instanceof Truck);
console.log(myBigTruck);
/*
 * 尽量避免使用工厂模式,避免不必要的开销
 */

/*
 * 抽象工厂模式 Abstract Factory
 */
var types_debug = {};
var AbstractVehicleFactory = (function(){
    var types = {};

    return {
        getVehicle: function (type, customizations){
            var Vehicle = types[type];
            return Vehicle ? new Vehicle(customizations) : null;
        },
        registerVehicle: function (type, Vehicle){
            var proto = Vehicle.prototype;

            //if (proto.drive && proto.breakDown) {
                types[type] = Vehicle;
                types_debug[type] = Vehicle;
            //}

            return AbstractVehicleFactory;
        }
    };
})();

AbstractVehicleFactory.registerVehicle("car", Car);
AbstractVehicleFactory.registerVehicle("truck", Truck);
console.log(types_debug);