﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Api.Models;
using Autofac.Integration.WebApi;
using Core;

namespace Api.Controllers
{
    [EnableCors(origins: "http://localhost:49609,http://localhost:50885", headers: "*", methods: "*")]
    [AutofacControllerConfiguration]
    public class GameController : ApiController
    {
        private readonly IGameEngine _gameEngine;

        public GameController(IGameEngine gameEngine)
        {
            _gameEngine = gameEngine;
        }

        // GET api/game
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return Enum.GetValues(typeof(Element)).Cast<Element>().Select(e => e.ToString()).ToList();
        }

        [HttpPut]
        public GameResultsViewModel GetResults(GameViewModel gameViewModel)
        {

            var player1 = gameViewModel.Player1;
            var player2 = gameViewModel.Player2;

            if (player1.IsComputer)
            {
                player1.ChosenElement = _gameEngine.GetRandomElement();
            }

            if (player2.IsComputer)
            {
                player2.ChosenElement = _gameEngine.GetRandomElement();
            }

            var game = ConvertGameViewModelToGame(gameViewModel);

            var winner = _gameEngine.GetWinner(game);

            return new GameResultsViewModel
            {
                GamePlayed = gameViewModel,
                GameWinner = ConvertGamePlayerToGamePlayerViewModel(winner)
            };
        }

        private GamePlayerViewModel ConvertGamePlayerToGamePlayerViewModel(GamePlayer player)
        {
            return new GamePlayerViewModel
            {
                Name = player.Name,
                ChosenElement = player.ChosenElement,
                IsComputer = player.IsComputer
            };
        }

        private Game ConvertGameViewModelToGame(GameViewModel gameViewModel)
        {
            return new Game(player1: ConvertGamePlayerViewModelToGamePlayer(gameViewModel.Player1), player2: ConvertGamePlayerViewModelToGamePlayer(gameViewModel.Player2));
        }

        private GamePlayer ConvertGamePlayerViewModelToGamePlayer(GamePlayerViewModel playerViewModel)
        {
            return new GamePlayer(name: playerViewModel.Name, chosenElement: playerViewModel.ChosenElement, isComputer: playerViewModel.IsComputer);
        }
    }
}
