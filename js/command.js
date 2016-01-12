/**
 * Created by hansneil on 11/1/16.
 */
/*
 * command模式将方法调用,请求和操作封装到单一对象中,
 * 根据不同的请求对客户进行参数化和传递可执行的方法调用
 * 基类: 一个抽象类,仅提供一个接口,并不一定为所有的成员函数提供实现
 * 派生类: 由基类派生,实现缺失的功能[即:具体类]
 */
(function(){
    var CarManager = {
        requestInfo: function(model, id) {
            return "The information for " + model + "with ID: " + id + " is foobar";
        },

        buyVehicle: function(model, id) {
            return "You have successfully purchased Item " + id + ", a " + model;
        },

        arrangeViewing: function(model, id) {
            return "You have successfully booked a viewing of " + model + "(" + id + ")";
        }
    };
    CarManager.execute = function(name) {
        console.log(arguments);
        return CarManager[name] && CarManager[name].apply(CarManager, [].slice.call(arguments, 1));
    };
    console.log(CarManager.execute("buyVehicle", "Ford Escort", "453543"));
})();
/*
 * 注: [].slice.call == Array.slice.call
 * 第一个参数arguments不是数组,而是对象,其目的是将arguments转化为数组
 */