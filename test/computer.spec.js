import computer from '../src/js/computer';

describe('computer', () => {

    it('should randomly choose an option', () => {
        const player1 = new computer()
        player1.choose(3);

        const selection = player1.getChoice(),
            validSelection = selection === 'rock' || selection === 'paper' || selection === 'scissors';

        expect(validSelection).to.be.true;
    });

    it('should randomly choose an option for Lizard/Spock', () => {
        const player1 = new computer()
        player1.choose(5);

        const selection = player1.getChoice(),
            validSelection = selection === 'rock' || 
                selection === 'paper' || 
                selection === 'lizard' || 
                selection === 'spock' || 
                selection === 'scissors';

        expect(validSelection).to.be.true;
    });

    it('should reset', () => {
        const player1 = new computer();

        player1.choose();
        player1.reset();
        
        expect(player1.getChoice()).to.equal(null);
    });

});
