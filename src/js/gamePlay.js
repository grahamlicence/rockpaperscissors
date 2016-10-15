import rules from './rules';

/**
 * Used by match to determine the outcome of a game
 * @param  {Object} players selected options for each player
 * @return {String}         game outcome
 */
const gamePlay = function(players) {
    const {player1, player2} = players;

    if (player1.length === 0 || player2.length === 0) {
        return 'error';
    }

    if (player1 === player2) {
        return 'draw';
    }

    return rules[player1][player2] ? 'player1' : 'player2';
}

export default gamePlay;