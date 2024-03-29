﻿(function() {
    define(function(require) {
        var ko = require('knockout'),
            person = require('viewmodels/person'),
            game = require('services/game');

        return function() {
            var self = this;

            game.setUrl('http://localhost:51478/api/Game');

            self.elements = ko.observableArray(["stuff"]);

            self.player1 = ko.observable(new person("Person", false, "Rock", self.elements));
            self.player2 = ko.observable(new person("Computer", true, "Paper", self.elements));

            self.winner = ko.observable("");

            game.index()
                .success(function(data) {
                    var elements = [];
                    data.forEach(function(element) {
                        elements.push(element);
                    });
                    self.elements(elements);
                })
                .error(function(error) {
                    alert('error: ' + error);
                });

            self.play = function () {
                game.play(ko.toJSON({
                        player1: self.player1(),
                        player2: self.player2()
                    }))
                    .success(function(data) {
                        var element1 = self.elements()[data.GamePlayed.Player1.ChosenElement];
                        var element2 = self.elements()[data.GamePlayed.Player2.ChosenElement];

                        self.player1().chosenElement(element1);
                        self.player2().chosenElement(element2);

                        self.winner(data.GameWinner.Name + ' with ' + self.elements()[data.GameWinner.ChosenElement]);
                    })
                    .error(function(error) {
                        alert('error: ' + error);
                    });
            };
        };
    });
})();