# javascript设计模式

# Construct Pattern(构造器模式)
  - Object构造器：创建特定类型的对象
  - js对象创建的两种方法：
    - var newObject = {};
    - var newObject = new Object();
  - 四种添加属性的方法
  <pre>
  newObject.key = value;
  newObject[key] = value;
  Object.defineProperty(newObject, "key", {
      value: value,
      writable: true,
      enumerable: true,
      configurable: true
  })
  Object.defineProperties(newObject, {
      "key1": {value:value1, ...}
      "key2": {value:value2, ...}
  })
  </pre>
  
  - 构造器
  <pre>
  //创建构造函数
  function Camera(modle, year, price) {
    this.model = model;
    this.year = year;
    this.price = price;
    
    //method
    this.getInfo = function() {
        console.log(this.model + " is sold at $" + this.price);
    };
  }
  //带原型的构造器
  function Camera(model, year, price) {
    this.model = model;
    this.year = year;
    this.price = price;
  }
  Camera.prototype.getInfo = function() {
    console.log(this.model + " is sold at $" + this.price);
  };
  </pre>
# Module Pattern(模块模式)
  - javascript实现模块方法: 对象字面量法/Module模式/AMD模块/CommonJS模块/ECMAScript Harmony模块
  - 对象字面量法
  <pre>
  var camera = {
    type: "Cannon",
    info: {
      year: 2015,
      id: 70D
    },
    
    //method
    getInfo: function(){
      console.log(this.type + this.info.id);
    }
  };
  //不需要使用new来实例化，使用这种方式便于封装和组织代码
  camera.getInfo();
  </pre>
  - Module模式
  <pre>
  //进一步模拟类的概念，使对象拥有公有/私有方法和变量，减少冲突
  var camera = (function(){
    var private_shot_cnt = 0;
    var privateMethod = function(foo) {
      console.log(foo);
    };
    
    //将对象字面量作为返回值，拥有公有/私有方法变量
    return {
      //公有变量
      type: "Cannon",
      //公有方法
      takePhoto: function(){
        private_shot_cnt++; //通过闭包访问私有变量
        privateMethod('A Nice Photo has been Taked');
      }
    }
  })();
  
  //关于引入和引出
  //引入:全局变量可以作为参数传递给模块的匿名函数，并进行本地命名
  var camera = (function(jQ, _){
    function privateMethod() {
      jQ("#camera").html("Cannon70D");
    }
    function privateMethodUs() {
      console.log(_.min([1,2,3,4,5]));
    }
    
    return {
      publicMethod: function() {
        privateMethod1();
        privateMethod2();
      }
    };
  })(jQuery, _); 
  //usage
  camera.publicMethod();
  //引出:允许声明全局变量，但不实现它们
  var camera = (function(){
    var module = {},
        privateVar = "Cannon70D";
    function privateMethod() {
      console.log(...);
    }
    
    module.publicProperty = "Cannon";
    module.publicMethod = function(){
      console.log("....");
      ...
    }
    return module;
  })();
  </pre>
# Singleton Pattern(单例模式)
  - 限制类的实例化次数只能是一次，该实例不存在时创建实例，否则返回该对象的引用
  
    例如:MongoDB的Schema
    
    使用场景: 该唯一的实例可以通过子类化[后面会讲到]可扩展的，无需修改单例代码即可扩展实例
  <pre>
  var mySingleton = (function(){
    var instance;
    function init() {
      function privateMethod() {
        console.log("a private method");
      }
      var privateVar = "Canon70D",
          privateCnt = Math.random();
      return {
        publicMethod: function(){
          console.log("Ha, You see");
        },
        publicProperty: "My Canon70D",
        getRandomNumber: function() {
          return privateCnt;
        }
      };
    }
    return {
      //获取singleton的实例，如果存在返回，不存在创建
      getInstance: function(){
        if (!instance) {
          instance = init();
        }
        return instance;
      }
    }
  })();
  </pre>
