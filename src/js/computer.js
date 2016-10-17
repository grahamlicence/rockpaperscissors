import rules from './rules';

/**
 * Computer player, stores their selection before game round played
 */
function computer () {
    this.choice = null,

    /**
     * Randomly chooses an option
     * @param  {Number} limit number of rules to use depending on game style 
     */
    this.choose = (limit) => {
        const options = Object.keys(rules),
            selection = Math.floor(Math.random() * limit);

        this.choice = options[selection];
    },

    /**
     * What's been chosen?
     * @return {String|null} player's choice
     */
    this.getChoice = () => {
        return this.choice;
    }

    /**
     * Resets the player's choice
     */
    this.reset = () => {
        this.choice = null;
    }
}

export default computer;