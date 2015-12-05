/**
 * Created by Alex on 21.09.15.
 */

define([
    'backbone',
    'views/websocket',
    'views/login',
    'views/signup',
    'views/main',
    'views/scoreboard',
    'views/game',
    'views/manager',
    'views/lobbies',
    'views/lobby',
    'models/user',
    'collections/scores',
    'collections/lobbies',
    'models/currentLobby',
    'models/player',
    'collections/players',
    'models/game'
], function(
    Backbone,
    WebSocket,
    LoginScreen,
    SignupScreen,
    MainScreen,
    ScoreboardScreen,
    GameScreen,
    ViewManager,
    LobbiesScreen,
    LobbyScreen,
    UserModel,
    ScoreCollection,
    LobbiesCollection,
    CurrentLobby,
    PlayerModel,
    PlayerCollection,
    GameModel
){

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'signup': 'signupAction',
            'lobbies': 'lobbiesAction',
            'lobby': 'lobbyAction',
            '*default': 'defaultActions'
        },

        initialize: function () {

            /**
             * Setting ViewManager
             * */
            this.viewManager = new ViewManager();

            /**
             * Define models and collections
             * */
            var user = new UserModel();
            var lobby = new CurrentLobby();
            var scores = new ScoreCollection();
            var lobbies = new LobbiesCollection();
            var player = new PlayerModel();
            var players = new PlayerCollection();
            var game = new GameModel();

            /**
             * Define views
             * */
            this.main = new MainScreen(user);
            this.login = new LoginScreen(user);
            this.signup = new SignupScreen(user);
            this.scoreboard = new ScoreboardScreen(scores);
            this.lobbies = new LobbiesScreen(user, player, lobbies, lobby);
            this.lobby = new LobbyScreen(user, lobby);
            this.game = new GameScreen(user, player, players, game);

            /**
             * Passing views to manager
             * */
            this.viewManager.addView(this.main);
            this.viewManager.addView(this.login);
            this.viewManager.addView(this.signup);
            this.viewManager.addView(this.scoreboard);
            this.viewManager.addView(this.lobbies);
            this.viewManager.addView(this.lobby);
            this.viewManager.addView(this.game);


            /**
             * Setting WebSocket
             * */
            this.websocket = new WebSocket(user, lobbies, lobby, player, players, game);


        },
        defaultActions: function () {
            this.main.show();
        },
        scoreboardAction: function () {
            this.scoreboard.show();
        },
        gameAction: function () {
            this.game.show();
        },
        loginAction: function () {
            this.login.show();
        },
        signupAction: function () {
            this.signup.show();
        },
        lobbiesAction: function() {
            this.lobbies.show();
        },
        lobbyAction: function() {
            this.lobby.show();
        }
    });

    return new Router();
});