import arena from '../src/js/arena';

describe('arena', () => {

    it('should be able to set game players', () => {
        const players = {player1: () => {}, player2: () => {}}
        arena.setPlayers(players);
        expect(arena.player1).to.be.a('function');
    });

    it('should be show player1 as winner if the score is 2-0', () => {
        arena.checkForWinner({player1: 2, player2: 0});
        expect(arena.winner).to.equal('player1');
    });

    it('should be show player1 as winner if the score is 2-1', () => {
        arena.checkForWinner({player1: 2, player2: 1});
        expect(arena.winner).to.equal('player1');
    });

    it('should be show player2 as winner if the score is 1-2', () => {
        arena.checkForWinner({player1: 1, player2: 2});
        expect(arena.winner).to.equal('player2');
    });

    it('should extend the game to best of 5 if the game has been won', () => {
        const dummyClick = {preventDefault: () => {}};
        arena.html = {
            extend: {innerText:'', className: ''},
            game: {className: ''},
            status: {
                moves: {innerHTML:''},
                round: {innerHTML:''},
                score: {innerHTML:''},
                scoreMirror: {innerHTML:''},
                winner: {innerHTML:''}
            },
            player1: [{parentElement: {className: ''}}],
            player2: [{parentElement: {className: ''}}]
        };
        arena.extendGame(dummyClick);
        expect(arena.bestOf).to.equal(5);
    });

});