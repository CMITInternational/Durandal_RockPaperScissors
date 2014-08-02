(define(function(require) {
    var ko = require('knockout');
    
    return function (name, isComputer, chosenElement, elements) {
        var self = this;

        self.name = ko.observable(name);
        self.isComputer = ko.observable(isComputer);
        self.chosenElement = ko.observable(chosenElement);
        self.elements = elements;
    };
}))();