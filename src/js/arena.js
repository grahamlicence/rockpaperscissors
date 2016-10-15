import player from './player';
import computer from './computer';
import match from './match';

const arena = {
    player1: null,
    player2: null,
    winner: null,
    lastMatch: null,
    gameType: 'pvc',

    setPlayers: function(players) {
        this.player1 = players.player1;
        this.player2 = players.player2;
    },

    setPlayerVsComputer: function() {
        const players = {player1: new player(), player2: new computer()}
        if (this.simulation) {
            clearInterval(this.simulation);
        }
        this.setPlayers(players);
        this.resetGame();
    },

    setComputerVsComputer: function() {
        const players = {player1: new computer(), player2: new computer()}
        this.setPlayers(players);
        this.resetGame();
        this.startSimulation();
    },

    setPlayerVsPlayer: function() {
        const players = {player1: new player(), player2: new player()}
        if (this.simulation) {
            clearInterval(this.simulation);
        }
        this.setPlayers(players);
        this.resetGame();
    },

    changePlayers: function(e) {
        const {type} = e.target.dataset;
        if (type === 'pvc') {
            this.setPlayerVsComputer();
        }
        if (type === 'cvc') {
            this.setComputerVsComputer();
        }
        this.gameType = type;
    },

    simulateMove: function() {
        this.player1.choose();
        this.player2.choose();
        this.checkSelections();
    },

    startSimulation: function() {
        this.simulation = setInterval(this.simulateMove.bind(this), 1500);
    },

    setScore: function(score) {
        let hasWinner = false;
        if (score.player1 === 2) {
            this.winner = 'player1';
            hasWinner = true;
        }
        if (score.player2 === 2) {
            this.winner = 'player2';
            hasWinner = true;
        }
        if (this.simulation && hasWinner) {
            clearInterval(this.simulation);
        }
        this.score = score;
    },

    getWinner: function() {
        return this.winner;
    },

    updatePlay: function() {
        this.setScore(match.getScore());

        const {score, lastMatch} = this,
            round = match.getRound(),
            winner = this.getWinner();
        let result = 'Begin game!';
        
        if (lastMatch) {
            result = lastMatch === 'draw' ? lastMatch : `${lastMatch} wins round`;
        }

        this.html.status.score.innerHTML = `${score.player1}-${score.player2}`;
        this.html.status.round.innerHTML = `Round ${round}`;

        if (winner) {
            this.html.status.winner.innerHTML = `${winner} wins game!`;
            return;
        }
        
        this.html.status.winner.innerHTML = result;

    },

    /**
     * When both players chosen, play game
     */
    checkSelections: function() {
        // get computer's selection
        if (this.gameType === 'pvc') {
            this.player2.choose();
        }
        const playerOptions = {
                player1: this.player1.getChoice(),
                player2: this.player2.getChoice()
            };
        if (playerOptions.player1 && playerOptions.player2) {
            this.lastMatch = match.play(playerOptions);
            this.endRound();
        }
    },

    onPlayerSelect: function(event, params) {
        const {target} = event,
            {player} = params;
        
        this[player].choose(target.value);

        this.checkSelections();
    },

    endRound: function() {
        const {player1, player2} = this.html;

        this.player1.reset();
        this.player2.reset();
        for (let i = 0; i < player1.length; i++) {
            player1[i].checked = false;
            player2[i].checked = false;
        }

        this.updatePlay();
    },

    /**
     * Called to clear all stats for current game
     */
    resetGame: function() {
        this.player1.reset();
        this.player2.reset();
        match.reset();
        this.winner = null;
        this.lastMatch = null;
        this.updatePlay();
    },
    
    start: function() {
        const {player1, player2, restart, type} = this.html;
        this.updatePlay();

        // allow for any number of options
        for (let i = 0; i < player1.length; i++) {
            player1[i].addEventListener('click', (e) => this.onPlayerSelect(e, {player: 'player1'}));
            player2[i].addEventListener('click', (e) => this.onPlayerSelect(e, {player: 'player2'}));
        }
        restart.addEventListener('click', this.resetGame.bind(this));
        type.addEventListener('click', this.changePlayers.bind(this));
    },

    init: function(html) {
        this.html = html;

        this.setPlayerVsComputer();
        // this.setPlayerVsPlayer();
        this.start();
    }
}

export default arena;