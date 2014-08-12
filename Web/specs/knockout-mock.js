(function () {
    var fakeObsObj = function(obj) {
        return function() {
            return obj;
        };
    };

    define([], function () {
        var spyObj = jasmine.createSpyObj("ko", ["observable", "observableArray"]);

        spyOn(spyObj, "observable").and.callFake(function(obj) {
            return new fakeObsObj(obj);
        });

        return spyObj;
    });
})();