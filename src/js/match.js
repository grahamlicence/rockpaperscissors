import gamePlay from './gamePlay';

/**
 * Handles game play and scores
 */
const match = {
    round: 1,
    score: {player1: 0, player2: 0},

    /**
     * Plays a round of the game
     * @param  {Object} options the selections for each player
     * @return {String}         the outcome of the round
     */
    play(options) {
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
    getScore() {
        return this.score;
    },

    /**
     * @return {Number} current game round
     */
    getRound() {
        return this.round;
    },

    /**
     * Reset the game
     */
    reset() {
        this.round = 1;
        this.score = {player1: 0, player2: 0};
    }
}

export default match;