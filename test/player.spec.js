import player from '../src/js/player';

describe('player', () => {

    it('should be able to choose an option', () => {
        const player1 = new player();
        
        player1.choose('rock');

        expect(player1.getChoice()).to.equal('rock');
    });

});
