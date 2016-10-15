import match from '../src/js/match';

describe('match', () => {

    it('should display the score', () => {
        expect(match.getScore()).to.deep.equal({player1: 0, player2: 0});
    });

    it('should play a game', () => {
        const playerOptions = {
                player1: 'rock',
                player2: 'paper'
            };
        match.play(playerOptions);
        expect(match.getScore()).to.deep.equal({player1: 0, player2: 1});
    });

    it('should update the round count after each game', () => {
        expect(match.getRound()).to.equal(2);
    });

    it('should reset the game', () => {
        match.reset();
        expect(match.getScore()).to.deep.equal({player1: 0, player2: 0});
        expect(match.getRound()).to.equal(1);
    });

});
