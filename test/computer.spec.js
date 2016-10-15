import computer from '../src/js/computer';

describe('computer', () => {

    it('should randomly choose an option', () => {
        const player2 = new computer()
        player2.choose();

        const selection = player2.getChoice(),
            validSelection = selection === 'rock' || selection === 'paper' || selection === 'scissors';
            
        expect(validSelection).to.be.true;
    });

});
