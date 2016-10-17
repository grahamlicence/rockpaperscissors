/**
 * Human player, stores their selection before game round played
 */
function player () {
    this.choice = null,

    /**
     * Store player's choice
     * @param  {String} option player's choice
     */
    this.choose = function(option) {
        this.choice = option;
    },

    /**
     * What's been chosen?
     * @return {String|null} player's choice
     */
    this.getChoice = function() {
        return this.choice;
    }

    /**
     * Resets the player's choice
     */
    this.reset = function() {
        this.choice = null;
    }
}

export default player;