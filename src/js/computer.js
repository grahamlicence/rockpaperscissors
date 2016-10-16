import rules from './rules';

function computer () {
    this.choice = null,

    this.choose = function(limit) {
        const options = Object.keys(rules),
            selection = Math.floor(Math.random() * limit);

        this.choice = options[selection];
    },

    this.getChoice = function() {
        return this.choice;
    }

    this.reset = function() {
        this.choice = null;
    }
}

export default computer;