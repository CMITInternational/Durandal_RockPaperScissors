(function() {
    define(['knockout'], function (ko) {
        return function(name, isComputer, chosenElement, elements) {
            var self = this;

            self.name = ko.observable(name);
            self.isComputer = ko.observable(isComputer);
            self.chosenElement = ko.observable(chosenElement);
            self.elements = elements;

            var handleIsComputerChange = function(event) {
                console.log(self.name() + ' - isComputer changed : ' + self.isComputer());
            };

            self.isComputer.subscribe(handleIsComputerChange);
        };
    });
})();