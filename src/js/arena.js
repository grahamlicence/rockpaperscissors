import player from './player';
import computer from './computer';

const arena = {
    player1: null,
    player2: null,
    winner: null,

    setPlayers: function(players) {
        this.player1 = players.player1;
        this.player2 = players.player2;
    },

    setPlayerVsComputer: function() {
        const players = {player1: new player(), player2: new computer()}
        this.setPlayers(players);
    },

    setScore: function(score) {
        if (score.player1 === 2) {
            this.winner = 'player1';
        }
        if (score.player2 === 2) {
            this.winner = 'player2';
        }
    },

    getWinner: function() {
        return this.winner;
    },

    init: function() {
        this.setPlayerVsComputer();
    }
}

export default arena;