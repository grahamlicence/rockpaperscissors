import arena from '../src/js/arena';

describe('arena', () => {

    it('should be able to set match players', () => {
        const players = {player1: function() {}, player2: function() {}}
        arena.setPlayers(players);
        expect(arena.player1).to.be.a('function');
    });

    it('should be show player1 as winner if the score is 2-0', () => {
        arena.setScore({player1: 2, player2: 0});
        expect(arena.winner).to.equal('player1');
    });

    it('should be show player1 as winner if the score is 2-1', () => {
        arena.setScore({player1: 2, player2: 1});
        expect(arena.winner).to.equal('player1');
    });

    it('should be show player2 as winner if the score is 1-2', () => {
        arena.setScore({player1: 1, player2: 2});
        expect(arena.winner).to.equal('player2');
    });

});