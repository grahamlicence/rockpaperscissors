import computer from '../src/js/computer';

describe('computer', () => {

    it('should randomly choose an option', () => {
        const player1 = new computer()
        player1.choose();

        const selection = player1.getChoice(),
            validSelection = selection === 'rock' || selection === 'paper' || selection === 'scissors';

        expect(validSelection).to.be.true;
    });

    it('should reset', () => {
        const player1 = new computer();

        player1.choose('rock');
        player1.reset();
        
        expect(player1.getChoice()).to.equal(null);
    });

});