# Observer Pattern(观察者模式)[待补充]
# Mediator Pattern(中介者模式)[待补充]
# Prototype Pattern(原型模式)
  - 一种基于现有对象模板，通过克隆方式创建对象的模式[基于原型继承的模式]
  - 模式不仅是一种实现继承的简单方法，也可以带来性能提升，在一个对象中定义一个函数，它们都是由引用创建的，而不像构造器模式
  - 真正的原型继承要求使用Object.create()，继承方法时使用Object.create(o.prototype)。
  <pre>
  var camera = {
    name: "Canon70D",
    takePhto: function(){
      console.log("Ka, a nice photo!");
    },
    transfer: function(){
      console.log("Ok, one item has been successfully transferred to your Iphone");
    }
  };
  //原型模式继承
  var myCamera = Object.create(camera);
  console.log(myCamera);
  
  //Object.create()还允许差异继承,即向create传递参数
  var vehicle = {
    getModel: function(){
      console.log("The model of this vehicle is.." + this.model);
    }
  };
  //继承,create第二个参数类似Object.defineProperties
  var car = Object.create(vehicle, {
    "id": {value: someId, enumerable: true},
    "model": {value: "Benz", enumerable: true}
  });
  car.getModel(); //The model of this vehicle is.. Benz
  
  ////模拟prototype模式
  var vehiclePrototype = {
    init: function(carModel) {
      this.model = carModel;
    },
    getModel: function() {
      console.log("The model of this vehicle is.." + this.model);
    }
  };
  
  function vehicle(model) {
    function F() {}
    F.prototype = vehiclePrototype;
    var f = new F();
    f.init(model);
    return f;
  }
  //这种模拟prototype模式的方法优点在于，仍然可以进行参数化配置实例，但不用像create那样设置property的属性
  </pre>
# Command Pattern(命令模式)
  - 该模式旨在将方法调用/请求/操作封装到单一对象中，从而根据我们不同的请求对客户进行参数化和传递可供执行的方法调用，这种模式将调用的对象和知道如何实现该操作的对象解耦，具有更大的整体灵活性
  - 这个模式相当于基类和派生类
  <pre>
  //定义具体实现操作的对象
  (function() {
    var CameraManager = {
      requestInfo: function(model, id) {
        return "The information for " + model + id + "is foobar";
      },
      buyCamera: function(model, id) {
        return "You've successfully purchased " + model + id;
      },
      arrangeViewing: function(model, id) {
        return "You've successfully booked a viewing of " + model + id;
      }
    };
    //到此完全可以通过CameraManager调用方法，实现应该实现的功能。但为了实现松散耦合，
    //命令模式要求定义命令对象
    //［调用操作的对象］
    CameraManager.execute = function(name) {
      return CameraManager[name] && CameraManager[name].apply(CameraManager, [].slice.call(arguments, 1));
    }
  })();
  </pre>

# Facade Pattern(外观模式)
  - 这种模式主要将实现细节隐藏，提供一个抽象，方便的高层次接口
  - 属于一种结构型模式，在jQuery中经常可以看到这种模式
  <pre>
  //模拟事件处理函数
  var addMyEvent = function(el, ev, fn) {
    if (el.addEventListner) {
      el.addEventListner(ev, fn, false);
    } else if (el.attachEvent) {
      el.attachEvent("on" + ev, fn);
    } else {
      el["on" + ev] = fn;
    }
  }
  //缺点：在jQuery相对于原生js会造成一些隐形成本，由于进行了优化查询
  </pre>
  
# Factory Pattern(工厂模式)
  - 创建型模式，设计创建对象的概念
  - 区别与其他模式之处: 不显式使用构造函数，由Factory提供一个通用的接口
  <pre>
  function Canon(options) {
    this.type = options.type || "70D";
    this.color = options.color || "black";
    this.state = options.state || "brand new";
  }
  function Nikon(options) {
    this.type = options.type || "d7000";
    this.color = options.color || "white";
    this.year = options.year || "2015";
  }
  
  //camrea factory
  function CameraFactory() {}
  CameraFactory.prototype.cameraClass = Canon; //default:canon
  CameraFactory.prototype.createCamera = function(options) {
    if (options.cameraClass == "canon") {
      this.cameraClass = Canon;
    } else {
      this.cameraClass = Nikon;
    }
  };
  
  //Abstract Factory(抽象工厂)
  //用于封装一组公有目标的单个工厂，将一组对象的实现细节从一般用法中分离出来
  var AbstractCameraFactory = (function(){
    var types = {};
    return {
      getCamera: function(type, customizations) {
        var Camera = types[type];
        return Camera ? new Camera(customizations) : null;
      },
      registerCamera: function(type, Camera){
        var proto = Camera.prototype;
        types[type] = Camera;
        return AbstractCameraFactory;
      }
    };
  })();
  AbstractCameraFactory.registerCamera("canon", Car);
  AbstractCameraFactory.registerCamera("nikon", Nikon);
  var canon = AbstractCameraFactory.getCamera("canon", {...});
  </pre>
