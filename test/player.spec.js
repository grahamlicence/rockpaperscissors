import player from '../src/js/player';

describe('player', () => {

    it('should be able to choose an option', () => {
        player.choose('rock');
        expect(player.getSelection()).to.be('rock');
    });

});
