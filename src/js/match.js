import gamePlay from './gamePlay';

/**
 * Handles game play and game scores
 */
const match = {
    round: 1,
    score: {player1: 0, player2: 0},

    /**
     * Plays a round of the game
     * @param  {Object} options the selections for each player
     * @return {String}         the outcome of the round
     */
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

    /**
     * @return {Object} current game score
     */
    getScore: function() {
        return this.score;
    },

    /**
     * @return {Number} current game round
     */
    getRound: function() {
        return this.round;
    },

    /**
     * Reset the game
     */
    reset: function() {
        this.round = 1;
        this.score = {player1: 0, player2: 0};
    }
}

export default match;