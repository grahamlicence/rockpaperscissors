import gamePlay from './gamePlay';

/**
 * Handles match and game scores
 */
const match = {
    score: {player1: 0, player2: 0},

    round: 1,

    play: function(options) {
        const outcome = gamePlay(options);

        if (outcome === 'player1') {
            this.score.player1++;
        }
        
        if (outcome === 'player2') {
            this.score.player2++;
        }
        this.round++;

        return outcome;
    },

    getScore: function() {
        return this.score;
    },

    getRound: function() {
        return this.round;
    },

    reset: function() {
        this.score = {player1: 0, player2: 0};
        this.round = 1;
    }
}

export default match;