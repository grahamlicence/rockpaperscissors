import player from './player';
import computer from './computer';
import match from './match';

const arena = {
    gameType: 'pvc',
    lastMatch: null,
    moves: [],
    player1: null,
    player2: null,
    winner: null,

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
        this.gameType = type;
        switch(type) {
            case 'pvp':
                this.setPlayerVsPlayer();
                break;
            case 'pvc':
                this.setPlayerVsComputer();
                break;
            case 'cvc':
                this.setComputerVsComputer();
                break;
        }
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

    /**
     * Displays game score, moves and winner
     */
    updateScoreBoard: function() {
        this.setScore(match.getScore());

        const {score, moves, winner} = this,
            round = match.getRound();
        let result = 'Begin game!',
            previousMoves = '';

        this.html.status.score.innerHTML = `${score.player1}-${score.player2}`;
        this.html.status.round.innerHTML = `Round ${round}`;

        if (winner) {
            result = `${winner} wins game!`;
        } else if (moves.length) {
            result = moves[moves.length - 1].result;
        }
        
        if (moves.length) {
            for (let i = moves.length - 1; i > -1; i--) {
                previousMoves += `<p><span>${moves[i].move}</span> <span>${moves[i].result}</p>`;
            }
        }
        
        this.html.status.winner.innerHTML = result;
        this.html.status.moves.innerHTML = previousMoves;
    },

    /**
     * Used to save each game move
     */
    storeMoveOutcome: function(options) {
        const {lastMatch} = this,
            move = `${options.player1} - ${options.player2}`,
            result = lastMatch === 'draw' ? lastMatch : `${lastMatch} wins round`;
        
        this.moves.push({move, result});
    },

    /**
     * When both players chosen, play game round
     */
    checkSelections: function() {
        // get computer's selection on player vs computer
        if (this.gameType === 'pvc') {
            this.player2.choose();
        }
        const playerOptions = {
                player1: this.player1.getChoice(),
                player2: this.player2.getChoice()
            };

        if (playerOptions.player1 && playerOptions.player2) {
            this.lastMatch = match.play(playerOptions);
            this.storeMoveOutcome(playerOptions)
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

        this.updateScoreBoard();
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
        this.moves = [];
        this.updateScoreBoard();
    },
    
    /**
     * Adds listeners to play game
     */
    start: function() {
        const {player1, player2, restart, type} = this.html;
        this.updateScoreBoard();

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