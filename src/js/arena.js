import player from './player';
import computer from './computer';
import match from './match';
import templates from './templates';

const arena = {
    gameType: 'pvc',
    lastMatch: null,
    moves: [],
    bestOf: 3,
    rulesCount: 3,
    player1: null,
    player2: null,
    winner: null,
    settingsOpen: false,

    /**
     * Sets the games players
     * @param {Object} players each game player
     */
    setPlayers(players) {
        this.player1 = players.player1;
        this.player2 = players.player2;
    },

    /**
     * Sets the game to play against computer
     */
    setPlayerVsComputer() {
        const players = {player1: new player(), player2: new computer()}

        this.endSimulation();
        this.setPlayers(players);
        this.resetGame();
    },

    /**
     * Sets the game to simulation mode
     */
    setComputerVsComputer() {
        const players = {player1: new computer(), player2: new computer()}
        this.setPlayers(players);
        this.resetGame();
    },

    /**
     * Sets the game to have 2 players
     */
    setPlayerVsPlayer() {
        const players = {player1: new player(), player2: new player()}
        
        this.endSimulation();
        this.setPlayers(players);
        this.resetGame();
    },

    /**
     * Removes any previous classes on the game, without changing any other added classes
     */
    clearGameTypeClass() {
        this.html.game.className = this.html.game.className
            .replace(' game--type1', '')
            .replace(' game--type2', '')
            .replace(' game--type3', '')
    },

    /**
     * Called when a player settings button clicked
     * @param  {Object} e click eventn]
     */
    changePlayers(e) {
        const {type} = e.target.dataset;

        e.preventDefault();

        if (type === this.gameType) {
            return;
        }

        if (this.settingsOpen) {
            this.toggleSettings();
        }

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
    toggleGameRules(e) {
        const {rulesCount, html} = this,
            newClass = rulesCount === 3 ? ' game--lizard-spock' : '',
            oldClass = rulesCount === 3 ? '' : ' game--lizard-spock';

        e.preventDefault();
        this.rulesCount = rulesCount === 3 ? 5 : 3;
        html.toggle.innerHTML = rulesCount === 3 ? 'Rock, Paper, Scissors' : '..Lizard, Spock';

        if (this.settingsOpen) {
            this.toggleSettings();
        }

        html.game.className = html.game.className.replace(oldClass, '');
        html.game.className += newClass;

        this.resetGame();
    },

    /**
     * Extends the game win margin so best of 3 becomes best of 5
     * @param  {Object} e click event
     */
    extendGame(e) {
        const {html, gameType} = this;

        e.preventDefault();
        this.bestOf = this.bestOf + 2;
        this.winner = null;
        html.extend.innerText = `Best of ${this.bestOf + 2}?`;
        html.extend.className = html.extend.className.replace(' game__extend--active', '');
        html.game.className = html.game.className
            .replace(' game--won player1--wins', '')
            .replace(' game--won player2--wins', '');
        this.updateScoreBoard();
        if (gameType === 'cvc') {
            this.startSimulation();
        }
    },

    /**
     * Get a selection for each computer player
     */
    simulateMove() {
        this.player1.choose(this.rulesCount);
        this.player2.choose(this.rulesCount);
        this.checkSelections();
    },

    /**
     * Called to simulate a game between computer players
     */
    startSimulation() {
        this.simulation = setInterval(this.simulateMove.bind(this), 1500);
    },

    /**
     * Stops simulation when there is a winner or the game type is changes
     */
    endSimulation() {
        if (this.simulation) {
            clearInterval(this.simulation);
        }
    },

    /**
     * Checks the score to see if we have a winner
     * @param  {Object} score game score for each player
     */
    checkForWinner(score) {
        const {player1, player2} = score,
            gamesForWin = Math.ceil(this.bestOf / 2);
        let hasWinner = false;

        if (player1 === gamesForWin || player2 === gamesForWin) {
            hasWinner = true;
            this.winner = player1 > player2 ? 'player1' : 'player2';
        }

        if (this.simulation && hasWinner) {
            this.endSimulation();
        }
        
        this.score = score;
    },

    /**
     * Displays game score, moves and winner
     */
    updateScoreBoard() {
        this.checkForWinner(match.getScore());

        const {score, moves, winner, html, gameType} = this,
            round = match.getRound();
        let result = '',
            previousMoves = '';

        html.status.score.innerHTML = `${score.player1}-${score.player2}`;
        html.status.score2.innerHTML = `${score.player1}-${score.player2}`;
        html.status.round.innerHTML = `Round ${winner ? round - 1 : round}`;

        if (winner) {
            result = `${winner} wins game!`;
            html.game.className += ` game--won ${winner}--wins`;
            html.extend.className += ' game__extend--active';
        } else if (moves.length) {
            result = moves[moves.length - 1].result;
        } else {
            switch(gameType) {
                case 'pvp':
                    result = 'Player Vs Player';
                    break;
                case 'pvc':
                    result = 'Player Vs Computer';
                    break;
                case 'cvc':
                    result = 'Computer Vs Computer';
                    break;
            }
        }
        
        if (moves.length) {
            for (let i = moves.length - 1; i > -1; i--) {
                previousMoves += templates.previousMove({option: `${i + 1} ${moves[i].move}`, result: moves[i].result});
            }
        }
        
        html.status.winner.innerHTML = result;
        html.status.moves.innerHTML = previousMoves;
        html.player1[0].parentElement.className = html.player1[0].parentElement.className.replace(/ options--chosen/g, '');
        html.player2[0].parentElement.className = html.player2[0].parentElement.className.replace(/ options--chosen/g, '');

    },

    /**
     * Used to save each game move
     * @param  {Object} options  player selections for game rounf
     */
    storeMoveOutcome(options) {
        const {lastMatch} = this,
            {player1, player2} = options,
            result = lastMatch === 'draw' ? lastMatch : `${lastMatch} wins round`;
        let move = '',
            divider = '&mdash;';

        if (lastMatch === 'player1') {
            divider = '>'
        }
        if (lastMatch === 'player2') {
            divider = '<'
        }
        move = templates.move({divider, option1: player1, option2: player2});
        
        this.moves.push({move, result});
    },

    /**
     * When both players chosen an option, play game round
     */
    checkSelections() {
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
    onPlayerSelect(event, params) {
        const {target} = event,
            {player} = params;
        
        this[player].choose(target.value);

        this.html[player][0].parentElement.className += ' options--chosen'

        this.checkSelections();
    },

    /**
     * Called after game round ended]
     */
    endRound() {
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
    resetGame(e) {
        if (e) {
            e.preventDefault();
        }
        
        this.endSimulation();
        this.player1.reset();
        this.player2.reset();
        match.reset();

        this.winner = null;
        this.lastMatch = null;
        this.moves = [];
        this.updateScoreBoard();
        this.bestOf = 3;
        this.html.extend.innerText = `Best of 5?`;
        this.html.extend.className = this.html.extend.className.replace(' game__extend--active', '');
        this.html.game.className = this.html.game.className
            .replace(' game--won player1--wins', '')
            .replace(' game--won player2--wins', '');

        // restart simulation 
        if (this.gameType === 'cvc') {
            this.startSimulation();
        }
    },

    /**
     * Opens game options menu on mobile
     * @param  {Object} e click event 
     */
    toggleSettings(e) {
        if (e) {
            e.preventDefault();
        }
        const {settingsOpen} = this,
            settingsClass = settingsOpen ? 'game__settings' : 'game__settings game__settings--open',
            areanaClass = settingsOpen ? 'game__arena' : 'game__arena game__arena--settings-open',
            buttonClass = settingsOpen ? 'game__change' : 'game__change game__change--open';

        this.settingsOpen = !settingsOpen;
        this.html.settings.className = settingsClass;
        this.html.arena.className = areanaClass;
        this.html.change.className = buttonClass;
    },
    
    /**
     * Adds listeners to game buttons
     */
    setUpGame() {
        const {extend, player1, player2, restart, change, type, toggle} = this.html;

        // allow for any number of options
        for (let i = 0; i < player1.length; i++) {
            player1[i].addEventListener('click', (e) => this.onPlayerSelect(e, {player: 'player1'}));
            player2[i].addEventListener('click', (e) => this.onPlayerSelect(e, {player: 'player2'}));
        }
        extend.addEventListener('click', (e) => this.extendGame(e));
        restart.addEventListener('click', (e) => this.resetGame(e));
        change.addEventListener('click', (e) => this.toggleSettings(e));
        toggle.addEventListener('click', (e) => this.toggleGameRules(e));
        type.addEventListener('click', (e) => this.changePlayers(e));
    },

    /**
     * Set game listeners and set up the players to start the game
     * @param  {Object} html DOM elements used for the game
     */
    init(html) {
        this.html = html;

        this.setUpGame();

        this.setPlayerVsComputer();
        setTimeout(function() {
            document.getElementsByClassName('game__type')[0].children[1].click()
        }, 1000);
    }
}

export default arena;