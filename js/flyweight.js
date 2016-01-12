/**
 * Created by hansneil on 12/1/16.
 */
/*
 * Flyweight(享元)模式
 */
Function.prototype.implementsFor = function(parentClassOrObject) {
    if (parentClassOrObject.constructor === Function) {
        this.prototype = new parentClassOrObject();
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject.prototype;
    } else {
        this.prototype = parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject;
    }
    return this;
};

//享元对象
var CofferOrder = {
    //接口
    serveCoffee: function (context) { },
    getFlavor:   function (){}
};

//实现CoffeeOrder的具体享元对象
function CoffeeFlavor(newFlavor) {
    var flavor = newFlavor;

    //这部分检测的原因在于,如果为某个功能已经定义了接口,则实现该功能
    if (typeof this.getFlavor === 'function') {
        this.getFlavor = function() {
            return flavor;
        };
    }

    if (typeof this.serveCoffee === 'function') {
        this.serveCoffee = function(context) {
            console.log("Serving Coffee flavor"
                + flavor
                + " to table number "
                + context.getTable());
        };
    }
}

//为CofferOrder实现接口
CoffeeFlavor.implementsFor(CofferOrder);

//处理coffee订单的table数
function CoffeeOrderContext(tableNumber) {
    return {
        getTable: function(){
            return tableNumber;
        }
    };
}

//享元工厂对象
function CoffeeFlavorFactory() {
    var flavors = [];

    return {
        getCoffeeFlavor: function(flavorName) {
            var flavor = flavors[flavorName];

            if (flavor === undefined) {
                flavor = new CoffeeFlavor(flavorName);
                flavors.push(flavor);
            }
            return flavor;
        },

        getTotalCoffeeFlavorsMade: function() {
            return flavors.length;
        }
    };
}

//样例用法
function testFlyweight() {
    var flavors = new CoffeeFlavor(),
        tables = new CoffeeOrderContext(),
        ordersMade = 0,
        flavorFactory;

    function takeOrders(flavorIn, table) {
        flavors[ordersMade] = flavorFactory.getCoffeeFlavor(flavorIn);
        tables[ordersMade++] = new CoffeeOrderContext(table);
    }

    flavorFactory = new CoffeeFlavorFactory();

    takeOrders("Cappuccino", 2);
    takeOrders("Cappuccino", 2);
    takeOrders("Frapper", 1);
    takeOrders("Frapper", 1);
    takeOrders("Xpresso", 1);

    for (var i = 0; i  < ordersMade; ++i) {
        flavors[i].serveCoffee(tables[i]);
    }
    console.log(" ");
    console.log("total coffee flavor objects made: " + flavorFactory.getTotalCoffeeFlavorsMade());
}

testFlyweight();