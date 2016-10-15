import player from './player';
import computer from './computer';
import match from './match';

const arena = {
    player1: null,
    player2: null,
    winner: null,
    lastMatch: null,

    setPlayers: function(players) {
        this.player1 = players.player1;
        this.player2 = players.player2;
    },

    setPlayerVsComputer: function() {
        const players = {player1: new player(), player2: new computer()}
        this.setPlayers(players);
    },

    setPlayerVsPlayer: function() {
        const players = {player1: new player(), player2: new player()}
        this.setPlayers(players);
    },

    setScore: function(score) {
        if (score.player1 === 2) {
            this.winner = 'player1';
        }
        if (score.player2 === 2) {
            this.winner = 'player2';
        }
        this.score = score;
    },

    getWinner: function() {
        return this.winner;
    },

    updatePlay: function() {
        this.setScore(match.getScore());

        const {score, lastMatch} = this,
            round = match.getRound(),
            winner = this.getWinner();
        let result = 'Begin game!';
        
        if (lastMatch) {
            result = lastMatch === 'draw' ? lastMatch : `${lastMatch} wins round`;
        }

        this.html.status.score.innerHTML = `${score.player1}-${score.player2}`;
        this.html.status.round.innerHTML = `Round ${round}`;

        if (winner) {
            this.html.status.winner.innerHTML = `${winner} wins game!`;
            return;
        }
        
        this.html.status.winner.innerHTML = result;

    },

    /**
     * When both players chosen, play game
     */
    checkSelections: function() {
        const playerOptions = {
                player1: this.player1.getChoice(),
                player2: this.player2.getChoice()
            };
        if (playerOptions.player1 && playerOptions.player2) {
            this.lastMatch = match.play(playerOptions);
            this.endGame();
        }
    },

    onPlayerSelect: function(event, params) {
        const {target} = event,
            {player} = params;
        
        this[player].choose(target.value);

        this.checkSelections();
    },

    endGame: function() {
        const {player1, player2} = this.html;

        this.player1.reset();
        this.player2.reset();
        for (let i = 0; i < player1.length; i++) {
            player1[i].checked = false;
            player2[i].checked = false;
        }

        this.updatePlay();
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
        this.updatePlay();
    },
    
    startMatch: function() {
        const {player1, player2, restart} = this.html;
        this.updatePlay();

        for (let i = 0; i < player1.length; i++) {
            player1[i].addEventListener('click', (e) => this.onPlayerSelect(e, {player: 'player1'}));
            player2[i].addEventListener('click', (e) => this.onPlayerSelect(e, {player: 'player2'}));
        }
        restart.addEventListener('click', this.resetGame.bind(this), false);
    },

    init: function(html) {
        this.html = html;

        // this.setPlayerVsComputer();
        this.setPlayerVsPlayer();
        this.startMatch();
    }
}

export default arena;