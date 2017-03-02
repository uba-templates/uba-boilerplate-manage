define(['../router/routers'], function(routers) {
    var routes = {};
    return function() {
        routers.forEach(function(item, index, input) {
            var path = item.name;
            routes[path] = function() {
                var content = document.getElementById("content");
                var filePath = "pages" + path + '.js';
                requirejs.undef(filePath);
                require([filePath], function(module) {
                    ko.cleanNode(content);
                    content.innerHTML = "";
                    if (module.init) {
                        module.init(content);
                    } else {
                        module.default(content);
                    }
                })
            }
        });

        var router = Router(routes);
        router.init("#mainPage/main");

    }
});
