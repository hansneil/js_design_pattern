/**
 * Created by hansneil on 11/1/16.
 */
/*
 * Facade 外观模式
 * 通过为代码提供一个方便的高层次接口,隐藏底层的真是复杂性
 *
 * 外观模式在带来便利的同时也造成了一个需要关注的问题:
 *        性能成本问题
 *        一个例子:
 *           getElementById('...') 和 $("#...")
 *           后者的性能比前者差
 *           由于后者在执行前者一样的操作的同时还进行了优化
 *           比如返回的不是一个dom节点而是jquery对象
 */
var addEvent = function(el, ev, fn) {
    if (el.addEventListener) {
        el.addEventListener(ev, fn, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + ev, fn);
    } else {
        el['on' + ev] = fn;
    }
};
/*
 * Facade模式不是必须单独使用的,例如和module模式使用
 */
var module = (function(){
    var _private = {
        i: 5,
        get: function() {
            console.log("current valude: " + this.i);
        },
        set: function(val) {
            this.i = val;
        },
        run: function() {
            console.log("running");
        },
        jump: function() {
            console.log("jumping");
        }
    };

    return {
        facade: function(args) {
            _private.set(args.val);
            _private.get();
            if (args.run) {
                _private.run();
            }
        }
    }
})();

module.facade({run: true, val: 10});