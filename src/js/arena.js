import player from './player';
import computer from './computer';
import match from './match';

const arena = {
    gameType: 'pvc',
    lastMatch: null,
    moves: [],
    movesToWin: 2,
    rulesCount: 3,
    player1: null,
    player2: null,
    winner: null,

    /**
     * Sets the games players
     * @param {Object} players each game player
     */
    setPlayers: function(players) {
        this.player1 = players.player1;
        this.player2 = players.player2;
    },

    /**
     * Sets the game to play against computer
     */
    setPlayerVsComputer: function() {
        const players = {player1: new player(), player2: new computer()}
        if (this.simulation) {
            clearInterval(this.simulation);
        }
        this.setPlayers(players);
        this.resetGame();
    },

    /**
     * Sets the game to simulation mode
     */
    setComputerVsComputer: function() {
        const players = {player1: new computer(), player2: new computer()}
        this.setPlayers(players);
        this.resetGame();
    },

    /**
     * Sets the game to have 2 players
     */
    setPlayerVsPlayer: function() {
        const players = {player1: new player(), player2: new player()}
        if (this.simulation) {
            clearInterval(this.simulation);
        }
        this.setPlayers(players);
        this.resetGame();
    },

    /**
     * Removes any previous classes on the game, without changing any other added classes
     */
    clearGameTypeClass: function() {
        this.html.game.className = this.html.game.className
            .replace(' game--type1', '')
            .replace(' game--type2', '')
            .replace(' game--type3', '')
    },

    /**
     * Called when a player settings button clicked
     * @param  {Object} e click eventn]
     */
    changePlayers: function(e) {
        const {type} = e.target.dataset;

        e.preventDefault();
        this.gameType = type;
        this.clearGameTypeClass();

        switch(type) {
            case 'pvp':
                this.setPlayerVsPlayer();
                this.html.game.className += ' game--type1';
                break;
            case 'pvc':
                this.setPlayerVsComputer();
                this.html.game.className += ' game--type2';
                break;
            case 'cvc':
                this.setComputerVsComputer();
                this.html.game.className += ' game--type3';
                break;
        }
    },

    /**
     * Changes the game rules from standard to 5 option rock, paper, scissors, lizard, spock
     * 
     * Although the current rules list is hard coded, it could easily be changed to 
     * allow the user to add more rules and set each outcome
     * 
     * @param  {Object} e click event
     */
    toggleGameRules: function(e) {
        const {rulesCount, html} = this,
            newClass = rulesCount === 3 ? ' game--lizard-spock' : '',
            oldClass = rulesCount === 3 ? '' : ' game--lizard-spock';
        e.preventDefault();
        this.rulesCount = rulesCount === 3 ? 5 : 3;
        html.toggle.innerHTML = rulesCount === 3 ? 'Rock, Paper, Scissors' : '..Lizard, Spock';
        html.game.className = html.game.className.replace(oldClass, '');
        html.game.className += newClass;
        this.resetGame();
    },

    /**
     * Get a selection for each computer player
     */
    simulateMove: function() {
        this.player1.choose(this.rulesCount);
        this.player2.choose(this.rulesCount);
        this.checkSelections();
    },

    /**
     * Called to simulate a game between computer players
     */
    startSimulation: function() {
        this.simulation = setInterval(this.simulateMove.bind(this), 1500);
    },

    /**
     * Checks the score to see if we have a winner
     * @param  {Object} score game score for each player
     */
    checkForWinner: function(score) {
        let hasWinner = false;
        if (score.player1 === this.movesToWin) {
            this.winner = 'player1';
            hasWinner = true;
        }
        if (score.player2 === this.movesToWin) {
            this.winner = 'player2';
            hasWinner = true;
        }
        if (this.simulation && hasWinner) {
            clearInterval(this.simulation);
        }
        this.score = score;
    },

    /**
     * Displays game score, moves and winner
     */
    updateScoreBoard: function() {
        this.checkForWinner(match.getScore());

        const {score, moves, winner} = this,
            round = match.getRound();
        let result = 'Begin game!',
            previousMoves = '';

        this.html.status.score.innerHTML = `${score.player1}-${score.player2}`;
        this.html.status.round.innerHTML = `Round ${winner ? round - 1 : round}`;

        if (winner) {
            result = `${winner} wins game!`;
            this.html.game.className += ' game--won';
        } else if (moves.length) {
            result = moves[moves.length - 1].result;
        }
        
        if (moves.length) {
            for (let i = moves.length - 1; i > -1; i--) {
                previousMoves += `<li class="move">
                    <span class="move__options">${i + 1} ${moves[i].move}</span> 
                    <span class="move__result">${moves[i].result}</li>`;
            }
        }
        
        this.html.status.winner.innerHTML = result;
        this.html.status.moves.innerHTML = previousMoves;
    },

    /**
     * Used to save each game move
     * @param  {Object} options  player selections for game rounf
     */
    storeMoveOutcome: function(options) {
        const {lastMatch} = this,
            move = `${options.player1} - ${options.player2}`,
            result = lastMatch === 'draw' ? lastMatch : `${lastMatch} wins round`;
        
        this.moves.push({move, result});
    },

    /**
     * When both players chosen an option, play game round
     */
    checkSelections: function() {
        // get computer's selection on player vs computer
        if (this.gameType === 'pvc') {
            this.player2.choose(this.rulesCount);
        }
        const playerOptions = {
                player1: this.player1.getChoice(),
                player2: this.player2.getChoice()
            };

        if (playerOptions.player1 && playerOptions.player2) {
            this.lastMatch = match.play(playerOptions);
            this.storeMoveOutcome(playerOptions)
            this.endRound();
        }
    },

    /**
     * Called when a player chooses an option
     * @param  {Object} event  click event
     * @param  {Object} params player1 or player 2
     */
    onPlayerSelect: function(event, params) {
        const {target} = event,
            {player} = params;
        
        this[player].choose(target.value);

        this.checkSelections();
    },

    /**
     * Called after game round ended]
     */
    endRound: function() {
        const {player1, player2} = this.html;

        this.player1.reset();
        this.player2.reset();
        for (let i = 0; i < player1.length; i++) {
            player1[i].checked = false;
            player2[i].checked = false;
        }

        this.updateScoreBoard();
    },

    /**
     * Called to clear all stats for current game
     * @param  {Object} e click event
     */
    resetGame: function(e) {
        if (e) {
            e.preventDefault();
        }
        if (this.simulation) {
            clearInterval(this.simulation);
        }
        this.player1.reset();
        this.player2.reset();
        match.reset();
        this.winner = null;
        this.lastMatch = null;
        this.moves = [];
        this.updateScoreBoard();
        this.html.game.className = this.html.game.className.replace(' game--won', '');

        // restart simulation 
        if (this.gameType === 'cvc') {
            this.startSimulation();
        }
    },
    
    /**
     * Adds listeners to game buttons
     */
    setUpGame: function() {
        const {player1, player2, restart, type, toggle} = this.html;
        this.updateScoreBoard();

        // allow for any number of options
        for (let i = 0; i < player1.length; i++) {
            player1[i].addEventListener('click', (e) => this.onPlayerSelect(e, {player: 'player1'}));
            player2[i].addEventListener('click', (e) => this.onPlayerSelect(e, {player: 'player2'}));
        }
        restart.addEventListener('click', (e) => this.resetGame(e));
        type.addEventListener('click', (e) => this.changePlayers(e));
        toggle.addEventListener('click', (e) => this.toggleGameRules(e));
    },

    /**
     * Set up the players and start the game
     * @param  {Object} html dom elements used for the game
     */
    init: function(html) {
        this.html = html;

        this.setPlayerVsComputer();
        this.setUpGame();
    }
}

export default arena;