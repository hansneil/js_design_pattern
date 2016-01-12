/**
 * Created by hansneil on 11/1/16.
 */
var myCar = {
    name: "Ford Escort",

    drive: function() {
        console.log("Weeeeee. I'm driving");
    },

    panic: function() {
        console.log("Wait. How do you stop this thing");
    }
}
var yourCar = Object.create(myCar);
/*
 * 可以看到一个对象是另一个对象的原型
 * yourCar继承myCar的所有属性
 */
console.log(yourCar.name);
yourCar.drive();
yourCar.panic();
/*
 * yourCar可以定义属于自己的属性
 */
yourCar.ownName = "Ford Escort2015D";
console.log(myCar.isPrototypeOf(yourCar));
console.log("----------------first instance end----------------");
/*
 * Object.create允许实现差异继承, 为Object.create()传入第二个参数
 * 即在第二个参数中,用对象字面量来初始化属性
 */
var vehicle = {
    getModel: function() {
        console.log("The model of this vehicle is.." + this.model);
    }
};

var car = Object.create(vehicle, {
    "id": {
        value: '2015D',
        enumerable: true
    },
    "model": {
        value: "Ford",
        enumerable: true
    }
});
console.log(car.id);
car.getModel();
console.log("----------------second instance end---------------");
/*
 * 不直接使用Object.create的情况下实现原型模式
 */
var vehiclePrototype = {
    init: function(carModel) {
        this.model = carModel;
    },

    getModel: function() {
        console.log("The model of this vehicle is .." + this.model);
    }
};

function newVehicle(carModel) {
    function F() {}
    F.prototype = vehiclePrototype;

    var f = new F();
    f.init(carModel);
    return f;
}
var car = newVehicle("Ford Escort");
car.getModel();

//另外一种红皮书上提到的做法
function anotherVehicle(carModel) {
    function Ford() {
    }

    Ford.prototype.init = function(carModel){
        this.model = carModel;
    };
    Ford.prototype.getModel = function () {
        console.log("Another Model of this vehicle is .." + this.model);
    };

    var ford = new Ford();
    ford.init(carModel);
    return ford;
}
var anotherCar = anotherVehicle("Ford 2010");
anotherCar.getModel();
console.log("----------------third instance end---------------");
/*
 * 最后一种可供选择的prototype模式
 */
//试试闭包
var beget = (function() {
    function F() {}
    var myProto = {
        init: function(carModel) {
            this.model = carModel;
        },

        getModel: function(){
            console.log("the model!!!!!..Found.." + this.model);
        }
    };

    return function(model){
        F.prototype = myProto;
        var f = new F();
        f.init(model);
        return f;
    };
})();
var myBeget = beget("haha");
myBeget.getModel();