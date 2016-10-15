function player () {
    this.choice = null,

    this.choose = function(option) {
        this.choice = option;
    },

    this.getChoice = function() {
        return this.choice;
    }

    this.reset = function() {
        this.choice = null;
    }
}

export default player;