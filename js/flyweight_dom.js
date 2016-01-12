/**
 * Created by hansneil on 12/1/16.
 */
var stateManager = {
    fly: function () {
        var self = this;

        $("#container").unbind().on("click", function(e){
            var target = $(e.target || e.srcElement);
            if (target.is("div.toggle")) {
                console.log(self);
                console.log(this);
                self.handleClick(target);
            }
        });
    },

    handleClick: function(elem) {
        elem.find("span").toggle("slow");
    }
};
stateManager.fly();